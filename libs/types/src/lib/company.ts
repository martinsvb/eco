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

export type CompanyFilterData = Partial<Pick<CompanyData, CompanyItems.Name | CompanyItems.Country>>;
