import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { equals } from 'ramda';
import { toggleArrayItem } from '@eco/config';
import {
  ContentFilterData,
  ContentTypes,
  RightsItems,
  UserFull,
  checkRigts,
  contentScopes,
  getPrismaOrFilter,
  isItemAvailable
} from '@eco/types';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  create(
    data: CreateContentDto,
    {id, companyId, rights}: UserFull
  ) {
    checkRigts(rights, contentScopes[data.type], RightsItems.Create);
    return this.prisma.content.create({
      data: {
        ...data,
        authorId: id,
        companyId
      },
      include: {
        author: true,
      },
    });
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
    approvalUsersIds: string[]
  ) {
    checkRigts(user.rights, contentScopes[type], RightsItems.Approve);
    const content = await this.findOne(id, user, type);
    if (!content) {
      throw new NotFoundException(`Content with ${id} does not exist.`);
    }
    if (content.published) {
      throw new UnprocessableEntityException(
        `Content with ${id} can't be unapproved/approved, because it's already published.`
      );
    }
    await this.approveAllChilds(user, type, id, approvalUsersIds);
    const approvedBy = toggleArrayItem(user.id, content.approvedBy);
    return this.prisma.content.update({
      where: {
        id
      },
      data: {
        approvedBy,
        published: equals(approvedBy, approvalUsersIds)
      }
    });
  }

  remove(
    id: string,
    {rights}: UserFull,
    type: ContentTypes
  ) {
    checkRigts(rights, contentScopes[type], RightsItems.Delete);
    return this.prisma.content.delete({ where: { id } });
  }
}
