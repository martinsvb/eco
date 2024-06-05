import {
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
  UnprocessableEntityException
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';
import * as qs from 'qs';
import { routes } from '@eco/config';
import {
  RightsItems,
  ScopeItems,
  UserFilterData,
  UserFull,
  UserItems,
  UserRoles,
  checkRigts,
  getPrismaOrFilter,
  userRights
} from '@eco/types';
import { invitation } from '../locales';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly mailerService: MailerService
  ) {}

  async create(
    data: CreateUserDto,
    {companyId, rights, role}: UserFull,
    origin: string,
    language: string
  ) {
    checkRigts(rights, ScopeItems.Users, RightsItems.Create);

    if (data.role === UserRoles.Admin && role !== UserRoles.Admin) {
      throw new UnprocessableEntityException("Insufficient rights for creating administrator user");
    }

    const user = await this.prisma.user.create({
      data: {
        ...data,
        companyId,
        role: data.role,
        [UserItems.Rights]: userRights[data.role],
        password: data.password
          ? await bcrypt.hash(data.password, parseInt(process.env.HASHING_ROUNDS, 10))
          : undefined,
      },
    });

    this.sendInvitation(user, origin, language);

    return user;
  }

  sendInvitation({email, name}: User, origin: string, language: string) {

    const translation = invitation[language || 'en'];
 
    return this.mailerService
      .sendMail({
        to: email,
        subject: translation.subject,
        template: './invitation',
        context: {
          link: `${origin}${routes.invitation}?${qs.stringify({email, name})}`,
          title: translation.title,
          text: translation.text,
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

  async findUsersByRoles(user: UserFull, roles: UserRoles[]) {
    const data = await this.findAll(user, {[UserItems.Role]: roles});
    return data;
  }

  findOne(id: string, {rights}: UserFull) {
    checkRigts(rights, ScopeItems.Users, RightsItems.Read);
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(
    id: string,
    data: UpdateUserDto,
    {id: userId, password, rights, role}: UserFull
  ) {
    if (id !== userId) {
      checkRigts(rights, ScopeItems.Users, RightsItems.Edit);
    }

    if (data.role === UserRoles.Admin && role !== UserRoles.Admin) {
      throw new UnprocessableEntityException("Insufficient rights for updating administrator user");
    }

    if (data.passwordOld) {
      if (data.password) {

        const isOldPasswordValid = await bcrypt.compare(data.passwordOld, password);
  
        if (!isOldPasswordValid) {
          throw new UnauthorizedException('Invalid old password');
        }
  
        data.password = await bcrypt.hash(
          data.password,
          parseInt(process.env.HASHING_ROUNDS, 10)
        );
  
      }

      delete data.passwordOld;
    }

    return this.prisma.user.update({
      where: {
        id
      },
      data: data.role
        ? {...data, [UserItems.Rights]: userRights[data.role]}
        : data
    });
  }

  remove(id: string, {rights}: UserFull) {
    checkRigts(rights, ScopeItems.Users, RightsItems.Delete);
    return this.prisma.user.delete({ where: { id } });
  }
}
