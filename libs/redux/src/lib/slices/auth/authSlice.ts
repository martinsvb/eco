import { PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageItems, decodeToken, isTokenValid } from '@eco/config';
import { AuthOperations, BasicUser, RegistrationState, UserRoles, userRights } from '@eco/types';
import {
  authUserGet,
  invitationFinishPatch,
  loginGooglePost,
  loginPost,
  refreshPost,
  registerPost,
  resendPost,
  verifyPost
} from "./authApi";
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
    id: '',
    name: null,
    picture: null,
    rights: userRights[UserRoles.None],
    role: UserRoles.None
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
      localStorage.removeItem(LocalStorageItems.Token);
      dispatchEvent(new Event('storage'));
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
    setAuthUser: create.reducer((state, {payload}: PayloadAction<Partial<BasicUser>>) => {
      state.user = {...state.user, ...payload};
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
          state.accessToken = accessToken;
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
          state.accessToken = accessToken;
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
          setAccessToken(accessToken);
          state.accessToken = accessToken;
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
          setAccessToken(accessToken);
          state.accessToken = accessToken;
          state.user = user;
        },
        settled: (state) => {
          state.loading[AuthOperations.verify] = false;
        },
      },
    ),
    apiPatchInvitationFinished: create.asyncThunk(
      invitationFinishPatch,
      {
        pending: (state) => {
          state.loading[AuthOperations.invitationFinished] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[AuthOperations.invitationFinished] = payload ?? error;
        },        
        fulfilled: (state, { payload: { accessToken, user } }) => {
          setAccessToken(accessToken);
          state.accessToken = accessToken;
          state.user = user;
        },
        settled: (state) => {
          state.loading[AuthOperations.invitationFinished] = false;
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
    apiGetAuthUser: create.asyncThunk(
      authUserGet,
      {
        pending: (state) => {
          state.loading[AuthOperations.user] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[AuthOperations.user] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          state.user = payload;
        },
        settled: (state) => {
          state.loading[AuthOperations.user] = false;
        },
      },
    ),
  }),
  selectors: {
    selectUserAuth: (state) => state.user,
    selectAccessToken: (state) => {
      const token = state.accessToken || localStorage.getItem(LocalStorageItems.Token);

      return {
        token,
        decoded: token ? decodeToken(token) : null
      }
    },
    selectIsUserLoggedIn: (state) => {
      let token: string | null = state.accessToken;
      if (!token) {
        token = localStorage.getItem(LocalStorageItems.Token);
      }

      return !!token && isTokenValid(decodeToken(token));
    },
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
  apiPatchInvitationFinished,
  apiGetAuthUser,
  logout,
  setLoginGoogleError,
  setRegistration,
  setRegistrationEmail,
  setAuthUser
} = authSlice.actions;

export const {
  selectAccessToken,
  selectUserAuth,
  selectIsUserLoggedIn,
  selectIsAuthLoading,
  selectRegistration,
  selectRegistrationEmail
} = authSlice.selectors
