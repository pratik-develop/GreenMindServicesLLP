// lib/content/blog.ts
import { getBlogPosts as _getBlogPosts, getBlogPostBySlug as _getBlogPostBySlug } from '@/lib/sanity'
import type { BlogPost } from './types'

export type { BlogPost }

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return await _getBlogPosts()
  } catch (err) {
    console.error('[content/blog] getBlogPosts failed:', err)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await _getBlogPostBySlug(slug)
  } catch (err) {
    console.error('[content/blog] getBlogPostBySlug failed:', err)
    return null
  }
}
