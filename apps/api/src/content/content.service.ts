import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'nestjs-prisma';
import { equals } from 'ramda';
import { routes, toggleArrayItem } from '@eco/config';
import {
  ContentFilterData,
  ContentTypes,
  RightsItems,
  UserFull,
  UserRoles,
  approvalUsersRoles,
  checkRigts,
  contentScopes,
  getPrismaOrFilter,
  isItemAvailable
} from '@eco/types';
import { content } from '../locales';
import { UsersService } from '../users/users.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(
    private prisma: PrismaService,
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService
  ) {}

  async create(
    data: CreateContentDto,
    user: UserFull,
    language: string,
    origin: string
  ) {
    const {id, companyId, rights} = user;
    checkRigts(rights, contentScopes[data.type], RightsItems.Create);

    const createdContent = await this.prisma.content.create({
      data: {
        ...data,
        authorId: id,
        companyId,
        published: [ContentTypes.Task].includes(data.type) && !data.parentId
      },
      include: {
        author: true,
      },
    });

    const users = await this.usersService.findUsersByRoles(
      user,
      [...approvalUsersRoles, UserRoles.Editor]
    );
    const emails = users.map(({email}) => email);

    const translation = content[language || 'en'];

    for (const email of emails) {
      this.sendNotification(
        email,
        translation.newDocument,
        translation.created.replace('{{type}}', translation[data.type]),
        translation.openDocument,
        `${origin}${routes.content[data.type].detail.replace(':id', createdContent.id)}`
      );
    }

    return createdContent;
  }

  async findAll(
    {companyId, rights, role}: UserFull,
    type: ContentTypes,
    query: ContentFilterData
  ) {
    checkRigts(rights, contentScopes[type], RightsItems.Read);
    const data = await this.prisma.content.findMany({
      where: {
        companyId,
        type,
        ...getPrismaOrFilter(query)
      },
      include: {
        author: true,
      },
    });
    return data.filter(isItemAvailable(role));
  }

  async findAllChilds(
    {companyId, rights, role}: UserFull,
    type: ContentTypes,
    parentId: string
  ) {
    checkRigts(rights, contentScopes[type], RightsItems.Read);
    const data = await this.prisma.content.findMany({
      where: {
        companyId,
        parentId
      },
      include: {
        author: true,
      },
    });
    return data.filter(isItemAvailable(role));
  }

  async findOne(
    id: string,
    {rights, role}: UserFull,
    type: ContentTypes
  ) {
    checkRigts(rights, contentScopes[type], RightsItems.Read);
    const data = await this.prisma.content.findUnique({
      where: {
        id
      },
      include: {
        author: true,
      },
    });
    if (data && !isItemAvailable(role)(data)) {
      throw new NotFoundException(`Content with ${id} isn't published yet.`);
    }
    return data;
  }

  update(
    id: string,
    data: UpdateContentDto,
    {rights}: UserFull,
    type: ContentTypes
  ) {
    checkRigts(rights, contentScopes[type], RightsItems.Edit);
    return this.prisma.content.update({
      where: {
        id
      },
      data,
      include: {
        author: true,
      },
    });
  }

  async approveAllChilds(
    user: UserFull,
    type: ContentTypes,
    parentId: string,
    approvalUsersIds: string[]
  ) {
    const childs = await this.findAllChilds(user, type, parentId);
    for (const child of childs) {
      const approvedBy = toggleArrayItem(user.id, child.approvedBy);
      await this.prisma.content.update({
        where: {
          id: child.id
        },
        data: {
          approvedBy,
          published: equals(approvedBy, approvalUsersIds)
        }
      });
    }
  }

  async approve(
    id: string,
    user: UserFull,
    type: ContentTypes,
    language: string,
    origin: string
  ) {
    checkRigts(user.rights, contentScopes[type], RightsItems.Approve);

    const data = await this.findOne(id, user, type);
    if (!data) {
      throw new NotFoundException(`Content with ${id} does not exist.`);
    }
    if (data.published) {
      throw new UnprocessableEntityException(
        `Content with ${id} can't be unapproved/approved, because it's already published.`
      );
    }

    const users = await this.usersService.findUsersByRoles(user as UserFull, approvalUsersRoles);
    const approvalUsersIds = users.map(({id}) => id);

    await this.approveAllChilds(user, type, id, approvalUsersIds);

    const approvedBy = toggleArrayItem(user.id, data.approvedBy);
    const published = equals(approvedBy, approvalUsersIds);
    const updatedContent = await this.prisma.content.update({
      where: {
        id
      },
      data: {
        approvedBy,
        published
      }
    });

    const notifyUsers = await this.usersService.findUsersByRoles(
      user,
      [...approvalUsersRoles, UserRoles.Editor, UserRoles.Reader]
    );
    const emails = notifyUsers.map(({email}) => email);

    const translation = content[language || 'en'];

    for (const email of emails) {
      this.sendNotification(
        email,
        translation.publishedDocument,
        translation.published.replace('{{type}}', translation[type]),
        translation.openDocument,
        `${origin}${routes.content[type].detail.replace(':id', updatedContent.id)}`
      );
    }

    return updatedContent;
  }

  remove(
    id: string,
    {rights}: UserFull,
    type: ContentTypes
  ) {
    checkRigts(rights, contentScopes[type], RightsItems.Delete);
    return this.prisma.content.delete({ where: { id } });
  }

  sendNotification(email: string, subject: string, title: string, text: string, link: string) {
 
    return this.mailerService
      .sendMail({
        to: email,
        subject,
        template: './notification',
        context: {
          link,
          text,
          title,
        },
      });
  }
}
