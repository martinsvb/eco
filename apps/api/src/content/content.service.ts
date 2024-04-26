import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ContentTypes, RightsItems, UserFull, checkRigts, contentScopes } from '@eco/types';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  create(createContentDto: CreateContentDto, {id, companyId, rights}: UserFull) {
    checkRigts(rights, contentScopes[createContentDto.type], RightsItems.Create);
    return this.prisma.content.create({ data: {...createContentDto, authorId: id, companyId} });
  }

  findAll({companyId, rights}: UserFull, type: ContentTypes) {
    checkRigts(rights, contentScopes[type], RightsItems.Read);
    return this.prisma.content.findMany({
      where: {
        companyId,
        type
      },
      include: {
        author: true,
      },
    });
  }

  findOne(id: string, {rights}: UserFull, type: ContentTypes) {
    checkRigts(rights, contentScopes[type], RightsItems.Read);
    return this.prisma.content.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  update(id: string, data: UpdateContentDto, {rights}: UserFull, type: ContentTypes) {
    checkRigts(rights, contentScopes[type], RightsItems.Edit);
    return this.prisma.content.update({
      where: { id },
      data,
    });
  }

  remove(id: string, {rights}: UserFull, type: ContentTypes) {
    checkRigts(rights, contentScopes[type], RightsItems.Delete);
    return this.prisma.content.delete({ where: { id } });
  }
}
