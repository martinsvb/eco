import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserFull, checkRigts, ScopeItems, RightsItems } from '@eco/types';
import { UpdateErrorDto } from './dto/update-error.dto';

@Injectable()
export class ErrorsService {
  constructor(private prisma: PrismaService) {}

  findAll({ companyId, rights }: UserFull) {
    checkRigts(rights, ScopeItems.Errors, RightsItems.Read);
    return this.prisma.error.findMany({
      where: {
        companyId
      },
      include: {
        user: true,
        company: true,
      },
    });
  }

  findOne(id: string, { rights }: UserFull) {
    checkRigts(rights, ScopeItems.Errors, RightsItems.Read);
    return this.prisma.error.findUnique({
      where: { id },
      include: {
        user: true,
        company: true,
      },
    });
  }

  update(id: string, data: UpdateErrorDto, { rights }: UserFull) {
    checkRigts(rights, ScopeItems.Errors, RightsItems.Edit);
    return this.prisma.error.update({
      where: { id },
      data,
    });
  }

  remove(id: string, { rights }: UserFull) {
    checkRigts(rights, ScopeItems.Errors, RightsItems.Delete);
    return this.prisma.error.delete({ where: { id } });
  }
}
