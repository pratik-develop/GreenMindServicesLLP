-- GreenMind Services LLP — Database Schema
-- Apply this to your Neon database via the Neon SQL Editor or psql.
-- Always run in a transaction; always back up before altering a production DB.
--
-- Migration history:
--   v1 (initial) : enquiries table with basic fields
--   v2 (current) : + enquiry_status enum, + updatedAt, + deletedAt,
--                    + source/UTM attribution, + service_slug index,
--                    + status constraint, phone length fix
-- ─────────────────────────────────────────────────────────────────────────────

BEGIN;

-- ─── 1. Status enum ───────────────────────────────────────────────────────────
-- Using a native PG enum constrains the status column to known values at the
-- database level — no application-layer typos can corrupt the workflow state.
DO $$ BEGIN
  CREATE TYPE enquiry_status AS ENUM (
    'new',
    'contacted',
    'qualified',
    'closed',
    'spam'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ─── 2. Create table (idempotent) ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enquiries (
  -- Identity
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Submitter
  full_name       VARCHAR(150)  NOT NULL,
  organisation    VARCHAR(200),
  email           VARCHAR(254)  NOT NULL,
  phone           VARCHAR(30),

  -- Enquiry
  service_slug    VARCHAR(100),
  message         TEXT          CHECK (message IS NULL OR char_length(message) <= 5000),

  -- Workflow
  status          enquiry_status NOT NULL DEFAULT 'new',

  -- Attribution (populated from UTM params / referrer header)
  source          VARCHAR(100),
  utm_campaign    VARCHAR(150),
  utm_medium      VARCHAR(80),
  utm_source      VARCHAR(100),

  -- Audit
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  -- Soft-delete: set to a timestamp to hide from queries; hard-delete via
  -- periodic purge job (WHERE deleted_at < NOW() - INTERVAL '2 years') for
  -- DPDP Act 2023 data retention compliance.
  deleted_at      TIMESTAMPTZ
);

-- ─── 3. Migrate existing status column if upgrading from v1 ───────────────────
-- If the table existed with status VARCHAR(20), cast it to the new enum type.
-- Safe to run even if the column is already the enum type (DO block catches it).
DO $$ BEGIN
  -- Only needed when upgrading from varchar status; skip on fresh install.
  ALTER TABLE enquiries
    ALTER COLUMN status TYPE enquiry_status
    USING status::enquiry_status;
EXCEPTION WHEN others THEN NULL;
END $$;

-- ─── 4. auto-update updated_at trigger ───────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enquiries_updated_at ON enquiries;
CREATE TRIGGER trg_enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── 5. Indexes ───────────────────────────────────────────────────────────────
-- Covering the most common admin query patterns:
--   "show me new enquiries"   → status
--   "find by email"           → email
--   "show recent"             → created_at DESC
--   "filter by service"       → service_slug
--   "soft-deleted cleanup"    → deleted_at (WHERE deleted_at IS NOT NULL)

CREATE INDEX IF NOT EXISTS idx_enquiries_email        ON enquiries(email);
CREATE INDEX IF NOT EXISTS idx_enquiries_status       ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at   ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_service_slug ON enquiries(service_slug);
CREATE INDEX IF NOT EXISTS idx_enquiries_deleted_at   ON enquiries(deleted_at)
  WHERE deleted_at IS NOT NULL;  -- partial index: only indexes non-null rows

COMMIT;

-- ─────────────────────────────────────────────────────────────────────────────
-- Periodic data retention purge (run as a scheduled job / cron):
--
--   DELETE FROM enquiries
--   WHERE deleted_at IS NOT NULL
--     AND deleted_at < NOW() - INTERVAL '2 years';
--
-- This implements DPDP Act 2023 data minimisation requirements.
-- ─────────────────────────────────────────────────────────────────────────────
