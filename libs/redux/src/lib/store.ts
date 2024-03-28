import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import accountsApi from "./api/accounts";
import auth from "./slices/auth/authSlice";
import account from "./slices/account/accountSlice";
import user from "./slices/user/userSlice";
import { apiErrorLogger } from "./apiErrorLogger";

const reducer = combineReducers({
  [accountsApi.reducerPath]: accountsApi.reducer,
  account,
  auth,
  user,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      apiErrorLogger,
      accountsApi.middleware
    );
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
