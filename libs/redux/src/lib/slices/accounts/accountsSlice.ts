import { createSlice } from "@reduxjs/toolkit";
import { Account } from '@prisma/client';
import { RootState } from "../../store";
import { REQUEST_STATUS } from "@eco/config";
import { accountsApiThunk } from "./accountsThunks";

export interface AccountsState {
  accounts: Account[];
  accountsReqStatus: REQUEST_STATUS;
}

export const initialState: AccountsState = {
  accounts: [],
  accountsReqStatus: REQUEST_STATUS.IDDLE,
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(accountsApiThunk.pending, (state) => {
        state.accountsReqStatus = REQUEST_STATUS.PENDING;
      })
      .addCase(accountsApiThunk.rejected, (state) => {
        state.accountsReqStatus = REQUEST_STATUS.ERROR;
      })
      .addCase(accountsApiThunk.fulfilled, (state, { payload }) => {
        state.accounts = payload;
        state.accountsReqStatus = REQUEST_STATUS.SUCCESS;
      });
  },
});

export default accountsSlice.reducer;

export const selectAccounts = (state: RootState) => state.accounts.accounts;

export const selectUserAccountReqStatus = (state: RootState) => state.accounts.accountsReqStatus;
