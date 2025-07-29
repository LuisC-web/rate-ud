/*
  Warnings:

  - A unique constraint covering the columns `[email,teacherId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Review_email_teacherId_key" ON "Review"("email", "teacherId");
