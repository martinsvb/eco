import { CompanyItems, ErrorData, ErrorItems, UserItems } from "@eco/types";
import { omit } from "ramda";
import { ReactNode } from "react";

export interface ErrorItemData {
  item: string;
  value: ReactNode;
}

const getErrorDataPairs = (data: any): ErrorItemData[] => {
  return Object.entries(data).map(([item, value]) => ({item, value} as ErrorItemData));
}

export const getErrorData = (
  {user, company, id, ...error}: ErrorData,
  type: 'user' | 'company' | 'error'
): ErrorItemData[] => {

  if (type === 'error') {
    return getErrorDataPairs(
      omit(
        [
          ErrorItems.DateTime,
          ErrorItems.CreatedAt,
          ErrorItems.UpdatedAt,
          ErrorItems.UserName,
          UserItems.Email,
          UserItems.IsEmailConfirmed,
          UserItems.Role
        ],
        error
      )
    );
  }

  if (type === 'user' && user) {
    return getErrorDataPairs(
      omit([UserItems.Id, UserItems.Picture], user)
    );
  }

  if (type === 'company' && company) {
    return getErrorDataPairs(
      omit([CompanyItems.Id, CompanyItems.CreatedAt, CompanyItems.UpdatedAt], company)
    );
  }

  return [];
}
