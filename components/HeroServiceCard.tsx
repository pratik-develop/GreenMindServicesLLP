import Image from 'next/image'
import Link from 'next/link'
import SectionReveal from './SectionReveal'
import type { LucideIcon } from 'lucide-react'

interface HeroServiceCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  image: string
  delay?: number
}

export default function HeroServiceCard({
  title,
  description,
  href,
  icon: Icon,
  image,
  delay = 0,
}: HeroServiceCardProps) {
  return (
    <SectionReveal delay={delay}>
      <Link
        href={href}
        className="group relative block h-44 sm:h-48 md:h-44 lg:h-48 xl:h-52 rounded-2xl overflow-hidden border border-cream/20 shadow-lg shadow-forest-deep/10 transition-all duration-300 hover:shadow-xl hover:shadow-forest-deep/15 hover:-translate-y-1"
      >
        {/* Background image */}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/45 to-forest-deep/10" />

        {/* Icon */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-cream/15 backdrop-blur-sm border border-cream/25 flex items-center justify-center">
          <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-cream" strokeWidth={1.75} />
        </div>

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <h3 className="font-display font-semibold text-base sm:text-lg text-cream leading-tight mb-1">
            {title}
          </h3>
          <p className="text-cream/80 text-xs sm:text-sm leading-snug line-clamp-2">
            {description}
          </p>
        </div>
      </Link>
    </SectionReveal>
  )
}
