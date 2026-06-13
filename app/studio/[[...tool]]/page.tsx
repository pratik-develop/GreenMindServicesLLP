/**
 * Sanity Studio embedded at /studio
 * Access your CMS at: https://yourdomain.com/studio
 */
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
