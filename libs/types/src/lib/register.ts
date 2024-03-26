export enum RegisterItems {
  email = 'email',
  name = 'name',
  password = 'password',
  passwordConfirmation = 'passwordConfirmation',
}

export interface RegisterData {
  [RegisterItems.email]: string;
  [RegisterItems.name]?: string;
  [RegisterItems.password]: string;
  [RegisterItems.passwordConfirmation]: string;
}
