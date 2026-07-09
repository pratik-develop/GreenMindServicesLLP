"use client"

import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

type TrackedLinkProps = React.ComponentProps<typeof Link> & {
  eventName?: string
  eventParams?: Record<string, any>
}

export default function TrackedLink({
  href,
  eventName,
  eventParams,
  onClick,
  ...rest
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (eventName) {
      trackEvent(eventName, eventParams)
    }
    onClick?.(e)
  }

  const hrefStr = typeof href === 'string' ? href : ''
  const isExternal = hrefStr.startsWith('http') || hrefStr.startsWith('mailto:') || hrefStr.startsWith('tel:')

  if (isExternal) {
    return <a href={hrefStr} onClick={handleClick} {...rest} />
  }

  return <Link href={href} onClick={handleClick} {...rest} />
}
