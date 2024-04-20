export enum UserOrigins {
  internal = 'internal',
  google = 'google',
}

export interface Rights {
  create: boolean;
  edit: boolean;
  read: boolean;
  delete: boolean;
  approve: boolean;
}

export interface Scopes {
  accounts: Rights;
  tasks: Rights;
  users: Rights;
}

export interface UserRights {
  scopes: Scopes;
  companyAdmin: boolean;
}
