import { createSlice } from "@reduxjs/toolkit";
import { Auth } from '@eco/types';
import { RootState } from "../../store";
import { REQUEST_STATUS } from "@eco/config";
import { loginApiThunk } from "./authThunks";

export interface AuthState {
  userAuth: Auth;
  userAuthReqStatus: REQUEST_STATUS;
}

export const initialState: AuthState = {
  userAuth: {
    accessToken: '',
    name: null,
    picture: null
  },
  userAuthReqStatus: REQUEST_STATUS.IDDLE,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
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
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const selectUserAuth = (state: RootState) => state.auth.userAuth;

export const selectAccessToken = (state: RootState) => state.auth.userAuth.accessToken;

export const selectUserAuthReqStatus = (state: RootState) => state.auth.userAuthReqStatus;
