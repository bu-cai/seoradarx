-- CreateTable
CREATE TABLE "Audit" (
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
);

-- CreateTable
CREATE TABLE "RateLimit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ipAddress" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "resetAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Audit_url_idx" ON "Audit"("url");

-- CreateIndex
CREATE INDEX "Audit_stripeSessionId_idx" ON "Audit"("stripeSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "RateLimit_ipAddress_key" ON "RateLimit"("ipAddress");
