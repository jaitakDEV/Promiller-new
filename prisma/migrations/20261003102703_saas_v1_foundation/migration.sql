/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CalculatorType" AS ENUM ('ATTA_PRICING', 'CONVEYING_CAPACITY', 'POWER_SAVING');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('ISSUED', 'REVOKED');

-- CreateEnum
CREATE TYPE "ConsentDocument" AS ENUM ('TERMS', 'PRIVACY');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "phoneVerifiedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "company_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" VARCHAR(100),
    "city" VARCHAR(60),
    "state" VARCHAR(60),
    "gstin" VARCHAR(15),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consent_records" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "document" "ConsentDocument" NOT NULL,
    "version" TEXT NOT NULL,
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipHash" TEXT,
    "userAgent" VARCHAR(200),

    CONSTRAINT "consent_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calculation_reports" (
    "id" TEXT NOT NULL,
    "reportNo" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "calculatorType" "CalculatorType" NOT NULL,
    "calculatorVersion" TEXT NOT NULL,
    "title" VARCHAR(120),
    "note" VARCHAR(500),
    "inputs" JSONB NOT NULL,
    "results" JSONB NOT NULL,
    "headline" TEXT,
    "issuedTo" JSONB NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "status" "ReportStatus" NOT NULL DEFAULT 'ISSUED',
    "revokedAt" TIMESTAMP(3),
    "revokedReason" VARCHAR(300),
    "verifyKey" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "signatureVersion" INTEGER NOT NULL DEFAULT 1,
    "idempotencyKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "calculation_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_counters" (
    "prefix" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "lastValue" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "report_counters_pkey" PRIMARY KEY ("prefix","year")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_profiles_userId_key" ON "company_profiles"("userId");

-- CreateIndex
CREATE INDEX "consent_records_userId_document_acceptedAt_idx" ON "consent_records"("userId", "document", "acceptedAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "calculation_reports_reportNo_key" ON "calculation_reports"("reportNo");

-- CreateIndex
CREATE INDEX "calculation_reports_userId_createdAt_idx" ON "calculation_reports"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "calculation_reports_userId_calculatorType_createdAt_idx" ON "calculation_reports"("userId", "calculatorType", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "calculation_reports_userId_idempotencyKey_key" ON "calculation_reports"("userId", "idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "company_profiles" ADD CONSTRAINT "company_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consent_records" ADD CONSTRAINT "consent_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calculation_reports" ADD CONSTRAINT "calculation_reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
