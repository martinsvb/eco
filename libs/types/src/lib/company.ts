import { Company } from "@prisma/client";
import { nanoid } from "@reduxjs/toolkit";
import { AresSubject } from "./aresSubject";

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
  [CompanyItems.Ico]?: number | null;
  [CompanyItems.Vat]?: string | null;
  [CompanyItems.Address]?: string | null;
  [CompanyItems.Email]?: string | null;
  [CompanyItems.Identification]?: AresSubject | null;
  isNew?: boolean;
  isSelected?: boolean;
}

export type CompanyFull = Company & CompanyData;

export type CompanyFilterData = Partial<Pick<CompanyData, CompanyItems.Name | CompanyItems.Country>>;

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
      isNew: true
    }
  }
}
