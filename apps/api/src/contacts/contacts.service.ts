import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserFull, UserFilterData, checkRigts, ScopeItems, RightsItems, getPrismaOrFilter } from '@eco/types';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create({id, companyId, rights}: UserFull, data: CreateContactDto) {
    checkRigts(rights, ScopeItems.Contacts, RightsItems.Create);
    return this.prisma.contact.create({ data: {...data, creatorId: id, companyId} });
  }

  findAll({rights}: UserFull, query: UserFilterData) {
    checkRigts(rights, ScopeItems.Contacts, RightsItems.Read);
    return this.prisma.contact.findMany({
      where: {
        ...getPrismaOrFilter(query)
      }
    });
  }

  findOne({rights}: UserFull, id: string) {
    checkRigts(rights, ScopeItems.Contacts, RightsItems.Read);
    return this.prisma.contact.findUnique({ where: { id } });
  }

  async update({rights}: UserFull, id: string, data: UpdateContactDto) {
    checkRigts(rights, ScopeItems.Contacts, RightsItems.Edit);
    return this.prisma.contact.update({ where: { id }, data });
  }

  async remove({rights}: UserFull, id: string) {
    checkRigts(rights, ScopeItems.Contacts, RightsItems.Delete);
    try {
      const data = await this.prisma.contact.delete({ where: { id } });
      return data;
    } catch (error) {
      if (error.code === 'P2003') {
        throw new UnprocessableEntityException("Contact can't be deleted, because it contains data");
      }
      throw error;
    }
  }
}
