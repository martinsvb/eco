import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  ContentFilterData,
  ContentTypes,
  RightsItems,
  UserFull,
  checkRigts,
  contentScopes,
  getPrismaOrFilter
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

  findAll({companyId, rights}: UserFull, type: ContentTypes, query: ContentFilterData) {
    checkRigts(rights, contentScopes[type], RightsItems.Read);
    return this.prisma.content.findMany({
      where: {
        companyId,
        type,
        ...getPrismaOrFilter(query)
      },
      include: {
        author: true,
      },
    });
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

  findOne(id: string, {rights}: UserFull, type: ContentTypes) {
    checkRigts(rights, contentScopes[type], RightsItems.Read);
    return this.prisma.content.findUnique({
      where: {
        id
      },
      include: {
        author: true,
      },
    });
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

  async approve(id: string, user: UserFull, type: ContentTypes) {
    checkRigts(user.rights, contentScopes[type], RightsItems.Approve);
    const content = await this.findOne(id, user, type);
    if (!content) {
      throw new NotFoundException(`Content with ${id} does not exist.`);
    }
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
