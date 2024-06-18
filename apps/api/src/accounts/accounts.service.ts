import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RightsItems, ScopeItems, UserFull, checkRigts } from '@eco/types';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAccountDto, { id, companyId, rights }: UserFull) {
    checkRigts(rights, ScopeItems.Accounts, RightsItems.Create);
    return this.prisma.account.create({ data: {...data, creatorId: id, companyId} });
  }

  findAll({ companyId, rights }: UserFull) {
    checkRigts(rights, ScopeItems.Accounts, RightsItems.Read);
    return this.prisma.account.findMany({
      where: {
        companyId
      },
    });
  }

  findOne(id: string, { rights }: UserFull) {
    checkRigts(rights, ScopeItems.Accounts, RightsItems.Read);
    return this.prisma.account.findUnique({
      where: { id },
      include: {
        creator: true,
      },
    });
  }

  update(id: string, data: UpdateAccountDto, { rights }: UserFull) {
    checkRigts(rights, ScopeItems.Accounts, RightsItems.Edit);
    return this.prisma.account.update({
      where: { id },
      data,
    });
  }

  remove(id: string, { rights }: UserFull) {
    checkRigts(rights, ScopeItems.Accounts, RightsItems.Delete);
    return this.prisma.account.delete({ where: { id } });
  }
}
