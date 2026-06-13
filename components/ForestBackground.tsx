/**
 * ForestBackground
 *
 * A full-bleed layered background for hero / CTA sections.
 * Renders a high-res forest image with a chosen CSS animation
 * and a colour overlay on top, both contained within an
 * overflow:hidden wrapper.
 *
 * Usage:
 *   <section className="relative overflow-hidden">
 *     <ForestBackground variant="drift" overlay="dark" />
 *     <div className="relative z-10">…content…</div>
 *   </section>
 */

interface ForestBackgroundProps {
  /** Animation style applied to the image layer */
  variant?: 'drift' | 'breathe' | 'ken'
  /**
   * Overlay colour/opacity on top of the image.
   * dark  → forest-deep 80 % — used on dark text-over-image sections
   * mid   → forest-deep 65 % — service hero overlays
   * light → cream 15 %      — used on cream-bg hero (tints slightly)
   */
  overlay?: 'dark' | 'mid' | 'light'
  /** Which forest photo to use — keyed for variety across sections */
  scene?: 'canopy' | 'floor' | 'roots' | 'sunlight' | 'aerial'
}

// 1600px wide, q=75 — adequate for full-bleed backgrounds on ≤4K displays and ~50% lighter than w=2400&q=85.
// When Cloudflare Images or Sanity's image pipeline is active, replace these
// with CDN-optimised URLs that serve width-negotiated WebP/AVIF.
const SCENES: Record<string, string> = {
  canopy:   'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=75&fit=crop',
  floor:    'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=1600&q=75&fit=crop',
  roots:    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&q=75&fit=crop',
  sunlight: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1600&q=75&fit=crop',
  aerial:   'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=75&fit=crop',
}

const ANIMATION_CLASS: Record<string, string> = {
  drift:   'forest-bg-drift',
  breathe: 'forest-bg-breathe',
  ken:     'forest-bg-ken',
}

const OVERLAY_CLASS: Record<string, string> = {
  dark:  'bg-forest-deep/80',
  mid:   'bg-forest-deep/65',
  light: 'bg-cream/15',
}

export default function ForestBackground({
  variant = 'drift',
  overlay = 'dark',
  scene   = 'canopy',
}: ForestBackgroundProps) {
  const src          = SCENES[scene]  ?? SCENES.canopy
  const animClass    = ANIMATION_CLASS[variant] ?? ANIMATION_CLASS.drift
  const overlayClass = OVERLAY_CLASS[overlay]   ?? OVERLAY_CLASS.dark

  return (
    <>
      {/* Image layer — animates independently of the overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
        style={{ zIndex: 0, contentVisibility: 'auto' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          role="presentation"
          className={`w-full h-full object-cover origin-center ${animClass}`}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      {/* Colour overlay — static, sits above the moving image */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${overlayClass}`}
        style={{ zIndex: 1 }}
      />
    </>
  )
}