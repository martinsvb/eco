import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';

@Injectable()
export class AccountService {
  getData(): Account {
    return {
      id: 'test',
      iban: 'CZ0000000000000000000000',
      number: '1000000000',
      bic: 'ABCDCZPP',
      name: 'test',
      currency: 'EUR',
      description: 'test account',
      active: false,
      creatorId: 'testId',
      companyId: 'testCompanyId',
      createdAt: new Date(),
      updatedAt: null,
    };
  }
}
