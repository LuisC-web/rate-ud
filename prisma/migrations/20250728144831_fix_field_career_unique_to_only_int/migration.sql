/*
  Warnings:

  - You are about to drop the column `carreraId` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `careerId` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_carreraId_fkey";

-- DropIndex
DROP INDEX "Teacher_carreraId_key";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "carreraId",
ADD COLUMN     "careerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
