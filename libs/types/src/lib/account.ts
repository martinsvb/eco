export enum AccountItems {
  iban = 'iban',
  name = 'name',
  description = 'description',
}

export interface AccountData {
  [AccountItems.iban]: string;
  [AccountItems.name]: string;
  [AccountItems.description]?: string;
}
