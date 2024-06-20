/*
  Warnings:

  - You are about to drop the column `bankCode` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "bankCode",
ALTER COLUMN "number" SET DATA TYPE TEXT;
