-- DropForeignKey
ALTER TABLE "Medal" DROP CONSTRAINT "Medal_athleteId_fkey";

-- DropForeignKey
ALTER TABLE "Medal" DROP CONSTRAINT "Medal_eventId_fkey";

-- AddForeignKey
ALTER TABLE "Medal" ADD CONSTRAINT "Medal_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medal" ADD CONSTRAINT "Medal_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
