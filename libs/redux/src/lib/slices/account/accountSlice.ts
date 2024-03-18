import { Account } from '@prisma/client';
import { accountsGet } from "./accountApi";
import { createSlice } from "../createSlice";

export interface AccountState {
  accounts: Account[];
  getAccountsError: unknown | null;
  getAccountsLoading: boolean;
}

export const initialAccountState: AccountState = {
  accounts: [],
  getAccountsError: null,
  getAccountsLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
  reducers: (create) => ({
    resetAccounts: create.reducer(() => initialAccountState),
    apiGetAccounts: create.asyncThunk(
      accountsGet,
      {
        pending: (state) => {
          state.getAccountsLoading = true;
        },
        rejected: (state, { error, payload }) => {
          state.getAccountsError = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          state.accounts = payload;
        },
        settled: (state) => {
          state.getAccountsLoading = false;
        },
      },
    )
  }),
  selectors: {
    selectAccounts: (state) => state.accounts,
  },
});

export default accountSlice.reducer;

export const { apiGetAccounts, resetAccounts } = accountSlice.actions

export const { selectAccounts } = accountSlice.selectors
