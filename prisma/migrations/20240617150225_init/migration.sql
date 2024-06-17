/*
  Warnings:

  - You are about to drop the column `errorName` on the `Error` table. All the data in the column will be lost.
  - Made the column `name` on table `Error` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Error" DROP COLUMN "errorName",
ADD COLUMN     "userName" TEXT,
ALTER COLUMN "name" SET NOT NULL;
