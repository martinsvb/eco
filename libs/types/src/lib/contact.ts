import { Contact } from "@prisma/client";
import { nanoid } from "@reduxjs/toolkit";

export enum ContactItems {
  Name = 'name',
  Country = 'country',
  Ico = 'ico',
  Vat = 'vat',
  Address = 'address',
  Email = 'email',
  Phone = 'phone',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

export interface ContactData {
  [ContactItems.Name]: string;
  [ContactItems.Country]: string;
  [ContactItems.Ico]?: string | null;
  [ContactItems.Vat]?: string | null;
  [ContactItems.Address]?: string | null;
  [ContactItems.Email]?: string | null;
  [ContactItems.Phone]?: string | null;
  isNew?: boolean;
  isSelected?: boolean;
}

export type ContactFull = Contact & ContactData;

export type ContactFilterData = Partial<Pick<
  ContactData,
  ContactItems.Name |
  ContactItems.Email |
  ContactItems.Ico |
  ContactItems.Vat |
  ContactItems.Address
>>;

export const getNewContactData = () => {
  const id = nanoid();
  return {
    id,
    data: {
      id,
      [ContactItems.Name]: '',
      [ContactItems.Country]: '',
      [ContactItems.Ico]: null,
      [ContactItems.Vat]: null,
      [ContactItems.Address]: null,
      [ContactItems.Email]: null,
      [ContactItems.Phone]: null,
      isNew: true,
      isSelected: false
    }
  }
}
