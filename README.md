<div align="center">

# GreenMind Services LLP

### Environmental & Compliance Consultants — Website

<p align="center">
  <a href="https://nextjs.org/" target="_blank"><img src="https://img.shields.io/badge/Next.js%2014-black?style=for-the-badge&logo=nextdotjs" alt="Next.js 14" /></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/" target="_blank"><img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://www.cloudflare.com/" target="_blank"><img src="https://img.shields.io/badge/Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Pages" /></a>
</p>

<p align="center">
  <strong>Preserve &middot; Protect &middot; Prosper</strong>
</p>

</div>

---

## Overview

A premium, high-performance marketing website for **GreenMind Services LLP**, an environmental consultancy serving Northeast India. Built with a focus on accessibility, performance, and modern UX patterns.

- **Live URL**: [greenmindservices.com](https://greenmindservices.com)
- **Repository**: [GreenMindServicesLLP](https://github.com/pratik-develop/GreenMindServicesLLP)

---

## Highlights

| Feature | Description |
|---------|-------------|
| **Parallax Hero** | Fixed forest background with scroll-over effect on alternating sections |
| **Smooth Scrolling** | Lenis-powered buttery smooth scroll with section reveal animations |
| **Responsive Navbar** | Full logo lockup on all screens, optimized tablet layout |
| **Glassmorphic Cards** | `backdrop-blur` cards with forest-tinted translucent sections |
| **Secure Enquiry API** | Edge route with CSRF validation, rate limiting, honeypot, IP checks |
| **Sanity CMS** | Headless content management for services, blog, FAQs, team, projects |
| **DPDP Compliance** | Soft-delete + 2-year auto-purge for enquiry data |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 3.4 |
| Animation | [Framer Motion](https://www.framer.com/motion/) + CSS keyframes |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering/) |
| CMS | [Sanity v3](https://www.sanity.io/) |
| Database | [Neon](https://neon.tech/) (PostgreSQL serverless) |
| ORM | [Drizzle ORM](https://orm.drizzle.team/) |
| Email | [Resend](https://resend.com/) |
| Analytics | Google Analytics 4 |
| Deployment | [Cloudflare Pages](https://pages.cloudflare.com/) |

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- npm (comes with Node.js)

### 1. Clone & Install

```bash
git clone https://github.com/pratik-develop/GreenMindServicesLLP.git
cd "GreenMindServicesLLP"
npm install
```

### 2. Environment Setup

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials. See [`.env.local.example`](./.env.local.example) for full documentation on each variable.

> **Quick local dev**: Only `NEXT_PUBLIC_SANITY_PROJECT_ID` is needed to run the site with fallback data. Email, database, and analytics are optional for local preview.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build & Lint

```bash
npm run lint       # ESLint check
npm run build      # Production build
npx tsc --noEmit   # TypeScript check (no emit)
```

---

## Project Structure

```
app/
  ├── layout.tsx              # Root layout, fonts, metadata, providers
  ├── page.tsx                # Homepage — hero, services, stats, testimonials, process, resources, FAQ
  ├── globals.css             # Tailwind directives, animation keyframes, section backgrounds
  ├── not-found.tsx           # 404 page
  ├── about/                  # Company story, team, credentials
  ├── services/               # Service listings + dynamic detail pages
  ├── resources/              # Blog index + dynamic article pages
  ├── contact/                # Contact form with validation
  ├── policies/               # Privacy Policy + Terms of Service
  ├── api/enquiry/route.ts    # Secure contact form handler (Edge)
  └── api/og/route.tsx        # Dynamic Open Graph image generation

components/                   # Reusable UI components
  ├── Navbar.tsx              # Glassmorphic nav with full logo, mobile drawer
  ├── Footer.tsx              # Dark forest footer with links
  ├── ForestBackground.tsx    # Animated parallax forest backgrounds
  ├── SectionReveal.tsx       # Intersection-observer scroll reveal wrapper
  ├── CtaButton.tsx           # Primary gold CTA button
  ├── ServiceCard.tsx         # Presentational service card
  ├── TestimonialsCarousel.tsx
  ├── FaqAccordion.tsx
  ├── StatsGrid.tsx
  └── ...

lib/                          # Server & shared utilities
  ├── content/                # CMS abstraction layer (all pages import from here)
  ├── db.ts                   # Neon database client (server-only)
  ├── schema.ts               # Drizzle ORM schema + PG enums
  ├── email.ts                # Resend email templates (server-only)
  ├── sanity.ts               # Sanity client + image URL builder
  └── migrations.sql          # Idempotent database setup

sanity/                       # Sanity Studio v3
  ├── schemas/                # Document types: service, blogPost, faqItem, etc.
  └── ...

wrangler.toml                 # Cloudflare Pages build config
middleware.ts                 # Security headers (HSTS, CSP, etc.)
```

---

## Deployment

### Cloudflare Pages (Recommended)

1. **Push to GitHub** — `git push origin main`
2. **Connect repo** in [Cloudflare Dashboard](https://dash.cloudflare.com/) &rarr; Pages &rarr; Create a project
3. **Set build command**: `npm run pages:build`
4. **Set build output directory**: `.vercel/output/static`
5. **Add environment variables** in Pages &rarr; Settings &rarr; Environment variables:
   - `DATABASE_URL`
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `ADMIN_EMAIL`
   - `SANITY_WRITE_TOKEN`
   - `ALLOWED_ORIGINS`
6. **Add KV binding** (optional but recommended):
   - `wrangler kv:namespace create RATE_LIMIT_KV`
   - Bind it in Pages &rarr; Settings &rarr; Functions &rarr; KV namespace bindings
7. **Deploy**

### Manual Build

```bash
npm install
npm run build              # Standard Next.js build
npm run pages:build        # Cloudflare adapter build
```

See [AGENTS.md](./AGENTS.md) for detailed architecture, security, database, and CMS reference.

---

## Brand Identity

| Token | Hex | Role |
|-------|-----|------|
| **Cream** | `#F7F3EC` | Primary background |
| **Forest Deep** | `#152E1C` | Headings, dark surfaces, footer |
| **Forest Mid** | `#1E5C30` | Accents, active states, labels |
| **Gold** | `#B8872A` | Primary CTA buttons |
| **Sage** | `#7DB89A` | Muted text, secondary accents |

| Font | Role | Weights |
|------|------|---------|
| **Cormorant Garamond** | Display headings (H1–H6) | 300–700 |
| **Jost** | Body text, UI, labels | 300–700 |

---

## License

Copyright &copy; 2024–2025 GreenMind Services LLP. All rights reserved.

---

<p align="center">
  Built with <a href="https://nextjs.org">Next.js</a> &middot; Styled with <a href="https://tailwindcss.com">Tailwind CSS</a> &middot; Deployed on <a href="https://pages.cloudflare.com">Cloudflare Pages</a>
</p>

