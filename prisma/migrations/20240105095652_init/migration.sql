/*
  Warnings:

  - A unique constraint covering the columns `[iban]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `iban` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "iban" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_iban_key" ON "Account"("iban");
