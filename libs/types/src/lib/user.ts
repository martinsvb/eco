import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';

export enum UserItems {
  Name = 'name',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Email = 'email',
  IsEmailConfirmed = 'isEmailConfirmed',
  Phone = 'phone',
  Otp = 'otp',
  Origin = 'origin',
  CompanyId = 'companyId',
  Rights = 'rights',
  Role = 'role',
  Picture = 'picture',
}

export interface UserData {
  [UserItems.Name]: string;
  [UserItems.Email]: string;
  [UserItems.Phone]?: number;
  [UserItems.Rights]?: UserRights;
  [UserItems.Role]: UserRoles;
  [UserItems.Picture]?: string;
  isNew?: boolean;
}

export type UserFilterData = Partial<Pick<UserData, UserItems.Name | UserItems.Email>>;

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

export type UserDetail = {
  rights: UserRights;
  role: UserRoles;
  isNew?: boolean;
}

export type UserFull = User & UserDetail;

export enum UserRoles {
  None = 'none',
  Reader = 'reader',
  Editor = 'editor',
  ApprovalEditor = 'approvalEditor',
  Admin = 'admin',
}

const noneRights = {
  create: false,
  edit: false,
  read: false,
  delete: false,
  approve: false,  
}

const noneScopes = {
  accounts: noneRights,
  tasks: noneRights,
  users: noneRights,
  companies: noneRights,
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
  users: readerRights,
  companies: readerRights,
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
  users: readerRights,
  companies: readerRights,
}

const approvalEditorRights = {
  ...editorRights,
  approve: true,
}

const approvalEditorScopes = {
  accounts: approvalEditorRights,
  tasks: approvalEditorRights,
  users: approvalEditorRights,
  companies: approvalEditorRights,
}

export const userRights = {
  [UserRoles.None]: {
    scopes: noneScopes,
    companyAdmin: false
  },
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
    scopes: approvalEditorScopes,
    companyAdmin: true
  }
}

export const checkRigts = ({scopes}: UserRights, scope: ScopeItems, operation: RightsItems) => {
  if (!scopes[scope]?.[operation]) {
    throw new HttpException(`Forbidden ${scope} ${operation}`, HttpStatus.FORBIDDEN);
  }
}

export const getUserInitials = (name?: string | null) => {
  return name?.split(' ').map((namePart) => namePart[0]).join('') || 'U';
}

export const isRouteScopeAvailable = (pathname: string, scopes: Scopes) => {
  const route = pathname.split('/')[1] as ScopeItems;
  return !!scopes[route]
    ? !!scopes[route]?.read
    : false;
}
