import { PayloadAction } from '@reduxjs/toolkit';
import { BasicUser, RegistrationState } from '@eco/types';
import { loginGooglePost, loginPost, refreshPost, registerPost, verifyPost } from "./authApi";
import { createSlice } from '../createSlice';

export interface AuthState {
  accessToken: string;
  user: BasicUser;
  loginError: unknown | null;
  loginLoading: boolean;
  loginGoogleError: unknown | null;
  loginGoogleLoading: boolean;
  refreshError: unknown | null;
  refreshLoading: boolean;
  registration: RegistrationState;
  registrationEmail: string | null;
}

export const initialAuthState: AuthState = {
  accessToken: '',
  user: {
    name: null,
    picture: null
  },
  loginError: null,
  loginLoading: false,
  loginGoogleError: null,
  loginGoogleLoading: false,
  refreshError: null,
  refreshLoading: false,
  registration: RegistrationState.none,
  registrationEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: (create) => ({
    logout: create.reducer(() => initialAuthState),
    setLoginGoogleError: create.reducer((state, {payload}: PayloadAction<string>) => {
      state.loginGoogleError = payload
    }),
    setRegistration: create.reducer((state, {payload}: PayloadAction<RegistrationState>) => {
      state.registration = payload
    }),
    setRegistrationEmail: create.reducer((state, {payload}: PayloadAction<string | null>) => {
      state.registrationEmail = payload
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
        fulfilled: (state, { payload: { accessToken, user } }) => {
          state.accessToken = accessToken
          state.user = user;
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
        fulfilled: (state, { payload: { accessToken, user } }) => {
          state.accessToken = accessToken
          state.user = user;
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
        fulfilled: (state, { payload: { accessToken, user } }) => {
          state.accessToken = accessToken
          state.user = user;
        },
        settled: (state) => {
          state.refreshLoading = false;
        },
      },
    ),
    apiPostRegister: create.asyncThunk(
      registerPost,
      {
        pending: (state) => {
          state.loginLoading = true;
        },
        rejected: (state, { error, payload }) => {
          state.loginError = payload ?? error;
        },        
        fulfilled: (state, { payload: { accessToken, user } }) => {
          state.accessToken = accessToken
          state.user = user;
        },
        settled: (state) => {
          state.loginLoading = false;
        },
      },
    ),
    apiPostVerify: create.asyncThunk(
      verifyPost,
      {
        pending: (state) => {
          state.loginLoading = true;
        },
        rejected: (state, { error, payload }) => {
          state.loginError = payload ?? error;
        },        
        fulfilled: (state, { payload: { accessToken, user } }) => {
          state.accessToken = accessToken
          state.user = user;
        },
        settled: (state) => {
          state.loginLoading = false;
        },
      },
    ),
  }),
  selectors: {
    selectUserAuth: (state) => state.user,
    selectAccessToken: (state) => state.accessToken,
    selectIsUserLoggedIn: (state) => !!state.accessToken,
    selectRegistration: (state) => state.registration,
    selectRegistrationEmail: (state) => state.registrationEmail,
  },
});

export default authSlice.reducer;

export const {
  apiPostLogin,
  apiPostLoginGoogle,
  apiPostRefresh,
  apiPostRegister,
  apiPostVerify,
  logout,
  setLoginGoogleError,
  setRegistration,
  setRegistrationEmail
} = authSlice.actions;

export const {
  selectAccessToken,
  selectUserAuth,
  selectIsUserLoggedIn,
  selectRegistration,
  selectRegistrationEmail
} = authSlice.selectors
