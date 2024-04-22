import { checkResponse, endPoints, getErrorValue, postHeaders } from '@eco/config';
import { LoginData, RegistrationData, RegistrationItems, RegistrationState, VerificationPayload } from '@eco/types';
import { AsyncThunkConfig, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { setRegistration, setRegistrationEmail } from './authSlice';

export const loginPost = async (
  body: LoginData,
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const data = await checkResponse(await fetch(`/api/${endPoints.login}`, postHeaders({body, signal}))).json();
    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const loginGooglePost = async (
  body: {idToken?: string, language: string},
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const data = await checkResponse(await fetch(`/api/${endPoints.loginGoogle}`, postHeaders({body, signal}))).json();
    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const refreshPost = async (
  id: string,
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const data = await checkResponse(await fetch(`/api/${endPoints.refresh}`, postHeaders({signal}))).json();
    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const registerPost = async (
  {body, onSuccess}: {body: Omit<RegistrationData, RegistrationItems.passwordConfirmation>, onSuccess: () => void},
  { dispatch, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const data = await checkResponse(await fetch(`/api/${endPoints.register}`, postHeaders({body, signal}))).json();
    dispatch(setRegistration(RegistrationState.verification));
    dispatch(setRegistrationEmail(body.email));
    onSuccess();
    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const verifyPost = async (
  {body, onSuccess}: {body: VerificationPayload, onSuccess: () => void},
  { dispatch, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const data = await checkResponse(await fetch(`/api/${endPoints.verify}`, postHeaders({body, signal}))).json();
    dispatch(setRegistration(RegistrationState.none));
    dispatch(setRegistrationEmail(null));
    onSuccess();
    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const resendPost = async (
  {body, onSuccess}: {body: Pick<VerificationPayload, RegistrationItems.email>, onSuccess: () => void},
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const data = await checkResponse(await fetch(`/api/${endPoints.resend}`, postHeaders({body, signal}))).json();
    onSuccess();
    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}
