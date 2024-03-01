import { Test } from '@nestjs/testing';

import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AccountService],
    }).compile();

    service = app.get<AccountService>(AccountService);
  });

  describe('getData', () => {
    it('should return account data', () => {
      expect(service.getData()).toEqual({
        id: 'test',
        iban: 'CZ0000000000000000000000',
        name: 'test',
        description: 'test account',
        active: false,
        createdAt: '',
      });
    });
  });
});
