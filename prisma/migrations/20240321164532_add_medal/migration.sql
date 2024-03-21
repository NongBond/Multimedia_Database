-- CreateEnum
CREATE TYPE "MedalType" AS ENUM ('GOLD', 'SILVER', 'BRONZE');

-- CreateTable
CREATE TABLE "Medal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "MedalType" NOT NULL,
    "athleteId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "Medal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Medal" ADD CONSTRAINT "Medal_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medal" ADD CONSTRAINT "Medal_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
