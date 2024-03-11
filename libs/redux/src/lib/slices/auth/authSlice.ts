import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Auth } from '@eco/types';
import { RootState } from "../../store";

export interface AuthState {
  userAuth: Auth;
}

export const initialState: AuthState = {
  userAuth: {
    accessToken: '',
    name: null,
    picture: null
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    setUserAuth: (state, {payload}: PayloadAction<Auth>) => {
      state.userAuth = payload;
    },
    setAccesstoken: (state, {payload}: PayloadAction<string>) => {
      state.userAuth.accessToken = payload;
    },
  },
});

export const { setUserAuth, setAccesstoken } = authSlice.actions;

export default authSlice.reducer;

export const selectUserAuth = (state: RootState) => state.auth.userAuth;

export const selectAccessToken = (state: RootState) => state.auth.userAuth.accessToken;
