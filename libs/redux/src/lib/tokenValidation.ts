import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { isTokenValid, decodeToken } from "@eco/config";
import { apiPostRefresh } from "./slices/auth/authSlice";
import { RootState } from "./store";

export const tokenValidation = async (
    dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
    getState: () => unknown
): Promise<string> => {
    const { auth } = getState() as RootState;
    let { accessToken: token } = auth.userAuth;
    if (!isTokenValid(decodeToken(auth.userAuth.accessToken))) {
      await dispatch(apiPostRefresh(''));
      const { auth } = getState() as RootState;
      token = auth.userAuth.accessToken;
    }
  
    return token;
}
