import { Auth } from '@eco/types';
import { loginPost, refreshPost } from "./authApi";
import { createSlice } from '../createSlice';

export interface AuthState {
  userAuth: Auth;
  loginError: unknown | null;
  loginLoading: boolean;
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
  refreshError: null,
  refreshLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: (create) => ({
    logout: create.reducer(() => initialAuthState),
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
  },
});

export default authSlice.reducer;

export const { apiPostLogin, apiPostRefresh } = authSlice.actions;

export const { selectAccessToken, selectUserAuth } = authSlice.selectors
