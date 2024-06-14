import { AsyncThunkConfig, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import {
  LocalStorageItems,
  checkResponse,
  decodeToken,
  endPoints,
  getErrorValue,
  getHeaders,
  isTokenValid,
  patchHeaders,
  postHeaders
} from '@eco/config';
import {
  InvitationData,
  LoginData,
  RegistrationData,
  RegistrationState,
  UserItems,
  VerificationPayload
} from '@eco/types';
import i18n, { getLanguageCode } from '@eco/locales';
import { apiGetAuthUser, initialAuthState, setRegistration, setRegistrationEmail } from './authSlice';
import { successSnackbar } from '../snackbars';

const setAccessToken = (accessToken: any) => {
  localStorage.setItem(LocalStorageItems.Token, accessToken);
  dispatchEvent(new Event('storage'));
}

export const loginPost = async (
  body: LoginData,
  { dispatch, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const data = await checkResponse(
      await fetch(
        `/api/${endPoints.login}`,
        postHeaders({body, signal})
      )
    ).json();

    setAccessToken(data.accessToken);

    dispatch(apiGetAuthUser(''));

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const loginGooglePost = async (
  body: {idToken?: string, language: string},
  { dispatch, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const data = await checkResponse(
      await fetch(
        `/api/${endPoints.loginGoogle}`,
        postHeaders({body, signal})
      )
    ).json();

    setAccessToken(data.accessToken);

    dispatch(apiGetAuthUser(''));

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
    const data = await checkResponse(
      await fetch(
        `/api/${endPoints.refresh}`,
        postHeaders({signal})
      )
    ).json();
    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

type RegisterPostParams = {body: Omit<RegistrationData, UserItems.PasswordConfirmation>, onSuccess: () => void}

export const registerPost = async (
  {body, onSuccess}: RegisterPostParams,
  { dispatch, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const data = await checkResponse(
      await fetch(
        `/api/${endPoints.register}/${getLanguageCode(i18n.language)}`,
        postHeaders({body, signal})
      )
    ).json();
    dispatch(setRegistration(RegistrationState.verification));
    dispatch(setRegistrationEmail(body.email));
    onSuccess();
    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const invitationFinishPatch = async (
  {body}: {body: Omit<InvitationData, UserItems.PasswordConfirmation>},
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const data = await checkResponse(
      await fetch(
        `/api/${endPoints.invitationFinish}`,
        patchHeaders({body, signal})
      )
    ).json();

    successSnackbar(i18n.t('authLibs:invitationFinish'));

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
    const data = await checkResponse(
      await fetch(
        `/api/${endPoints.verify}`,
        postHeaders({body, signal})
      )
    ).json();
    dispatch(setRegistration(RegistrationState.none));
    dispatch(setRegistrationEmail(null));
    onSuccess();
    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const resendPost = async (
  {body, onSuccess}: {body: Pick<VerificationPayload, UserItems.Email>, onSuccess: () => void},
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const data = await checkResponse(
      await fetch(
        `/api/${endPoints.resend}/${getLanguageCode(i18n.language)}`,
        postHeaders({body, signal})
      )
    ).json();
    onSuccess();
    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const authUserGet = async (
  id: string,
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = localStorage.getItem(LocalStorageItems.Token);

    return token && isTokenValid(decodeToken(token))
      ? await checkResponse(
          await fetch(
            `/api/${endPoints.user}`,
            getHeaders({signal, token})
          )
        ).json()
      : initialAuthState.user;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}
