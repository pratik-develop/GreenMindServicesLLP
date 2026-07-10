import Image from 'next/image'
import SectionReveal from './SectionReveal'
import type { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  icon?: LucideIcon
  image?: string
  delay?: number
}

// Fallback image used when no explicit image is passed
const fallbackServiceImage = 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=75'

export default function ServiceCard({ title, description, icon: Icon, image, delay = 0 }: ServiceCardProps) {
  const thumbnail = image ?? fallbackServiceImage

  return (
    <SectionReveal delay={delay}>
      <div className="card-base card-hover h-full flex flex-col overflow-hidden">
        {/* Image banner with icon overlay */}
        <div className="relative h-32 overflow-hidden flex-shrink-0">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/55 via-forest-deep/10 to-transparent" />
          {Icon && (
            <div className="absolute bottom-3 left-4 w-9 h-9 rounded-lg bg-page/15 backdrop-blur-sm border border-cream/25 flex items-center justify-center">
              <Icon className="w-4.5 h-4.5 text-cream" strokeWidth={1.75} />
            </div>
          )}
        </div>
        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col flex-1">
          <h3 className="heading-card text-primary mb-3">
            {title}
          </h3>
          <p className="text-primary/65 flex-1 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </SectionReveal>
  )
}
