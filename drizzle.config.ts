// drizzle.config.ts is used only by the drizzle-kit CLI tool — not by Next.js.
// Install drizzle-kit when you need to run migrations:
//   npm install -D drizzle-kit
//   npx drizzle-kit generate:pg
//   npx drizzle-kit push:pg
//
// TypeScript ignores this file during the Next.js build (see tsconfig.json exclude).

export default {
  schema: './lib/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // Set DATABASE_URL in .env.local before running migrations.
    // Format: postgres://user:password@host/dbname?sslmode=require
    url: process.env.DATABASE_URL!,
  },
}
