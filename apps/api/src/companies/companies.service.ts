import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserFull, UserFilterData, checkRigts, ScopeItems, RightsItems, getPrismaOrFilter } from '@eco/types';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create({rights}: UserFull, data: CreateCompanyDto) {
    checkRigts(rights, ScopeItems.Companies, RightsItems.Create);
    return this.prisma.company.create({ data });
  }

  findAll({rights}: UserFull, query: UserFilterData) {
    checkRigts(rights, ScopeItems.Companies, RightsItems.Read);
    return this.prisma.user.findMany({
      where: {
        ...getPrismaOrFilter(query)
      }
    });
  }

  findOne({rights}: UserFull, id: string) {
    checkRigts(rights, ScopeItems.Companies, RightsItems.Read);
    return this.prisma.company.findUnique({ where: { id } });
  }

  async update({rights}: UserFull, id: string, data: UpdateCompanyDto) {
    checkRigts(rights, ScopeItems.Companies, RightsItems.Edit);
    return this.prisma.company.update({ where: { id }, data });
  }

  remove({rights}: UserFull, id: string) {
    checkRigts(rights, ScopeItems.Companies, RightsItems.Delete);
    return this.prisma.company.delete({ where: { id } });
  }
}
