import 'server-only'
import { pgTable, pgEnum, uuid, varchar, text, timestamp, index } from 'drizzle-orm/pg-core'

// ─── Enums ────────────────────────────────────────────────────────────────────
// Constrains status to valid values at the DB level — prevents silent corruption
// from raw SQL updates or future code paths writing ad-hoc strings.
export const enquiryStatusEnum = pgEnum('enquiry_status', [
  'new',        // just submitted, not yet reviewed
  'contacted',  // team has reached out
  'qualified',  // scoping call completed, proposal being prepared
  'closed',     // deal won or lost
  'spam',       // flagged as bot / fraudulent
])

// ─── Enquiries table ──────────────────────────────────────────────────────────
export const enquiries = pgTable(
  'enquiries',
  {
    // Identity
    id:           uuid('id').primaryKey().defaultRandom(),

    // Submitter fields
    fullName:     varchar('full_name',    { length: 150 }).notNull(),
    organisation: varchar('organisation', { length: 200 }),
    email:        varchar('email',        { length: 254 }).notNull(),
    phone:        varchar('phone',        { length: 30 }),

    // Enquiry content
    serviceSlug:  varchar('service_slug', { length: 100 }),
    message:      text('message'),

    // Workflow
    status:       enquiryStatusEnum('status').default('new').notNull(),

    // Attribution — populated from UTM params / referrer when present
    source:       varchar('source',       { length: 100 }),
    utmCampaign:  varchar('utm_campaign', { length: 150 }),
    utmMedium:    varchar('utm_medium',   { length: 80 }),
    utmSource:    varchar('utm_source',   { length: 100 }),

    // Audit timestamps
    createdAt:    timestamp('created_at',  { withTimezone: true }).defaultNow().notNull(),
    updatedAt:    timestamp('updated_at',  { withTimezone: true }).defaultNow().notNull(),
    // Soft-delete: set to a timestamp to hide from queries without destroying data.
    // Required for DPDP Act 2023 retention compliance — run a periodic purge job
    // that hard-deletes rows where deleted_at < NOW() - INTERVAL '2 years'.
    deletedAt:    timestamp('deleted_at',  { withTimezone: true }),
  },
  // ─── Indexes ────────────────────────────────────────────────────────────────
  // Added explicitly — Drizzle does not auto-create indexes beyond primary key.
  (table) => ({
    emailIdx:      index('idx_enquiries_email').on(table.email),
    statusIdx:     index('idx_enquiries_status').on(table.status),
    createdAtIdx:  index('idx_enquiries_created_at').on(table.createdAt),
    serviceIdx:    index('idx_enquiries_service_slug').on(table.serviceSlug),
    deletedAtIdx:  index('idx_enquiries_deleted_at').on(table.deletedAt),
  }),
)

// ─── Derived types ────────────────────────────────────────────────────────────
export type Enquiry    = typeof enquiries.$inferSelect
export type NewEnquiry = typeof enquiries.$inferInsert
export type EnquiryStatus = typeof enquiryStatusEnum.enumValues[number]
