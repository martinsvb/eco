-- AlterTable
ALTER TABLE "Content" ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "state" SET DEFAULT 'created';
