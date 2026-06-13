import 'server-only'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '@/lib/schema'

// ─── DB client ────────────────────────────────────────────────────────────────
// Let drizzle infer the exact generic type from the schema rather than
// annotating with NeonHttpDatabase<...> — avoids version-sensitive type
// mismatches between @neondatabase/serverless and drizzle-orm/neon-http.
// The instance is still fully typed for all query operations.

let _db: ReturnType<typeof buildDb> | null = null

function buildDb() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Copy .env.local.example → .env.local and fill in the Neon connection string.',
    )
  }
  return drizzle(neon(url), { schema })
}

export function getDb() {
  if (!_db) _db = buildDb()
  return _db
}

// ─── Re-export schema types ───────────────────────────────────────────────────
// Import types from lib/schema — this file no longer defines its own Enquiry
// interface (which previously had id:number vs schema's id:uuid — a silent bug).
export type { Enquiry, NewEnquiry, EnquiryStatus } from '@/lib/schema'
