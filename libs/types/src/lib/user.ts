import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';
import { nanoid } from '@reduxjs/toolkit';

export enum UserItems {
  Id = 'id',
  Name = 'name',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Email = 'email',
  IsEmailConfirmed = 'isEmailConfirmed',
  Phone = 'phone',
  Otp = 'otp',
  Origin = 'origin',
  CompanyId = 'companyId',
  Password = 'password',
  PasswordOld = 'passwordOld',
  PasswordConfirmation = 'passwordConfirmation',
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
  isSelected?: boolean;
}

export interface UserEditData {
  [UserItems.Name]: string;
  [UserItems.Email]: string;
  [UserItems.Phone]?: string;
  [UserItems.PasswordOld]?: string;
  [UserItems.Password]?: string;
  [UserItems.PasswordConfirmation]?: string;
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
}

export type UserDetail = {
  rights: UserRights;
  role: UserRoles;
  isNew?: boolean;
  isSelected?: boolean;
}

export type UserFull = User & UserDetail;

export type BasicUser = Pick<
  UserFull,
  UserItems.Id | UserItems.Name | UserItems.Picture | UserItems.Rights | UserItems.Role
>;

export enum UserRoles {
  None = 'none',
  Reader = 'reader',
  Editor = 'editor',
  ApprovalEditor = 'approvalEditor',
  CompanyAdmin = 'companyAdmin',
  Admin = 'admin',
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
  return scopes[route]
    ? !!scopes[route]?.read
    : false;
}

export const getNewUserData = () => {
  const id = nanoid();
  return {
    id,
    data: {
      id,
      [UserItems.Name]: '',
      [UserItems.Email]: '',
      [UserItems.IsEmailConfirmed]: false,
      [UserItems.Origin]: UserOrigins.internal,
      [UserItems.Role]: UserRoles.Reader,
      isNew: true
    }
  }
}
