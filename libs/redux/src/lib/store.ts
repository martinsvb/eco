import {
  Action,
  combineReducers,
  configureStore,
  Reducer,
  ThunkAction,
} from "@reduxjs/toolkit";
import auth, { AuthState } from "./slices/auth/authSlice";
import account, { AccountState } from "./slices/account/accountSlice";
import { apiErrorLogger } from "./apiErrorLogger";

type Store = {
  account: Reducer<AccountState>;
  auth: Reducer<AuthState>;
};

const reducer = combineReducers<Store>({
  account,
  auth,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiErrorLogger);
  }
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
