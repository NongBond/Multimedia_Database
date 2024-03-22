-- DropForeignKey
ALTER TABLE "Medal" DROP CONSTRAINT "Medal_countryId_fkey";

-- AddForeignKey
ALTER TABLE "Medal" ADD CONSTRAINT "Medal_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
