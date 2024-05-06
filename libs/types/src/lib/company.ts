import { Company } from "@prisma/client";
import { nanoid } from "@reduxjs/toolkit";

export enum CompanyItems {
  Name = 'name',
  Country = 'country',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

export interface CompanyData {
  [CompanyItems.Name]: string;
  [CompanyItems.Country]: string;
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
      isNew: true
    }
  }
}
