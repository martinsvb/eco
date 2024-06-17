-- CreateTable
CREATE TABLE "Error" (
    "id" TEXT NOT NULL,
    "dateTime" TEXT NOT NULL,
    "errorName" TEXT NOT NULL,
    "code" TEXT,
    "meta" JSONB,
    "type" TEXT,
    "userId" TEXT,
    "name" TEXT,
    "email" TEXT,
    "isEmailConfirmed" BOOLEAN,
    "role" TEXT,
    "companyId" TEXT,
    "request" TEXT,
    "params" JSONB,
    "body" JSONB,
    "referer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Error_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Error" ADD CONSTRAINT "Error_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Error" ADD CONSTRAINT "Error_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
