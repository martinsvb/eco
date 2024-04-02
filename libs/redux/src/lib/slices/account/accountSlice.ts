import { Account } from '@prisma/client';
import { ApiOperations } from '@eco/types';
import { accountsGet, accountsPost } from "./accountApi";
import { createSlice } from "../createSlice";

export interface AccountState {
  accounts: Account[];
  error: {[key: string]: unknown | null};
  loading: {[key: string]: boolean};
}

export const initialAccountState: AccountState = {
  accounts: [],
  error: {},
  loading: {},
};

const accountSlice = createSlice({
  name: 'account',
  initialState: initialAccountState,
  reducers: (create) => ({
    resetAccounts: create.reducer(() => initialAccountState),
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
    )
  }),
  selectors: {
    selectAccounts: (state) => ({accounts: state.accounts, isLoading: !!state.loading[ApiOperations.getList]}),
    selectIsAccountsLoading: (state, operation: ApiOperations) => !!state.loading[operation],
  },
});

export default accountSlice.reducer;

export const { apiGetAccounts, apiPostAccount, resetAccounts } = accountSlice.actions

export const { selectAccounts, selectIsAccountsLoading } = accountSlice.selectors
