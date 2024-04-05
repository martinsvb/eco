import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  create(createContentDto: CreateContentDto, {id}: User) {
    return this.prisma.content.create({ data: {...createContentDto, authorId: id} });
  }

  findAll({id}: User) {
    return this.prisma.content.findMany({where: { authorId: id }});
  }

  findOne(id: string) {
    return this.prisma.content.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  update(id: string, data: UpdateContentDto) {
    return this.prisma.content.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.content.delete({ where: { id } });
  }
}
