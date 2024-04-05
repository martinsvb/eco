export enum AccountItems {
  iban = 'iban',
  name = 'name',
  description = 'description',
  currency = 'currency',
}

export interface AccountData {
  [AccountItems.iban]: string;
  [AccountItems.name]: string;
  [AccountItems.currency]: string;
  [AccountItems.description]?: string;
}
