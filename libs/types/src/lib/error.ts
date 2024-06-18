import { CompanyFull } from "./company";
import { UserFull, UserItems } from "./user";

export enum ErrorItems {
  Id = 'id',
  DateTime = 'dateTime',
  Name = 'name',
  Code = 'code',
  Meta = 'meta',
  Type = 'type',
  User = 'user',
  UserId = 'userId',
  UserName = 'userName',
  Company = 'company',
  CompanyId = 'companyId',
  Request = 'request',
  Params = 'params',
  Body = 'body',
  Referer = 'referer',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export interface ErrorData {
  [ErrorItems.Id]: string;
  [ErrorItems.DateTime]: string;
  [ErrorItems.Name]: string;
  [ErrorItems.Code]?: string;
  [ErrorItems.Meta]?: any;
  [ErrorItems.Type]?: string;
  [ErrorItems.User]?: UserFull;
  [ErrorItems.UserId]?: string;
  [ErrorItems.UserName]?: string;
  [UserItems.Email]?: string;
  [UserItems.IsEmailConfirmed]?: boolean;
  [UserItems.Role]?: string;
  [ErrorItems.Company]?: CompanyFull;
  [ErrorItems.CompanyId]?: string;
  [ErrorItems.Request]?: string;
  [ErrorItems.Params]?: any;
  [ErrorItems.Body]?: any;
  [ErrorItems.Referer]?: string;
  [ErrorItems.CreatedAt]?: string;
  [ErrorItems.UpdatedAt]?: string;
  isNew?: boolean;
  isSelected?: boolean;
}

export type ErrorsFilterData = Partial<Pick<ErrorData, ErrorItems.Name | UserItems.Email>>;
