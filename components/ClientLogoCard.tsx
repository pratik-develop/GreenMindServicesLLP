interface ClientLogoCardProps {
  name: string
  sector: string
  location?: string
}

export default function ClientLogoCard({ name, sector, location }: ClientLogoCardProps) {
  const clean = name.replace(/^(M\/s\.?|The\s|Shri\s|Dr\.?\s|Mr\.?\s|Mrs\.?\s|Ms\.?\s|Sri\s)\s*/i, '').trim()
  const words = clean.split(/\s+/)
  const monogram = words.length >= 2
    ? (words[0][0] + words[1][0]).toUpperCase()
    : clean.slice(0, 2).toUpperCase()

  return (
    <div className="flex items-center gap-4 card-base card-hover px-5 py-4 md:px-6 md:py-5 min-h-[72px] group">
      {/* Gradient monogram badge */}
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-secondary/15 to-primary/8 flex items-center justify-center flex-shrink-0 group-hover:from-secondary/25 group-hover:to-primary/15 transition-colors">
        <span className="font-display font-bold text-sm md:text-base text-secondary leading-none select-none">
          {monogram}
        </span>
      </div>
      <div className="min-w-0">
        <p className="font-body font-semibold text-sm md:text-base text-primary leading-snug line-clamp-2">
          {clean}
        </p>
        <p className="text-xs md:text-sm text-primary/45 mt-1 truncate">
          {sector}{location ? ` · ${location}` : ''}
        </p>
      </div>
    </div>
  )
}
