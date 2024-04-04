import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';

@Injectable()
export class AccountService {
  getData(): Account {
    return {
      id: 'test',
      iban: 'CZ0000000000000000000000',
      name: 'test',
      currency: 'EUR',
      description: 'test account',
      active: false,
      ownerId: 'testId',
      createdAt: new Date(),
      updatedAt: null,
    };
  }
}
