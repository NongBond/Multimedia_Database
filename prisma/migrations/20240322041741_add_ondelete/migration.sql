-- DropForeignKey
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_countryId_fkey";

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
