// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { allowedCountries } from 'libs/config/src';
import { ContentState, ContentTypes, UserOrigins } from 'libs/types/src';
import { UserRoles, userRights } from '../libs/types/src/lib/user';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.content.deleteMany();
  await prisma.company.deleteMany();

  const company1 = await prisma.company.create({
    data: {
      name: 'Company 1',
      country: allowedCountries[0]
    },
  });

  const company2 = await prisma.company.create({
    data: {
      name: 'Company 2',
      country: allowedCountries[0]
    },
  });

  const user1 = await prisma.user.create({
    data: {
      name: 'User 1',
      email: 'user1@email.com',
      origin: UserOrigins.internal,
      password: await bcrypt.hash('user1password', parseInt(process.env.HASHING_ROUNDS, 10)),
      isEmailConfirmed: true,
      companyId: company1.id,
      rights: userRights[UserRoles.Admin],
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'User 2',
      email: 'user2@email.com',
      origin: UserOrigins.internal,
      password: await bcrypt.hash('user2password', parseInt(process.env.HASHING_ROUNDS, 10)),
      companyId: company2.id,
      rights: userRights[UserRoles.Admin],
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'User 3',
      email: 'user3@email.com',
      origin: UserOrigins.internal,
      password: await bcrypt.hash('user3password', parseInt(process.env.HASHING_ROUNDS, 10)),
      isEmailConfirmed: true,
      companyId: company1.id,
      rights: userRights[UserRoles.Reader],
    },
  });

  const account1 = await prisma.account.create({
    data: {
      name: 'Account 1',
      iban: 'CZ0000000000000000000001',
      currency: 'EUR',
      creatorId: user1.id,
      companyId: company1.id,
    },
  });

  const account2 = await prisma.account.create({
    data: {
      name: 'Account 2',
      iban: 'CZ0000000000000000000002',
      currency: 'EUR',
      creatorId: user2.id,
      companyId: company2.id,
    },
  });

  const content1 = await prisma.content.create({
    data: {
      title: 'Test 1',
      text: 'Test content 1',
      type: ContentTypes.Task,
      state: ContentState.Done,
      authorId: user1.id,
      companyId: company1.id,
    },
  });

  const content2 = await prisma.content.create({
    data: {
      title: 'Test 2',
      text: 'Test content 2',
      type: ContentTypes.Task,
      state: ContentState.Done,
      authorId: user2.id,
      companyId: company2.id,
    },
  });

  console.log({
    account1,
    account2,
    company1,
    company2,
    content1,
    content2,
    user1,
    user2,
    user3
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
