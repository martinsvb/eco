import { Injectable, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@prisma/client';
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
          link: `${origin}/invitation?${qs.stringify({email, name})}`,
        },
      })
      .catch(() => {
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

  async update(id: string, {role, ...rest}: UpdateUserDto, {id: userId, password, rights}: UserFull) {
    if (id !== userId) {
      checkRigts(rights, ScopeItems.Users, RightsItems.Edit);
    }

    if (rest.passwordOld) {
      if (rest.password) {

        const isOldPasswordValid = await bcrypt.compare(rest.passwordOld, password);
  
        if (!isOldPasswordValid) {
          throw new UnauthorizedException('Invalid old password');
        }
  
        rest.password = await bcrypt.hash(
          rest.password,
          parseInt(process.env.HASHING_ROUNDS, 10)
        );
  
      }

      delete rest.passwordOld;
    }

    return this.prisma.user.update({
      where: { id },
      data: role ? {...rest, role, [UserItems.Rights]: userRights[role]} : rest
    });
  }

  remove(id: string, {rights}: UserFull) {
    checkRigts(rights, ScopeItems.Users, RightsItems.Delete);
    return this.prisma.user.delete({ where: { id } });
  }
}
