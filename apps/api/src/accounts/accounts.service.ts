import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  create(createAccountDto: CreateAccountDto, {id}: User) {
    return this.prisma.account.create({ data: {...createAccountDto, ownerId: id} });
  }

  findAll({id}: User) {
    return this.prisma.account.findMany({where: { ownerId: id }});
  }

  findOne(id: string) {
    return this.prisma.account.findUnique({
      where: { id },
      include: {
        owner: true,
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
