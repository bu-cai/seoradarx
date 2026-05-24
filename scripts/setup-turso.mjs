import { createClient } from '@libsql/client'

// Run: TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... node scripts/setup-turso.mjs
const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const statements = [
  `CREATE TABLE IF NOT EXISTS "Audit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "categoryScores" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "pdfZhGenerated" BOOLEAN NOT NULL DEFAULT false,
    "pdfEnGenerated" BOOLEAN NOT NULL DEFAULT false,
    "stripeSessionId" TEXT,
    "ipAddress" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'zh',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS "RateLimit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ipAddress" TEXT NOT NULL UNIQUE,
    "count" INTEGER NOT NULL DEFAULT 1,
    "resetAt" DATETIME NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS "EmailLead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'zh',
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE INDEX IF NOT EXISTS "Audit_url_idx" ON "Audit"("url")`,
  `CREATE INDEX IF NOT EXISTS "Audit_stripeSessionId_idx" ON "Audit"("stripeSessionId")`,
  `CREATE INDEX IF NOT EXISTS "EmailLead_email_idx" ON "EmailLead"("email")`,
  `CREATE INDEX IF NOT EXISTS "EmailLead_auditId_idx" ON "EmailLead"("auditId")`,
]

console.log('Connecting to Turso...')
for (const sql of statements) {
  const preview = sql.trim().split('\n')[0].trim()
  process.stdout.write(`Running: ${preview} ... `)
  await client.execute(sql)
  console.log('OK')
}

// Verify
const result = await client.execute(`SELECT name FROM sqlite_master WHERE type='table'`)
console.log('\n✅ Tables created:')
result.rows.forEach(r => console.log(' -', r.name))
