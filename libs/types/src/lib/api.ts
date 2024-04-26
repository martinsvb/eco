import * as qs from 'qs';
import { is, isEmpty } from 'ramda';

export enum ApiOperations {
  getList = 'getList',
  getItem = 'getItem',
  create = 'create',
  edit = 'edit',
  deleteItem = 'deleteItem',
}

export const getUrl = (endpoint: string, filter: Record<string, any>) => {
  let url = `/api/${endpoint}`;
  console.log({qs})
  if (is(Object, filter) && !isEmpty(filter)) {
    url = `${url}?${qs.stringify(filter)}`;
  }

  return url;
}

export const getPrismaOrFilter = <T extends {}>(query: T) => {
  return Object.entries(query).reduce(
    (acc, [item, value]) => value
      ? { ...acc, [item]: { contains: value } }
      : acc,
    {}
  );
}
