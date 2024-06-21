import { omit } from "ramda";
import { CompanyItems, ErrorData, ErrorItems, UserItems } from "@eco/types";
import { DataListItemData, getDataListPairs } from "../helpers/getDataListPairs";

export const getErrorData = (
  {user, company, id, ...error}: ErrorData,
  type: 'user' | 'company' | 'error'
): DataListItemData[] => {

  if (type === 'error') {
    return getDataListPairs(
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
    return getDataListPairs(
      omit([UserItems.Id, UserItems.Picture], user)
    );
  }

  if (type === 'company' && company) {
    return getDataListPairs(
      omit([CompanyItems.Id, CompanyItems.CreatedAt, CompanyItems.UpdatedAt], company)
    );
  }

  return [];
}
