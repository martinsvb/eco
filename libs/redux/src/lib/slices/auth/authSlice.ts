import { Auth } from '@eco/types';
import { loginGooglePost, loginPost, refreshPost } from "./authApi";
import { createSlice } from '../createSlice';
import { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  userAuth: Auth;
  loginError: unknown | null;
  loginLoading: boolean;
  loginGoogleError: unknown | null;
  loginGoogleLoading: boolean;
  refreshError: unknown | null;
  refreshLoading: boolean;
}

export const initialAuthState: AuthState = {
  userAuth: {
    accessToken: '',
    name: null,
    picture: null
  },
  loginError: null,
  loginLoading: false,
  loginGoogleError: null,
  loginGoogleLoading: false,
  refreshError: null,
  refreshLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: (create) => ({
    logout: create.reducer(() => initialAuthState),
    setLoginGoogleError: create.reducer((state, {payload}: PayloadAction<string>) => {
      state.loginGoogleError = payload
    }),
    apiPostLogin: create.asyncThunk(
      loginPost,
      {
        pending: (state) => {
          state.loginLoading = true;
        },
        rejected: (state, { error, payload }) => {
          state.loginError = payload ?? error;
        },        
        fulfilled: (state, { payload }) => {
          state.userAuth = payload;
        },
        settled: (state) => {
          state.loginLoading = false;
        },
      },
    ),
    apiPostLoginGoogle: create.asyncThunk(
      loginGooglePost,
      {
        pending: (state) => {
          state.loginGoogleLoading = true;
        },
        rejected: (state, { error, payload }) => {
          state.loginGoogleError = payload ?? error;
        },        
        fulfilled: (state, { payload }) => {
          state.userAuth = payload;
        },
        settled: (state) => {
          state.loginGoogleLoading = false;
        },
      },
    ),
    apiPostRefresh: create.asyncThunk(
      refreshPost,
      {
        pending: (state) => {
          state.refreshLoading = true;
        },
        rejected: (state, { error, payload }) => {
          state.refreshError = payload ?? error;
        },        
        fulfilled: (state, { payload }) => {
          state.userAuth.accessToken = payload.accessToken;
        },
        settled: (state) => {
          state.refreshLoading = false;
        },
      },
    )
  }),
  selectors: {
    selectUserAuth: (state) => state.userAuth,
    selectAccessToken: (state) => state.userAuth.accessToken,
    selectIsUserLoggedIn: (state) => !!state.userAuth.accessToken,
  },
});

export default authSlice.reducer;

export const {
  apiPostLogin,
  apiPostLoginGoogle,
  apiPostRefresh,
  logout,
  setLoginGoogleError
} = authSlice.actions;

export const {
  selectAccessToken,
  selectUserAuth,
  selectIsUserLoggedIn
} = authSlice.selectors
