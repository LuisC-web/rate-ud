/*
  Warnings:

  - You are about to drop the column `profesorId` on the `Score` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teacherId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teacherId` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_profesorId_fkey";

-- DropIndex
DROP INDEX "Score_profesorId_key";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "profesorId",
ADD COLUMN     "teacherId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Score_teacherId_key" ON "Score"("teacherId");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
