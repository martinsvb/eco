/*
  Warnings:

  - You are about to drop the column `contact` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ico]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vat]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "contact",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "ico" INTEGER,
ADD COLUMN     "vat" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Company_ico_key" ON "Company"("ico");

-- CreateIndex
CREATE UNIQUE INDEX "Company_vat_key" ON "Company"("vat");
