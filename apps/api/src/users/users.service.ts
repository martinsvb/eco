import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';
import { RightsItems, ScopeItems, UserFull, UserItems, checkRigts, userRights } from '@eco/types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create({role, ...rest}: CreateUserDto, {companyId, rights}: UserFull) {
    checkRigts(rights, ScopeItems.Users, RightsItems.Create);
    return this.prisma.user.create({
      data: {
        ...rest,
        companyId,
        role,
        [UserItems.Rights]: userRights[role],
        password: rest.password
          ? await bcrypt.hash(rest.password, parseInt(process.env.HASHING_ROUNDS, 10))
          : undefined,
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

  async update(id: string, {role, ...rest}: UpdateUserDto, {rights}: UserFull) {
    checkRigts(rights, ScopeItems.Users, RightsItems.Edit);
    if (rest.password) {
      rest.password = await bcrypt.hash(
        rest.password,
        parseInt(process.env.HASHING_ROUNDS, 10)
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: role ? {...rest, [UserItems.Rights]: userRights[role]} : rest
    });
  }

  remove(id: string, {rights}: UserFull) {
    checkRigts(rights, ScopeItems.Users, RightsItems.Delete);
    return this.prisma.user.delete({ where: { id } });
  }
}
