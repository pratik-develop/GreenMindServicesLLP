# Contributing to GreenMind Services LLP Website

> Guidelines for developers contributing to this codebase.

---

## Getting Started

1. Clone the repository: `git clone https://github.com/pratik-develop/GreenMindServicesLLP.git`
2. Copy `.env.local.example` to `.env.local` and fill in required values
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`

---

## Code Style

- **Framework**: Next.js 14 App Router — use Server Components by default, only `use client` when needed
- **Styling**: Tailwind CSS — prefer utility classes over custom CSS
- **Types**: Strict TypeScript — no `any`, no `@ts-ignore`
- **Server-only files**: `lib/db.ts`, `lib/email.ts`, `lib/schema.ts` are guarded with `import 'server-only'` — never import them in Client Components

---

## CMS Content Layer

All page components must import content via `@/lib/content`, never directly from `@/lib/sanity`.

```typescript
// Correct
import { getProjects, type Project } from '@/lib/content'

// Wrong — couples pages to Sanity implementation
import { getProjects, SanityProject } from '@/lib/sanity'
```

---

## Database Changes

1. Update `lib/schema.ts`
2. Generate migration: `npx drizzle-kit generate:pg`
3. Review migration, then apply: `npx drizzle-kit push:pg` (dev only — never in production)
4. For production, apply via `lib/migrations.sql` in Neon SQL Editor

---

## Security Checklist

Before submitting a PR:

- [ ] No server-only modules imported in Client Components
- [ ] All user inputs HTML-escaped before rendering
- [ ] No API keys or secrets exposed client-side (no `NEXT_PUBLIC_` prefix on sensitive vars)
- [ ] Rate limiting considered for new API routes
- [ ] CSP implications reviewed for new third-party scripts

---

## Deployment

This project deploys to **Cloudflare Pages** via `@cloudflare/next-on-pages`.

- Build command: `npm run pages:build`
- Output directory: `.vercel/output/static`
- KV binding `RATE_LIMIT_KV` required for rate limiting in production

See [AGENTS.md](./AGENTS.md) for full deployment details.
