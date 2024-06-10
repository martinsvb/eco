/*
  Warnings:

  - You are about to drop the column `identification` on the `Company` table. All the data in the column will be lost.
  - Added the required column `bankCode` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bic` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "bankCode" INTEGER NOT NULL,
ADD COLUMN     "bic" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "identification";
