// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ContentState, ContentTypes, UserOrigins } from 'libs/types/src';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.content.deleteMany();

  const user1 = await prisma.user.create({
    data: {
      name: 'User 1',
      email: 'user1@email.com',
      origin: UserOrigins.internal,
      password: await bcrypt.hash('user1password', parseInt(process.env.HASHING_ROUNDS, 10)),
      isEmailConfirmed: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'User 2',
      email: 'user2@email.com',
      origin: UserOrigins.internal,
      password: await bcrypt.hash('user2password', parseInt(process.env.HASHING_ROUNDS, 10)),
    },
  });

  const account1 = await prisma.account.create({
    data: {
      name: 'Account 1',
      iban: 'CZ0000000000000000000001',
      currency: 'EUR',
      ownerId: user1.id,
    },
  });

  const account2 = await prisma.account.create({
    data: {
      name: 'Account 2',
      iban: 'CZ0000000000000000000002',
      currency: 'EUR',
      ownerId: user2.id,
    },
  });

  const content1 = await prisma.content.create({
    data: {
      title: 'Test 1',
      text: 'Test content 1',
      type: ContentTypes.Article,
      state: ContentState.Done,
      authorId: user1.id
    },
  });

  const content2 = await prisma.content.create({
    data: {
      title: 'Test 2',
      text: 'Test content 2',
      type: ContentTypes.Article,
      state: ContentState.Done,
      authorId: user2.id
    },
  });

  console.log({
    account1,
    account2,
    content1,
    content2,
    user1,
    user2
  });
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
