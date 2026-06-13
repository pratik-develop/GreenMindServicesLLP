# GreenMind Services LLP Website

A Next.js 14 website for GreenMind Services LLP - Environmental & Compliance Consultants.

## Features

- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Smooth Animations**: Lenis smooth scrolling, page transitions, section reveals
- **Responsive Design**: Mobile-first approach with glassmorphic navbar
- **Contact Form**: Edge API route with rate limiting, honeypot protection, and lead scoring
- **Cloudflare Ready**: Configured for Cloudflare Pages deployment

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository and navigate to the project:
```bash
cd "GreenMind v2"
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
copy .env.local.example .env.local
```

Edit `.env.local` with your actual values:
- `DATABASE_URL` (optional for local dev)
- `RESEND_API_KEY` (optional for local dev)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  ├── layout.tsx          # Root layout with fonts and providers
  ├── page.tsx            # Home page (7 sections)
  ├── globals.css         # Global styles and Tailwind imports
  ├── not-found.tsx       # 404 page
  ├── about/              # About page
  ├── services/           # Services index + detail pages
  ├── resources/          # Blog/Resources index + articles
  ├── contact/            # Contact page with form
  ├── policies/           # Privacy + Terms pages
  └── api/enquiry/        # Contact form API route

components/               # Reusable React components
  ├── Navbar.tsx
  ├── Footer.tsx
  ├── SectionReveal.tsx
  ├── CtaButton.tsx
  ├── PageTransition.tsx
  ├── TestimonialsCarousel.tsx
  ├── FaqAccordion.tsx
  ├── BlogCard.tsx
  ├── ServiceCard.tsx
  └── StatsGrid.tsx

lib/                     # Utility libraries
  ├── db.ts              # Neon database client
  ├── email.ts           # Resend email functions
  └── leadScore.ts       # Lead scoring algorithm

middleware.ts            # Security headers + CVE protection
```

## Deployment

### Cloudflare Pages

1. Push your code to GitHub
2. Connect your repository to Cloudflare Pages
3. Set environment variables in Cloudflare Dashboard:
   - `DATABASE_URL`
   - `RESEND_API_KEY`
4. Deploy!

### Manual Deployment

```bash
npm install
npm run build
# Or for Cloudflare:
npx @cloudflare/next-on-pages
```

## Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| Cream | `#F7F3EC` | Background |
| Forest Deep | `#152E1C` | Primary text |
| Forest Mid | `#1E5C30` | Accent |
| Gold | `#B8872A` | CTA buttons |
| Sage | `#7DB89A` | Muted text |

## Fonts

- **Display**: Cormorant Garamond
- **Body**: Jost

## Contact

For support or inquiries, contact GreenMind Services LLP.

---

Built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com).
