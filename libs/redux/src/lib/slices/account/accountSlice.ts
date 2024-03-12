import { createSlice } from "@reduxjs/toolkit";
import { Account } from '@prisma/client';
import { RootState } from "../../store";
import { REQUEST_STATUS } from "@eco/config";
import { accountsApiThunk } from "./accountThunks";

export interface AccountState {
  accounts: Account[];
  accountsReqStatus: REQUEST_STATUS;
}

export const initialAccountState: AccountState = {
  accounts: [],
  accountsReqStatus: REQUEST_STATUS.IDDLE,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
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

export default accountSlice.reducer;

export const selectAccounts = (state: RootState) => state.account.accounts;

export const selectUserAccountReqStatus = (state: RootState) => state.account.accountsReqStatus;
