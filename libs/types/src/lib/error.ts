import { CompanyData } from "./company";
import { UserData } from "./user";

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
  Email = 'email',
  IsEmailConfirmed = 'isEmailConfirmed',
  Role = 'role',
  Company = 'company',
  CompanyId = 'companyId',
  Request = 'request',
  Params = 'params',
  Body = 'body',
  Referer = 'referer',
  CreatedAt = 'createdAt'
}

export interface ErrorData {
  [ErrorItems.Id]: string;
  [ErrorItems.DateTime]: string;
  [ErrorItems.Name]: string;
  [ErrorItems.Code]?: string;
  [ErrorItems.Meta]?: any;
  [ErrorItems.Type]?: string;
  [ErrorItems.User]?: UserData;
  [ErrorItems.UserId]?: string;
  [ErrorItems.UserName]?: string;
  [ErrorItems.Email]?: string;
  [ErrorItems.IsEmailConfirmed]?: boolean;
  [ErrorItems.Role]?: string;
  [ErrorItems.Company]?: CompanyData;
  [ErrorItems.CompanyId]?: string;
  [ErrorItems.Request]?: string;
  [ErrorItems.Params]?: any;
  [ErrorItems.Body]?: any;
  [ErrorItems.Referer]?: string;
  isNew?: boolean;
  isSelected?: boolean;
}

export type ErrorsFilterData = Partial<Pick<ErrorData, ErrorItems.Name | ErrorItems.Email>>;
