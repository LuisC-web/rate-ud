/*
  Warnings:

  - You are about to drop the column `name` on the `Score` table. All the data in the column will be lost.
  - Added the required column `value` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "name",
ADD COLUMN     "value" INTEGER NOT NULL;
