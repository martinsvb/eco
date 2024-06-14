import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserFull, UserFilterData, checkRigts, ScopeItems, RightsItems, getPrismaOrFilter, UserRoles } from '@eco/types';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create({rights}: UserFull, data: CreateCompanyDto) {
    checkRigts(rights, ScopeItems.Companies, RightsItems.Create);
    return this.prisma.company.create({ data });
  }

  findAll({companyId, rights, role}: UserFull, query: UserFilterData) {
    checkRigts(rights, ScopeItems.Companies, RightsItems.Read);
    return this.prisma.company.findMany({
      where: {
        id: role !== UserRoles.Admin ? companyId : undefined,
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

  async remove({rights}: UserFull, id: string) {
    checkRigts(rights, ScopeItems.Companies, RightsItems.Delete);
    try {
      const data = await this.prisma.company.delete({ where: { id } });
      return data;
    } catch (error) {
      if (error.code === 'P2003') {
        throw new UnprocessableEntityException("Company can't be deleted, because it contains data");
      }
      throw error;
    }
  }
}
