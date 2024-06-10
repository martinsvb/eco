import { Company } from "@prisma/client";
import { nanoid } from "@reduxjs/toolkit";

export enum CompanyItems {
  Name = 'name',
  Country = 'country',
  Ico = 'ico',
  Vat = 'vat',
  Address = 'address',
  Email = 'email',
  Identification = 'identification',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

export interface CompanyData {
  [CompanyItems.Name]: string;
  [CompanyItems.Country]: string;
  [CompanyItems.Ico]?: string | null;
  [CompanyItems.Vat]?: string | null;
  [CompanyItems.Address]?: string | null;
  [CompanyItems.Email]?: string | null;
  isNew?: boolean;
  isSelected?: boolean;
}

export type CompanyFull = Company & CompanyData;

export type CompanyFilterData = Partial<Pick<
  CompanyData,
  CompanyItems.Name |
  CompanyItems.Email |
  CompanyItems.Ico |
  CompanyItems.Vat |
  CompanyItems.Address
>>;

export const getNewCompanyData = () => {
  const id = nanoid();
  return {
    id,
    data: {
      id,
      [CompanyItems.Name]: '',
      [CompanyItems.Country]: '',
      [CompanyItems.Ico]: null,
      [CompanyItems.Vat]: null,
      [CompanyItems.Address]: null,
      [CompanyItems.Email]: null,
      isNew: true,
      isSelected: false
    }
  }
}
