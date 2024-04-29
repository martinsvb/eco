import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';
import * as qs from 'qs';
import {
  RightsItems,
  ScopeItems,
  UserFilterData,
  UserFull,
  UserItems,
  checkRigts,
  getPrismaOrFilter,
  userRights
} from '@eco/types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly mailerService: MailerService
  ) {}

  async create({role, ...rest}: CreateUserDto, {companyId, rights}: UserFull, origin: string) {
    checkRigts(rights, ScopeItems.Users, RightsItems.Create);

    const user = await this.prisma.user.create({
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

    this.sendInvitation(user, origin);

    return user;
  }

  sendInvitation({email, name}: User, origin: string) {
 
    return this.mailerService
      .sendMail({
        to: email,
        subject: 'Invitation link',
        template: './invitation',
        context: {
          link: `${origin}/invitation-finish?${qs.stringify({email, name})}`,
        },
      })
      .catch((error) => {
        throw new ServiceUnavailableException(`Invitation email failed: ${email}`)
      });
  }

  findAll({companyId, rights}: UserFull, query: UserFilterData) {
    checkRigts(rights, ScopeItems.Users, RightsItems.Read);
    return this.prisma.user.findMany({
      where: {
        companyId,
        ...getPrismaOrFilter(query)
      }
    });
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
