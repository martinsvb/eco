import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  ContentFilterData,
  ContentTypes,
  RightsItems,
  UserFull,
  checkRigts,
  contentScopes,
  getPrismaOrFilter,
  isApprovedByAllApprovalUsers
} from '@eco/types';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { toggleArrayItem } from '@eco/config';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateContentDto, {id, companyId, rights}: UserFull) {
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
    query: ContentFilterData,
    approvalUsersIds: string[]
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
    return data.filter(isApprovedByAllApprovalUsers(role, approvalUsersIds));
  }

  findAllChilds({companyId, rights}: UserFull, type: ContentTypes, parentId: string) {
    checkRigts(rights, contentScopes[type], RightsItems.Read);
    return this.prisma.content.findMany({
      where: {
        companyId,
        parentId
      },
      include: {
        author: true,
      },
    });
  }

  async findOne(id: string, {rights}: UserFull, type: ContentTypes) {
    checkRigts(rights, contentScopes[type], RightsItems.Read);
    const data = await this.prisma.content.findUnique({
      where: {
        id
      },
      include: {
        author: true,
      },
    });
    return data;
  }

  update(id: string, data: UpdateContentDto, {rights}: UserFull, type: ContentTypes) {
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

  async approveAllChilds(user: UserFull, type: ContentTypes, parentId: string) {
    const childs = await this.findAllChilds(user, type, parentId);
    for (const child of childs) {
      await this.prisma.content.update({
        where: {
          id: child.id
        },
        data: {
          approvedBy: toggleArrayItem(user.id, child.approvedBy)
        }
      });
    }
  }

  async approve(id: string, user: UserFull, type: ContentTypes) {
    checkRigts(user.rights, contentScopes[type], RightsItems.Approve);
    const content = await this.findOne(id, user, type);
    if (!content) {
      throw new NotFoundException(`Content with ${id} does not exist.`);
    }
    await this.approveAllChilds(user, type, id);
    return this.prisma.content.update({
      where: {
        id
      },
      data: {
        approvedBy: toggleArrayItem(user.id, content.approvedBy)
      },
      include: {
        author: true,
      },
    });
  }

  remove(id: string, {rights}: UserFull, type: ContentTypes) {
    checkRigts(rights, contentScopes[type], RightsItems.Delete);
    return this.prisma.content.delete({ where: { id } });
  }
}
