import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';

export enum UserItems {
  Name = 'name',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Email = 'email',
  IsEmailConfirmed = 'isEmailConfirmed',
  Otp = 'otp',
  Origin = 'origin',
  CompanyId = 'companyId',
  Contact = 'contact',
  Rights = 'rights',
  Picture = 'picture',
}

export enum UserOrigins {
  internal = 'internal',
  google = 'google',
}

export enum RightsItems {
  Create = 'create',
  Edit = 'edit',
  Read = 'read',
  Delete = 'delete',
  Approve = 'approve',
}

export enum ScopeItems {
  Accounts = 'accounts',
  Articles = 'articles',
  Tasks = 'tasks',
  News = 'news',
  Users = 'users',
  Companies = 'companies',
}

export interface Rights {
  [RightsItems.Create]: boolean;
  [RightsItems.Edit]: boolean;
  [RightsItems.Read]: boolean;
  [RightsItems.Delete]: boolean;
  [RightsItems.Approve]: boolean;
}

export interface Scopes {
  [ScopeItems.Accounts]: Rights;
  [ScopeItems.Articles]?: Rights;
  [ScopeItems.Tasks]: Rights;
  [ScopeItems.News]?: Rights;
  [ScopeItems.Users]?: Rights;
  [ScopeItems.Companies]?: Rights;
}

export interface UserRights {
  scopes: Scopes;
  companyAdmin: boolean;
}

export type RightsType = {
  rights: UserRights;
}

export type UserFull = User & RightsType;

export enum UserRoles {
  Reader = 'reader',
  Editor = 'editor',
  ApprovalEditor = 'approvalEditor',
  Admin = 'admin',
}

const readerRights = {
  create: false,
  edit: false,
  read: true,
  delete: false,
  approve: false,  
}

const readerScopes = {
  accounts: readerRights,
  tasks: readerRights,
}

const editorRights = {
  create: true,
  edit: true,
  read: true,
  delete: true,
  approve: false,  
}

const editorScopes = {
  accounts: editorRights,
  tasks: editorRights,
}

const approvalEditorRights = {
  ...editorRights,
  approve: true,
}

const approvalEditorScopes = {
  accounts: approvalEditorRights,
  tasks: approvalEditorRights,
}

const adminScopes = {
  accounts: approvalEditorRights,
  tasks: approvalEditorRights,
  users: approvalEditorRights,
}

export const userRights = {
  [UserRoles.Reader]: {
    scopes: readerScopes,
    companyAdmin: false
  },
  [UserRoles.Editor]: {
    scopes: editorScopes,
    companyAdmin: false
  },
  [UserRoles.ApprovalEditor]: {
    scopes: approvalEditorScopes,
    companyAdmin: false
  },
  [UserRoles.Admin]: {
    scopes: adminScopes,
    companyAdmin: true
  }
}

export const checkRigts = ({scopes}: UserRights, scope: ScopeItems, operation: RightsItems) => {
  if (!scopes[scope]?.[operation]) {
    throw new HttpException(`Forbidden ${scope} ${operation}`, HttpStatus.FORBIDDEN);
  }
}
