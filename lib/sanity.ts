import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // cached reads on public data
})

// For mutations (write token required — server-side only)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

// Image URL builder
const builder = imageUrlBuilder(client)
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ─── Typed helpers ────────────────────────────────────────────────────────────

export interface SanityProject {
  _id: string
  title: string
  slug: { current: string }
  sector: string
  showClientName: boolean
  clientName?: string
  anonymizedAlias?: string
  location: string
  date: string
  status: 'completed' | 'ongoing' | 'planned'
  featured: boolean
  description: string
  outcome: string[]
  featuredImage?: SanityImageSource & { alt?: string }
  services: string[]
}

export interface SanityCertificate {
  _id: string
  certName: string
  authority: string
  certificateNumber?: string
  issueDate?: string
  expiryDate?: string
  isLifetime: boolean
  description?: string
  category: string
  status: 'active' | 'expired' | 'pending' | 'suspended'
  featured: boolean
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<SanityProject[]> {
  return client.fetch(
    `*[_type == "project"] | order(featured desc, date desc) {
      _id, title, slug, sector, showClientName, clientName, anonymizedAlias,
      location, date, status, featured, description, outcome,
      featuredImage { ..., alt }, services
    }`
  )
}

export async function getCertificates(): Promise<SanityCertificate[]> {
  return client.fetch(
    `*[_type == "certificate" && status == "active"] | order(featured desc, issueDate desc) {
      _id, certName, authority, certificateNumber, issueDate, expiryDate,
      isLifetime, description, category, status, featured
    }`
  )
}

// ─── Service ──────────────────────────────────────────────────────────────────

export interface SanityService {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  bullets?: string[]
  tagline?: string
  summary?: string
  whatYouGet?: string[]
  whyItMatters?: string
  howItWorks?: { step: string; detail: string }[]
  addOns?: string[]
  ctaLine?: string
  image?: SanityImageSource & { alt?: string }
  order?: number
}

export async function getServices(): Promise<SanityService[]> {
  return client.fetch(
    `*[_type == "service"] | order(order asc) {
      _id, title, slug, description, bullets, tagline, summary,
      whatYouGet, whyItMatters, howItWorks, addOns, ctaLine,
      image { ..., alt }, order
    }`
  )
}

export async function getServiceBySlug(slug: string): Promise<SanityService | null> {
  return client.fetch(
    `*[_type == "service" && slug.current == $slug][0] {
      _id, title, slug, description, bullets, tagline, summary,
      whatYouGet, whyItMatters, howItWorks, addOns, ctaLine,
      image { ..., alt }, order
    }`,
    { slug }
  )
}

// ─── Blog Post ────────────────────────────────────────────────────────────────

export interface SanityBlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  category: string
  publishedAt: string
  coverImage?: SanityImageSource & { alt?: string }
  featured: boolean
  sections?: { heading?: string; body: string }[]
}

export async function getBlogPosts(): Promise<SanityBlogPost[]> {
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id, title, slug, excerpt, category, publishedAt,
      coverImage { ..., alt }, featured
    }`
  )
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id, title, slug, excerpt, category, publishedAt,
      coverImage { ..., alt }, featured, sections, seo
    }`,
    { slug }
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface SanityFaqItem {
  _id: string
  question: string
  answer: string
  order?: number
  page?: string
}

export async function getFaqs(page: 'home' | 'services' | 'all' = 'home'): Promise<SanityFaqItem[]> {
  return client.fetch(
    `*[_type == "faqItem" && (page == $page || page == "all")] | order(order asc) {
      _id, question, answer, order, page
    }`,
    { page }
  )
}

// ─── Team Member ──────────────────────────────────────────────────────────────

export interface SanityTeamMember {
  _id: string
  name: string
  initials?: string
  role?: string
  expertise?: string
  bio?: string
  photo?: SanityImageSource & { alt?: string }
  order?: number
}

export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  return client.fetch(
    `*[_type == "teamMember"] | order(order asc) {
      _id, name, initials, role, expertise, bio, photo { ..., alt }, order
    }`
  )
}
