import Image from 'next/image'
import TrackedLink from './TrackedLink'
import SectionReveal from './SectionReveal'

interface BlogCardProps {
  title: string
  excerpt: string
  category: string
  date: string
  slug: string
  image?: string
  delay?: number
  featured?: boolean
}

const categoryImages: Record<string, string> = {
  Strategy:      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80',
  Reporting:     'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80',
  Communication: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=900&q=80',
  Measurement:   'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80',
  Guide:         'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=900&q=80',
  Trends:        'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=900&q=80',
  Comparison:    'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=900&q=80',
}
const fallbackImage = 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80'

export default function BlogCard({ title, excerpt, category, date, slug, image, delay = 0, featured = false }: BlogCardProps) {
  const thumbnail = image ?? categoryImages[category] ?? fallbackImage

  // ── Featured (wide landscape) card ─────────────────────────────────────────
  if (featured) {
    return (
      <SectionReveal delay={delay}>
        <TrackedLink href={`/resources/${slug}`} className="group block" eventName="resource_click" eventParams={{ slug, title, category, location: 'featured' }}>
          <article className="card-base card-hover overflow-hidden grid grid-cols-1 md:grid-cols-2">
            {/* Image — left half on desktop, top on mobile */}
            <div className="relative h-56 md:h-full min-h-[220px] overflow-hidden">
              <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-forest-deep/50 via-forest-deep/10 to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1.5 bg-primary/85 text-cream text-xs font-body font-semibold rounded-full backdrop-blur-sm border border-cream/20">
                {category}
              </span>
            </div>
            {/* Content — right half */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <p className="text-primary/40 text-xs font-body mb-3">{date}</p>
              <h2 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-primary mb-3 group-hover:text-secondary transition-colors leading-snug">
                {title}
              </h2>
              <p className="text-primary/60 text-sm md:text-base leading-relaxed mb-6 flex-1">
                {excerpt}
              </p>
              <div className="flex items-center text-secondary text-sm font-body font-semibold group-hover:translate-x-1 transition-transform duration-300">
                Read article
                <svg className="w-5 h-5 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </article>
        </TrackedLink>
      </SectionReveal>
    )
  }

  // ── Standard card ───────────────────────────────────────────────────────────
  return (
    <SectionReveal delay={delay}>
      <TrackedLink href={`/resources/${slug}`} className="group block h-full" eventName="resource_click" eventParams={{ slug, title, category, location: 'grid' }}>
        <article className="card-base card-hover h-full flex flex-col overflow-hidden">
          {/* Image */}
          <div className="relative h-44 sm:h-48 overflow-hidden bg-primary/10 flex-shrink-0">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/55 via-forest-deep/10 to-transparent" />
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary/85 text-cream text-xs font-body font-semibold rounded-full backdrop-blur-sm border border-cream/20">
              {category}
            </span>
          </div>

          {/* Content */}
          <div className="p-5 md:p-6 flex flex-col flex-1">
            <p className="text-primary/40 text-xs font-body mb-2.5">{date}</p>
            <h3 className="heading-card text-primary mb-2 group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
              {title}
            </h3>
            <p className="text-primary/58 text-sm leading-relaxed flex-1 line-clamp-2">
              {excerpt}
            </p>
            <div className="flex items-center text-secondary text-sm font-body font-semibold mt-4 pt-4 border-t border-secondary/12 group-hover:translate-x-1 transition-transform duration-300">
              Read more
              <svg className="w-4 h-4 ml-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </article>
      </TrackedLink>
    </SectionReveal>
  )
}
