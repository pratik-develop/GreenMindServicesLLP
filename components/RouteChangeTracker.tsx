"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackPageView } from '@/lib/analytics'

export default function RouteChangeTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams?.toString()
    const url = pathname + (query ? `?${query}` : '')
    trackPageView(url, document.title)
  }, [pathname, searchParams])

  return null
}
