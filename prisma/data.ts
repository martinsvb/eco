import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  const accounts = await prisma.account.findMany();
  const contents = await prisma.content.findMany();

  console.log({ accounts, contents, users });
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
