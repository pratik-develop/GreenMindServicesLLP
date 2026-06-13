// lib/content/certificates.ts
import { getCertificates as _getCertificates } from '@/lib/sanity'
import type { Certificate } from './types'

export type { Certificate }

export async function getCertificates(): Promise<Certificate[]> {
  try {
    return await _getCertificates()
  } catch (err) {
    console.error('[content/certificates] getCertificates failed:', err)
    return []
  }
}
