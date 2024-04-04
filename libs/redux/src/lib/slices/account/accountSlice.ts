import { Account } from '@prisma/client';
import { ApiOperations } from '@eco/types';
import { accountGet, accountsGet, accountsPatch, accountsPost } from "./accountApi";
import { createSlice } from "../createSlice";
import { PayloadAction } from '@reduxjs/toolkit';

export interface AccountState {
  account: Account | null;
  accounts: Account[];
  error: {[key: string]: unknown | null};
  loading: {[key: string]: boolean};
}

export const initialAccountState: AccountState = {
  account: null,
  accounts: [],
  error: {},
  loading: {},
};

const accountSlice = createSlice({
  name: 'account',
  initialState: initialAccountState,
  reducers: (create) => ({
    resetAccounts: create.reducer(() => initialAccountState),
    setAccount: create.reducer((state, {payload}: PayloadAction<Account | null>) => {
      state.account = payload;
    }),
    apiGetAccounts: create.asyncThunk(
      accountsGet,
      {
        pending: (state) => {
          state.loading[ApiOperations.getList] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[ApiOperations.getList] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          state.accounts = payload;
        },
        settled: (state) => {
          state.loading[ApiOperations.getList] = false;
        },
      },
    ),
    apiGetAccount: create.asyncThunk(
      accountGet,
      {
        pending: (state) => {
          state.loading[ApiOperations.getItem] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[ApiOperations.getItem] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          state.account = payload;
        },
        settled: (state) => {
          state.loading[ApiOperations.getItem] = false;
        },
      },
    ),
    apiPostAccount: create.asyncThunk(
      accountsPost,
      {
        pending: (state) => {
          state.loading[ApiOperations.create] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[ApiOperations.create] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          state.accounts.unshift(payload);
        },
        settled: (state) => {
          state.loading[ApiOperations.create] = false;
        },
      },
    ),
    apiPatchAccount: create.asyncThunk(
      accountsPatch,
      {
        pending: (state) => {
          state.loading[ApiOperations.edit] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[ApiOperations.edit] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          const index = state.accounts.findIndex(({id}) => id === payload.id);
          if (index > -1) {
            state.accounts[index] = payload;
          }
        },
        settled: (state) => {
          state.loading[ApiOperations.edit] = false;
        },
      },
    )
  }),
  selectors: {
    selectAccount: (state) => state.account,
    selectAccounts: (state) => ({accounts: state.accounts, isLoading: !!state.loading[ApiOperations.getList]}),
    selectIsAccountsLoading: (state, operation: ApiOperations) => !!state.loading[operation],
  },
});

export default accountSlice.reducer;

export const {
  apiGetAccount,
  apiGetAccounts,
  apiPostAccount,
  apiPatchAccount,
  resetAccounts,
  setAccount
} = accountSlice.actions;

export const {
  selectAccount,
  selectAccounts,
  selectIsAccountsLoading
} = accountSlice.selectors;
