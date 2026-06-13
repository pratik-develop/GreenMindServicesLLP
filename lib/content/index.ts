// lib/content/index.ts
// Single entry point for all content queries.
// Import from '@/lib/content' in page components — not from individual files.

export * from './projects'
export * from './services'
export * from './blog'
export * from './faqs'
export * from './team'
export * from './certificates'
export type { Project, Certificate, Service, BlogPost, FaqItem, TeamMember } from './types'
