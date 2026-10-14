ALTER TABLE "player_registration"
  ADD COLUMN "indemnityName" TEXT,
  ADD COLUMN "attestationName" TEXT,
  ADD COLUMN "indemnityAccepted" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "attestationAccepted" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "signature" TEXT,
  ADD COLUMN "signatureDate" TIMESTAMP(3);
