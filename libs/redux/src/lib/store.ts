import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import auth from "./slices/auth/authSlice";
import account from "./slices/account/accountSlice";
import company from "./slices/company/companySlice";
import content from "./slices/content/contentSlice";
import user from "./slices/user/userSlice";
import { apiErrorLogger } from "./apiErrorLogger";

const reducer = combineReducers({
  account,
  company,
  content,
  auth,
  user,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      apiErrorLogger
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
