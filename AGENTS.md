# GreenMind v2 — Project Reference

> **One-page cheatsheet for developers working on this codebase.**
> Covers architecture, commands, environment variables, security, and CMS patterns.
> For end-user documentation, see [README.md](./README.md).

---

## At a Glance

| Aspect | Detail |
|--------|--------|
| **Framework** | Next.js 14 (App Router) |
| **Deployment** | Cloudflare Pages via `@cloudflare/next-on-pages` |
| **Styling** | Tailwind CSS — tokens in `tailwind.config.ts` |
| **Animations** | Framer Motion + CSS keyframes in `globals.css` |
| **Smooth Scroll** | `lenis` — initialised in `components/LenisProvider.tsx` |
| **CMS** | Sanity v3 — studio at `/studio`, abstraction in `lib/content/` |
| **Database** | Neon (PostgreSQL serverless) + Drizzle ORM |
| **Email** | Resend — templates in `lib/email.ts` |
| **Security** | CSRF, rate limiting, honeypot, HSTS, CSP via `middleware.ts` |

---

## Commands

```bash
# Development
npm run dev

# Build (local)
npm run build

# Lint
npm run lint

# TypeScript check (no emit)
npx tsc --noEmit
```

---

## Database Migrations (Drizzle)

The schema is defined in `lib/schema.ts`. The raw SQL migration (applied to Neon) lives at `lib/migrations.sql`.

```bash
# 1. Set DATABASE_URL in .env.local first
# 2. Install drizzle-kit if not already present
npm install -D drizzle-kit

# 3. Generate a new migration after changing lib/schema.ts
npx drizzle-kit generate:pg

# 4. Push migration to the database
npx drizzle-kit push:pg

# 5. To inspect the current DB state
npx drizzle-kit introspect:pg
```

> **Never use `push:pg` in production.** Always generate a migration file, review it, then apply it via `lib/migrations.sql` or `drizzle-kit migrate`.

### Applying `lib/migrations.sql` directly

The SQL file is idempotent (safe to re-run). Apply it in the Neon SQL Editor or via psql:

```bash
psql "$DATABASE_URL" -f lib/migrations.sql
```

### Data retention (DPDP Act 2023)

Enquiry rows are soft-deleted by setting `deleted_at`. Run this purge periodically (e.g. monthly cron):

```sql
DELETE FROM enquiries
WHERE deleted_at IS NOT NULL
  AND deleted_at < NOW() - INTERVAL '2 years';
```

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in all values before running.

| Variable | Used by | Notes |
|---|---|---|
| `DATABASE_URL` | `lib/db.ts` | Neon connection string (`postgres://...?sslmode=require`) |
| `RESEND_API_KEY` | `lib/email.ts` | From resend.com dashboard |
| `EMAIL_FROM` | `lib/email.ts` | Verified sender address in Resend |
| `ADMIN_EMAIL` | `lib/email.ts` | Receives new enquiry alert emails |
| `ALLOWED_ORIGINS` | `app/api/enquiry/route.ts` | Comma-separated list of allowed CSRF origins |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `lib/sanity.ts` | From sanity.io/manage |
| `NEXT_PUBLIC_SANITY_DATASET` | `lib/sanity.ts` | Usually `production` |
| `SANITY_WRITE_TOKEN` | `lib/sanity.ts` | Server-side write token — **never** prefix with `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | `lib/analytics.ts` | Google Analytics 4 Measurement ID |

### Cloudflare-only bindings (set in Pages dashboard, not `.env.local`)

| Binding | Purpose | How to set |
|---|---|---|
| `RATE_LIMIT_KV` | IP-based rate limiting for `/api/enquiry` | Pages → Settings → Functions → KV namespace bindings |

---

## Rate Limiting

The enquiry API (`app/api/enquiry/route.ts`) uses a two-layer approach:

1. **Cloudflare WAF** (primary) — configure a Rate Limiting Rule in the CF dashboard:
   - Expression: `http.request.uri.path eq "/api/enquiry" and http.request.method eq "POST"`
   - Rate: 5 requests per 60 seconds per IP
   - Action: Block

2. **Cloudflare KV** (in-code fallback) — already wired in `checkRateLimit()`. To activate:
   - `wrangler kv:namespace create RATE_LIMIT_KV`
   - Bind it in Cloudflare Pages → Settings → Functions → KV namespace bindings
   - Binding name must be exactly: `RATE_LIMIT_KV`

Both layers are independent — either alone provides protection.

---

## Content Layer (`lib/content/`)

All page components must import content via `lib/content/`, never directly from `lib/sanity.ts`.

```typescript
// Correct
import { getProjects, type Project } from '@/lib/content'

