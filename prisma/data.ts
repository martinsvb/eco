// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserOrigins } from 'libs/types/src';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  const accounts = await prisma.account.findMany();

  console.log({ accounts, users });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
