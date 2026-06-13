// lib/content/types.ts
// Canonical content types used across the application.
// Pages import from here — never directly from lib/sanity.ts.
// Swapping the CMS means updating lib/content/*.ts, not touching page components.

export type {
  SanityProject    as Project,
  SanityCertificate as Certificate,
  SanityService     as Service,
  SanityBlogPost    as BlogPost,
  SanityFaqItem     as FaqItem,
  SanityTeamMember  as TeamMember,
} from '@/lib/sanity'
