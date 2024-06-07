import * as qs from 'qs';
import { is, isEmpty } from 'ramda';

export enum ApiOperations {
  approve = 'approve',
  getList = 'getList',
  getItem = 'getItem',
  getExternalItem = 'getExternalItem',
  create = 'create',
  edit = 'edit',
  deleteItem = 'deleteItem',
}

export const getUrl = (endpoint: string, filter: Record<string, any>) => {
  let url = `/api/${endpoint}`;
  if (is(Object, filter) && !isEmpty(filter)) {
    url = `${url}?${qs.stringify(filter)}`;
  }

  return url;
}

export const getPrismaOrFilter = <T extends object>(query: T) => {
  return Object.entries(query).reduce(
    (acc, [item, value]) => value
      ? is(Array, value)
        ? { ...acc, OR: value.map((val) => ({[item]: { contains: val }})) }
        : { ...acc, [item]: { contains: value } }
      : acc,
    {}
  );
}
