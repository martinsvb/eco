import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { allowedCountries } from 'libs/config/src/lib/countries';
import { exampleRichText } from 'libs/config/src/lib/content';
import { ContentState, ContentTypes } from 'libs/types/src/lib/content';
import { UserOrigins } from 'libs/types/src/lib/user';
import { UserRoles } from '../libs/types/src/lib/user';
import { userRights } from '../libs/types/src/lib/userRights';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await prisma.account.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.content.deleteMany();
  await prisma.user.deleteMany();
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
      role: UserRoles.Admin,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'User 2',
      email: 'user2@email.com',
      origin: UserOrigins.internal,
      password: await bcrypt.hash('user2password', parseInt(process.env.HASHING_ROUNDS, 10)),
      companyId: company2.id,
      rights: userRights[UserRoles.CompanyAdmin],
      role: UserRoles.CompanyAdmin,
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
      role: UserRoles.Reader,
    },
  });

  const user4 = await prisma.user.create({
    data: {
      name: 'User 4',
      email: 'user4@email.com',
      origin: UserOrigins.internal,
      password: await bcrypt.hash('user4password', parseInt(process.env.HASHING_ROUNDS, 10)),
      isEmailConfirmed: true,
      companyId: company1.id,
      rights: userRights[UserRoles.CompanyAdmin],
      role: UserRoles.CompanyAdmin,
    },
  });

  const account1 = await prisma.account.create({
    data: {
      name: 'Account 1',
      iban: 'CZ0000000000000000000001',
      number: 1000000000,
      bankCode: 1000,
      bic: 'ABCDCZPP',
      currency: 'EUR',
      creatorId: user1.id,
      companyId: company1.id,
    },
  });

  const account2 = await prisma.account.create({
    data: {
      name: 'Account 2',
      iban: 'CZ0000000000000000000002',
      number: 2000000000,
      bankCode: 2000,
      bic: 'EFGHCZPP',
      currency: 'EUR',
      creatorId: user2.id,
      companyId: company2.id,
    },
  });

  const contact1 = await prisma.contact.create({
    data: {
      name: 'Contact 1',
      country: allowedCountries[0],
      creatorId: user1.id,
      companyId: company1.id,
    },
  });

  const contact2 = await prisma.contact.create({
    data: {
      name: 'Contact 2',
      country: allowedCountries[0],
      creatorId: user2.id,
      companyId: company2.id,
    },
  });

  const content1 = await prisma.content.create({
    data: {
      title: 'Test 1',
      text: exampleRichText,
      type: ContentTypes.Task,
      state: ContentState.Done,
      authorId: user1.id,
      companyId: company1.id,
    },
  });

  const content2 = await prisma.content.create({
    data: {
      title: 'Test 2',
      text: exampleRichText,
      type: ContentTypes.Task,
      state: ContentState.Done,
      authorId: user2.id,
      companyId: company2.id,
    },
  });

  const content3 = await prisma.content.create({
    data: {
      title: 'Test record 1',
      text: exampleRichText,
      type: ContentTypes.Record,
      state: ContentState.Created,
      authorId: user1.id,
      companyId: company1.id,
    },
  });

  const content4 = await prisma.content.create({
    data: {
      title: 'Test record 2',
      text: exampleRichText,
      type: ContentTypes.Record,
      state: ContentState.Created,
      authorId: user2.id,
      companyId: company2.id,
    },
  });

  console.log({
    account1,
    account2,
    contact1,
    contact2,
    company1,
    company2,
    content1,
    content2,
    content3,
    content4,
    user1,
    user2,
    user3,
    user4
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
