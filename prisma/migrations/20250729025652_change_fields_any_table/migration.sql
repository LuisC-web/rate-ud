/*
  Warnings:

  - You are about to drop the column `scoreId` on the `Review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reviewId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reviewId` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_scoreId_fkey";

-- DropIndex
DROP INDEX "Review_scoreId_key";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "scoreId";

-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "reviewId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Score_reviewId_key" ON "Score"("reviewId");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
