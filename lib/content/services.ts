// lib/content/services.ts
import { getServices as _getServices, getServiceBySlug as _getServiceBySlug } from '@/lib/sanity'
import type { Service } from './types'

export type { Service }

export async function getServices(): Promise<Service[]> {
  try {
    return await _getServices()
  } catch (err) {
    console.error('[content/services] getServices failed:', err)
    return []
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    return await _getServiceBySlug(slug)
  } catch (err) {
    console.error('[content/services] getServiceBySlug failed:', err)
    return null
  }
}
