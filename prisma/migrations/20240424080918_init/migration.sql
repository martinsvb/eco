/*
  Warnings:

  - You are about to drop the column `contact` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "contact",
ADD COLUMN     "phone" INTEGER,
ADD COLUMN     "role" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");
