import { createApi } from '@reduxjs/toolkit/query/react'
import { endPoints } from '@eco/config';
import { Account } from '@prisma/client';
import { baseQueryWithRetry } from './baseQuery';

const accountsApi = createApi({

  reducerPath: 'accountsApi',

  baseQuery: baseQueryWithRetry,

  endpoints: (build) => ({
    getAccounts: build.query<Account[], void>({
      query: () => ({
        url: `/api/${endPoints.accounts}`
      }),
    }),
  }),
});

export const { useGetAccountsQuery } = accountsApi;

export default accountsApi;
