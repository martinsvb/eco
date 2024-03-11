import {
  Action,
  combineReducers,
  configureStore,
  Reducer,
  ThunkAction,
} from "@reduxjs/toolkit";
import auth, { AuthState } from "./slices/auth/authSlice";
import accounts, { AccountsState } from "./slices/accounts/accountsSlice";

type Store = {
  accounts: Reducer<AccountsState>;
  auth: Reducer<AuthState>;
};

const reducer = combineReducers<Store>({
  accounts,
  auth,
});

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
