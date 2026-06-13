import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'GreenMind Services LLP'
    const description = searchParams.get('description') || 'Environmental & Compliance Consultants'
    const type = searchParams.get('type') || 'website'

    // Colors matching the brand
    const colors = {
      forest: '#152E1C',
      forestMid: '#1E5C30',
      gold: '#B8872A',
      goldLight: '#D4A84D',
      cream: '#F7F3EC',
    }

    return new ImageResponse(
      (
        <div
          style={{
            width: '1200',
            height: '630',
            display: 'flex',
            flexDirection: 'column',
            background: `linear-gradient(135deg, ${colors.forest} 0%, ${colors.forestMid} 100%)`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background pattern - sacred geometry hint */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '800',
              height: '800',
              opacity: 0.05,
              border: `3px solid ${colors.gold}`,
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(45deg)',
              width: '600',
              height: '600',
              opacity: 0.03,
              border: `2px solid ${colors.gold}`,
            }}
          />

          {/* Content container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '60px 80px',
              height: '100%',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* Top section with logo mark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Logo emblem */}
              <div
                style={{
                  width: '80',
                  height: '80',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {/* Outer circle */}
                <div
                  style={{
                    position: 'absolute',
                    width: '80',
                    height: '80',
                    border: `2px solid ${colors.gold}`,
                    borderRadius: '50%',
                    opacity: 0.5,
                  }}
                />
                {/* Diamond frame */}
                <div
                  style={{
                    position: 'absolute',
                    width: '56',
                    height: '56',
                    border: `2px solid ${colors.gold}`,
                    transform: 'rotate(45deg)',
                    opacity: 0.6,
                  }}
                />
                {/* Inner diamond */}
                <div
                  style={{
                    position: 'absolute',
                    width: '40',
                    height: '40',
                    border: `1px solid ${colors.gold}`,
                    transform: 'rotate(45deg)',
                    opacity: 0.4,
                  }}
                />
                {/* Leaf shape */}
                <svg width="36" height="44" viewBox="0 0 36 44">
                  <path
                    d="M18 2 C28 10, 32 22, 28 34 C26 38, 22 40, 18 42 C14 40, 10 38, 8 34 C4 22, 8 10, 18 2 Z"
                    fill={colors.forestMid}
                    stroke={colors.gold}
                    strokeWidth="1"
                  />
                  <path
                    d="M18 10 Q19 22, 18 38"
                    fill="none"
                    stroke={colors.gold}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Brand name */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '32',
                    fontWeight: 600,
                    color: colors.cream,
                    letterSpacing: '0.02em',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  GREENMIND
                </span>
                <span
                  style={{
                    fontSize: '14',
                    fontWeight: 400,
                    color: colors.gold,
                    letterSpacing: '0.15em',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  SERVICES LLP
                </span>
              </div>
            </div>

            {/* Middle section - Main content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800' }}>
              {/* Type badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  background: `${colors.gold}20`,
                  borderRadius: '4px',
                  alignSelf: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '8',
                    height: '8',
                    background: colors.gold,
                    borderRadius: '50%',
                  }}
                />
                <span
                  style={{
                    fontSize: '12',
                    fontWeight: 500,
                    color: colors.goldLight,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  {type}
                </span>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontSize: '56',
                  fontWeight: 600,
                  color: colors.cream,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  fontFamily: 'Georgia, serif',
                  margin: 0,
                }}
              >
                {title}
              </h1>

              {/* Description */}
              <p
                style={{
                  fontSize: '24',
                  color: `${colors.cream}cc`,
                  lineHeight: 1.4,
                  maxWidth: '700',
                  fontFamily: 'system-ui, sans-serif',
                  margin: 0,
                }}
              >
                {description}
              </p>
            </div>

            {/* Bottom section - Tagline and URL */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '40px',
                borderTop: `1px solid ${colors.gold}30`,
              }}
            >
              <span
                style={{
                  fontSize: '16',
                  color: colors.gold,
                  letterSpacing: '0.15em',
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                Preserve · Protect · Prosper
              </span>
              <span
                style={{
                  fontSize: '14',
                  color: `${colors.cream}80`,
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                greenmind.services
              </span>
            </div>
          </div>

          {/* Decorative corner elements */}
          <div
            style={{
              position: 'absolute',
              top: '20',
              right: '20',
              width: '100',
              height: '100',
              borderTop: `2px solid ${colors.gold}40`,
              borderRight: `2px solid ${colors.gold}40`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20',
              left: '20',
              width: '100',
              height: '100',
              borderBottom: `2px solid ${colors.gold}40`,
              borderLeft: `2px solid ${colors.gold}40`,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    console.log(`${e}`)
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}
