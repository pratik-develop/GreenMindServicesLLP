export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

// Helper function to check if Sanity is configured
export function isSanityConfigured(): boolean {
  return !!projectId
}

// Dynamic client creation - only import Sanity when configured
let client: any = null
let writeClient: any = null
let urlFor: any = null

async function initializeClients() {
  if (!isSanityConfigured() || client) return
  
  try {
    // Dynamic imports to prevent build errors
    const { createClient } = await import('next-sanity')
    const imageUrlBuilder = await import('@sanity/image-url')
    
    client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
    
    writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_WRITE_TOKEN,
    })
    
    const builder = imageUrlBuilder.default(client)
    urlFor = (source: any) => builder.image(source)
  } catch (error) {
    console.warn('Failed to initialize Sanity client:', error)
  }
}

export async function getClient() {
  await initializeClients()
  return client
}

export async function getWriteClient() {
  await initializeClients()
  return writeClient
}

export async function getUrlFor() {
  await initializeClients()
  return urlFor
}

// Export urlFor directly for backward compatibility
export { urlFor }

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
  featuredImage?: any & { alt?: string }
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
  if (!isSanityConfigured()) return []
  const client = await getClient()
  if (!client) return []
  return client.fetch(
    `*[_type == "project"] | order(featured desc, date desc) {
      _id, title, slug, sector, showClientName, clientName, anonymizedAlias,
      location, date, status, featured, description, outcome,
      featuredImage { ..., alt }, services
    }`
  )
}

export async function getCertificates(): Promise<SanityCertificate[]> {
  if (!isSanityConfigured()) return []
  const client = await getClient()
  if (!client) return []
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
  image?: any & { alt?: string }
  order?: number
}

export async function getServices(): Promise<SanityService[]> {
  if (!isSanityConfigured()) return []
  const client = await getClient()
  if (!client) return []
  return client.fetch(
    `*[_type == "service"] | order(order asc) {
      _id, title, slug, description, bullets, tagline, summary,
      whatYouGet, whyItMatters, howItWorks, addOns, ctaLine,
      image { ..., alt }, order
    }`
  )
}

export async function getServiceBySlug(slug: string): Promise<SanityService | null> {
  if (!isSanityConfigured()) return null
  const client = await getClient()
  if (!client) return null
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
  coverImage?: any & { alt?: string }
  featured: boolean
  sections?: { heading?: string; body: string }[]
}

export async function getBlogPosts(): Promise<SanityBlogPost[]> {
  if (!isSanityConfigured()) return []
  const client = await getClient()
  if (!client) return []
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id, title, slug, excerpt, category, publishedAt,
      coverImage { ..., alt }, featured
    }`
  )
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  if (!isSanityConfigured()) return null
  const client = await getClient()
  if (!client) return null
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
  if (!isSanityConfigured()) return []
  const client = await getClient()
  if (!client) return []
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
  photo?: any & { alt?: string }
  order?: number
}

export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  if (!isSanityConfigured()) return []
  const client = await getClient()
  if (!client) return []
  return client.fetch(
    `*[_type == "teamMember"] | order(order asc) {
      _id, name, initials, role, expertise, bio, photo { ..., alt }, order
    }`
  )
}
