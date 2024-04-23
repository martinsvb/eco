import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';
import { RightsItems, ScopeItems, UserFull, checkRigts } from '@eco/types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, {rights}: UserFull) {
    checkRigts(rights, ScopeItems.Users, RightsItems.Create);
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, parseInt(process.env.HASHING_ROUNDS, 10)),
      },
    });
  }

  findAll({companyId, rights}: UserFull) {
    checkRigts(rights, ScopeItems.Users, RightsItems.Read);
    return this.prisma.user.findMany({ where: { companyId } });
  }

  findOne(id: string, {rights}: UserFull) {
    checkRigts(rights, ScopeItems.Users, RightsItems.Read);
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto, {rights}: UserFull) {
    checkRigts(rights, ScopeItems.Users, RightsItems.Edit);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        parseInt(process.env.HASHING_ROUNDS, 10)
      );
    }

    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: string, {rights}: UserFull) {
    checkRigts(rights, ScopeItems.Users, RightsItems.Delete);
    return this.prisma.user.delete({ where: { id } });
  }
}
