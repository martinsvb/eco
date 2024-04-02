import { PayloadAction } from '@reduxjs/toolkit';
import { AuthItems, AuthOperations, BasicUser, RegistrationState } from '@eco/types';
import { loginGooglePost, loginPost, refreshPost, registerPost, resendPost, verifyPost } from "./authApi";
import { createSlice } from '../createSlice';

export interface AuthState {
  accessToken: string;
  user: BasicUser;
  error: {[key: string]: unknown | null};
  loading: {[key: string]: boolean};
  registration: RegistrationState;
  registrationEmail: string | null;
}

export const initialAuthState: AuthState = {
  accessToken: '',
  user: {
    name: null,
    picture: null
  },
  error: {},
  loading: {},
  registration: RegistrationState.none,
  registrationEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: (create) => ({
    logout: create.reducer(() => {
      localStorage.removeItem(AuthItems.Token);
      return initialAuthState
    }),
    setLoginGoogleError: create.reducer((state, {payload}: PayloadAction<string>) => {
      state.error[AuthOperations.loginGoogle] = payload
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
          state.loading[AuthOperations.login] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[AuthOperations.login] = payload ?? error;
        },        
        fulfilled: (state, { payload: { accessToken, user } }) => {
          localStorage.setItem(AuthItems.Token, accessToken);
          state.accessToken = accessToken
          state.user = user;
        },
        settled: (state) => {
          state.loading[AuthOperations.login] = false;
        },
      },
    ),
    apiPostLoginGoogle: create.asyncThunk(
      loginGooglePost,
      {
        pending: (state) => {
          state.loading[AuthOperations.loginGoogle] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[AuthOperations.loginGoogle] = payload ?? error;
        },        
        fulfilled: (state, { payload: { accessToken, user } }) => {
          localStorage.setItem(AuthItems.Token, accessToken);
          state.accessToken = accessToken
          state.user = user;
        },
        settled: (state) => {
          state.loading[AuthOperations.loginGoogle] = false;
        },
      },
    ),
    apiPostRefresh: create.asyncThunk(
      refreshPost,
      {
        pending: (state) => {
          state.loading[AuthOperations.refresh] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[AuthOperations.refresh] = payload ?? error;
        },        
        fulfilled: (state, { payload: { accessToken } }) => {
          localStorage.setItem(AuthItems.Token, accessToken);
          state.accessToken = accessToken
        },
        settled: (state) => {
          state.loading[AuthOperations.refresh] = false;
        },
      },
    ),
    apiPostRegister: create.asyncThunk(
      registerPost,
      {
        pending: (state) => {
          state.loading[AuthOperations.register] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[AuthOperations.register] = payload ?? error;
        },
        settled: (state) => {
          state.loading[AuthOperations.register] = false;
        },
      },
    ),
    apiPostVerify: create.asyncThunk(
      verifyPost,
      {
        pending: (state) => {
          state.loading[AuthOperations.verify] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[AuthOperations.verify] = payload ?? error;
        },        
        fulfilled: (state, { payload: { accessToken, user } }) => {
          localStorage.setItem(AuthItems.Token, accessToken);
          state.accessToken = accessToken
          state.user = user;
        },
        settled: (state) => {
          state.loading[AuthOperations.verify] = false;
        },
      },
    ),
    apiPostResend: create.asyncThunk(
      resendPost,
      {
        pending: (state) => {
          state.loading[AuthOperations.resend] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[AuthOperations.resend] = payload ?? error;
        },
        settled: (state) => {
          state.loading[AuthOperations.resend] = false;
        },
      },
    ),
  }),
  selectors: {
    selectUserAuth: (state) => state.user,
    selectAccessToken: (state) => state.accessToken,
    selectIsUserLoggedIn: (state) => !!state.accessToken || !!localStorage.getItem(AuthItems.Token),
    selectIsAuthLoading: (state, operation: AuthOperations) => !!state.loading[operation],
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
  apiPostResend,
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
  selectIsAuthLoading,
  selectRegistration,
  selectRegistrationEmail
} = authSlice.selectors
