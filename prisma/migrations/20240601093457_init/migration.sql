-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "approvedBy" TEXT[] DEFAULT ARRAY[]::TEXT[];