// Wrong — couples pages to Sanity implementation
import { getProjects, SanityProject } from '@/lib/sanity'
```

| File | Exports |
|---|---|
| `lib/content/index.ts` | Barrel — import everything from here |
| `lib/content/types.ts` | `Project`, `Certificate`, `Service`, `BlogPost`, `FaqItem`, `TeamMember` |
| `lib/content/projects.ts` | `getProjects()` |
| `lib/content/services.ts` | `getServices()`, `getServiceBySlug(slug)` |
| `lib/content/blog.ts` | `getBlogPosts()`, `getBlogPostBySlug(slug)` |
| `lib/content/faqs.ts` | `getFaqs(page)` |
| `lib/content/team.ts` | `getTeamMembers()` |
| `lib/content/certificates.ts` | `getCertificates()` |

All functions have error boundaries — they return `[]` or `null` on Sanity failure rather than crashing the page.

---

## Sanity CMS

Six document types are defined in `sanity/schemas/`:

| Schema | Purpose |
|---|---|
| `service` | Service offerings — used on `/services` and service slug pages |
| `blogPost` | Resources/blog articles — used on `/resources` and `/resources/[slug]` |
| `faqItem` | FAQ accordion items — used on homepage and services page |
| `teamMember` | Team bios — used on `/about` |
| `project` | Past projects / case studies — used on `/projects` |
| `certificate` | Credentials and accreditations — used on `/about` |

Pages currently fall back to hardcoded data when Sanity env vars are not set.
Once the project is created and env vars are configured, data should be migrated to Sanity
and the hardcoded fallback arrays removed from page components.

---

## Security Notes

### API route (`app/api/enquiry/route.ts`)
- **CSRF**: Requests are rejected if `Origin` header doesn't match `ALLOWED_ORIGINS`. Localhost is always allowed in dev.
- **Rate limiting**: KV-backed (5 req/60s per IP) + Cloudflare WAF (configure separately).
- **Body size**: Requests over 10 KB are rejected before buffering.
- **Message length**: Messages over 5,000 characters are rejected.
- **IP source**: Only `cf-connecting-ip` is used — `x-forwarded-for` is client-controlled and ignored.
- **Honeypot**: `gm_verify_check` field — filled by bots, silently accepted (returns 200 to avoid signalling rejection).

### Email (`lib/email.ts`)
- All user-supplied values are HTML-escaped via `esc()` before interpolation into email templates.
- Confirmation email sent to the user is minimal — does **not** echo back the full message (prevents social engineering).

### Database (`lib/schema.ts`, `lib/db.ts`)
- `status` is a native PG enum — invalid values are rejected at DB level.
- `message` has a `CHECK (char_length(message) <= 5000)` constraint at DB level.
- `deletedAt` enables soft-delete — rows are never hard-deleted by application code.
- DB client is fully typed (`NeonHttpDatabase<typeof schema>`) — no `any`, no `@ts-ignore`.

---

## Architecture Notes

- `lib/db.ts`, `lib/email.ts`, `lib/schema.ts` are **server-only** (guarded with `import 'server-only'`).
  Never import them in Client Components.
- `lib/content/*` wraps all Sanity queries. Pages import from `@/lib/content`, never `@/lib/sanity`.
- The `ServiceCard` component is **not a link** — cards are presentational only.
  Navigation to service detail pages lives on the `/services` listing page.
- `ForestBackground` uses a raw `<img>` tag (not `next/image`) because `images.unoptimized: true`
  is set in `next.config.js` for Cloudflare Pages compatibility. Image optimisation should be
  handled upstream (Cloudflare Images or Sanity's image pipeline) when traffic scales.
- `@cloudflare/workers-types` is included in `tsconfig.json` to provide the `KVNamespace` type
  used in `app/api/enquiry/route.ts`. This is a dev-only type — it does not affect the runtime bundle.
