import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { isTokenValid, decodeToken } from "@eco/config";
import { apiPostRefresh } from "./slices/auth/authSlice";
import { RootState } from "./store";

export const tokenValidation = async (
    dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
    getState: () => unknown
): Promise<string> => {
    const { auth } = getState() as RootState;
    let { accessToken: token } = auth;
    if (!isTokenValid(decodeToken(token))) {
      await dispatch(apiPostRefresh(''));
      const { auth } = getState() as RootState;
      token = auth.accessToken;
    }
  
    return token;
}
