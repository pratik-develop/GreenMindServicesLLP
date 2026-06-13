import fs from 'fs'

const path = 'app/page.tsx'
let content = fs.readFileSync(path, 'utf8')

const markers = {
  about:    '{/* ── About strip',
  commit:   '{/* ── Our Commitment',
  services: '{/* ── Services',
  how:      '{/* ── How We Work',
  why:      '{/* ── Why Choose Us',
  test:     '{/* ── Testimonials',
  blog:     '{/* ── Blog Preview',
  faq:      '{/* ── FAQ',
  quiz:     '{/* ── Compliance Quiz',
}

const endMarker = '</div>{/* end .section-stack */}'

// Extract a block from the start of the marker's line through the next </section> (inclusive)
function extractBlock(markerText) {
  const idx = content.indexOf(markerText)
  if (idx === -1) throw new Error('marker not found: ' + markerText)
  const lineStart = content.lastIndexOf('\n', idx) + 1
  const secEnd = content.indexOf('</section>', idx)
  if (secEnd === -1) throw new Error('section end not found for: ' + markerText)
  const end = secEnd + '</section>'.length
  return { lineStart, end, text: content.slice(lineStart, end) }
}

const blocks = {}
for (const [k, m] of Object.entries(markers)) blocks[k] = extractBlock(m)

// Region to replace: from start of About comment line to end of the stack-close marker
const regionStart = blocks.about.lineStart
const endIdx = content.indexOf(endMarker)
const regionEnd = endIdx + endMarker.length

// Strip the stray section-stack opening div out of the About block (it lives between
// the About comment and the About <section>). We re-add the wrapper ourselves.
let aboutText = blocks.about.text.replace(/\r?\n[ \t]*<div className="section-stack">/, '')

const ordered = [
  blocks.services.text,
  aboutText,
  blocks.commit.text,
  blocks.how.text,
  blocks.why.text,
  blocks.quiz.text,
  blocks.test.text,
  blocks.blog.text,
  blocks.faq.text,
]

// Detect newline style for consistency
const nl = content.includes('\r\n') ? '\r\n' : '\n'
const sep = nl + nl

const newRegion =
  '      <div className="section-stack">' + sep +
  ordered.join(sep) + sep +
  '      ' + endMarker

content = content.slice(0, regionStart) + newRegion + content.slice(regionEnd)

fs.writeFileSync(path, content, 'utf8')

// Report resulting order
const order = []
for (const [k, m] of Object.entries(markers)) order.push([content.indexOf(m), k])
order.sort((a, b) => a[0] - b[0])
console.log('New section order:', order.map(o => o[1]).join(' → '))
