import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { isTokenValid, decodeToken, LocalStorageItems } from "@eco/config";
import { apiPostRefresh } from "./slices/auth/authSlice";
import { RootState } from "./store";

export const tokenValidation = async (
    dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
    getState: () => unknown
): Promise<string> => {
    let token = localStorage.getItem(LocalStorageItems.Token);
    if (!token || !isTokenValid(decodeToken(token))) {
      await dispatch(apiPostRefresh(''));
      const { auth } = getState() as RootState;
      token = auth.accessToken;
    }
  
    return token;
}
