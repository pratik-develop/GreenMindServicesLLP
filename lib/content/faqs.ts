// lib/content/faqs.ts
import { getFaqs as _getFaqs } from '@/lib/sanity'
import type { FaqItem } from './types'

export type { FaqItem }

export async function getFaqs(page: 'home' | 'services' | 'all' = 'home'): Promise<FaqItem[]> {
  try {
    return await _getFaqs(page)
  } catch (err) {
    console.error('[content/faqs] getFaqs failed:', err)
    return []
  }
}
