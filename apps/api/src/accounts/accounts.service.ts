import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  create(createAccountDto: CreateAccountDto, {id, companyId}: User) {
    return this.prisma.account.create({ data: {...createAccountDto, creatorId: id, companyId} });
  }

  findAll({companyId}: User) {
    return this.prisma.account.findMany({where: { companyId }});
  }

  findOne(id: string) {
    return this.prisma.account.findUnique({
      where: { id },
      include: {
        creator: true,
      },
    });
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    return this.prisma.account.update({
      where: { id },
      data: updateAccountDto,
    });
  }

  remove(id: string) {
    return this.prisma.account.delete({ where: { id } });
  }
}
