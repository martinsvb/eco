export enum AccountItems {
  iban = 'iban',
  name = 'name',
  description = 'description',
  currency = 'currency',
  number = 'number',
  bic = 'bic',
  active = 'active',
}

export interface AccountData {
  [AccountItems.iban]: string;
  [AccountItems.name]: string;
  [AccountItems.currency]: string;
  [AccountItems.number]: string;
  [AccountItems.bic]: string;
  [AccountItems.description]?: string;
  [AccountItems.active]?: boolean;
}
