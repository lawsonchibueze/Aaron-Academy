-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('NEW', 'REVIEWED');

-- CreateTable
CREATE TABLE "player_registration" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "age" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "playerPhone" TEXT,
    "parentName" TEXT NOT NULL,
    "parentPhone" TEXT NOT NULL,
    "occupation" TEXT,
    "address" TEXT NOT NULL,
    "healthStatus" TEXT,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_message" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "player_registration_category_idx" ON "player_registration"("category");
CREATE INDEX "player_registration_createdAt_idx" ON "player_registration"("createdAt");
CREATE INDEX "contact_message_createdAt_idx" ON "contact_message"("createdAt");
