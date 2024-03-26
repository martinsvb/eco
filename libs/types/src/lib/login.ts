export enum LoginItems {
  email = 'email',
  password = 'password',
}

export interface LoginData {
  [LoginItems.email]: string;
  [LoginItems.password]: string;
}
