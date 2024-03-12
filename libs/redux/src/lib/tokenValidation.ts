import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { isTokenValid, decodeToken } from "@eco/config";
import { refreshApiThunk } from "./slices/auth/authThunks";
import { RootState } from "./store";

export const tokenValidation = async (
    dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
    getState: () => unknown
) => {
    const { auth } = getState() as RootState;
    let { accessToken: token } = auth.userAuth;
    if (!isTokenValid(decodeToken(auth.userAuth.accessToken))) {
      await dispatch(refreshApiThunk());
      const { auth } = getState() as RootState;
      token = auth.userAuth.accessToken;
    }
  
    return token;
}
