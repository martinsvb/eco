import { createSlice } from "@reduxjs/toolkit";
import { Auth } from '@eco/types';
import { RootState } from "../../store";
import { REQUEST_STATUS } from "@eco/config";
import { loginApiThunk, refreshApiThunk } from "./authThunks";

export interface AuthState {
  userAuth: Auth;
  userAuthReqStatus: REQUEST_STATUS;
  refreshReqStatus: REQUEST_STATUS;
}

export const initialAuthState: AuthState = {
  userAuth: {
    accessToken: '',
    name: null,
    picture: null
  },
  userAuthReqStatus: REQUEST_STATUS.IDDLE,
  refreshReqStatus: REQUEST_STATUS.IDDLE,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout: () => initialAuthState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApiThunk.pending, (state) => {
        state.userAuthReqStatus = REQUEST_STATUS.PENDING;
      })
      .addCase(loginApiThunk.rejected, (state) => {
        state.userAuthReqStatus = REQUEST_STATUS.ERROR;
      })
      .addCase(loginApiThunk.fulfilled, (state, { payload }) => {
        state.userAuth = payload;
        state.userAuthReqStatus = REQUEST_STATUS.SUCCESS;
      })
      .addCase(refreshApiThunk.pending, (state) => {
        state.refreshReqStatus = REQUEST_STATUS.PENDING;
      })
      .addCase(refreshApiThunk.rejected, (state) => {
        state.refreshReqStatus = REQUEST_STATUS.ERROR;
      })
      .addCase(refreshApiThunk.fulfilled, (state, { payload }) => {
        state.userAuth.accessToken = payload;
        state.refreshReqStatus = REQUEST_STATUS.SUCCESS;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const selectUserAuth = (state: RootState) => state.auth.userAuth;

export const selectAccessToken = (state: RootState) => state.auth.userAuth.accessToken;

export const selectUserAuthReqStatus = (state: RootState) => state.auth.userAuthReqStatus;
