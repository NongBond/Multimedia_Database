/*
  Warnings:

  - You are about to drop the column `eventId` on the `Athlete` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_eventId_fkey";

-- AlterTable
ALTER TABLE "Athlete" DROP COLUMN "eventId";

-- CreateTable
CREATE TABLE "_AthleteToEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AthleteToEvent_AB_unique" ON "_AthleteToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_AthleteToEvent_B_index" ON "_AthleteToEvent"("B");

-- AddForeignKey
ALTER TABLE "_AthleteToEvent" ADD CONSTRAINT "_AthleteToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Athlete"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AthleteToEvent" ADD CONSTRAINT "_AthleteToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
