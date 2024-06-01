import { GetThunkAPI, AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import {
  checkResponse,
  endPoints,
  getHeaders,
  getErrorValue,
  postHeaders,
  patchHeaders,
  delHeaders
} from '@eco/config';
import i18n from '@eco/locales';
import { AccountData } from '@eco/types';
import { tokenValidation } from '../../tokenValidation';
import { successSnackbar } from '../snackbars';

export const accountsGet = async (
  id: string,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    return await checkResponse(await fetch(`/api/${endPoints.accounts}`, getHeaders({signal, token}))).json();
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const accountGet = async (
  id: string,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    return await checkResponse(await fetch(`/api/${endPoints.accounts}/${id}`, getHeaders({signal, token}))).json();
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const accountsPost = async (
  {body}: {body: AccountData},
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.accounts}`, postHeaders({body, signal, token}))
    ).json();

    successSnackbar(i18n.t('accountsLibs:created'));

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const accountsPatch = async (
  {body, id}: {body: Partial<AccountData>, id: string},
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.accounts}/${id}`, patchHeaders({body, signal, token}))
    ).json();

    successSnackbar(i18n.t('accountsLibs:updated'));

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const accountDelete = async (
  {id, onSuccess}: {id: string, onSuccess: () => void},
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.accounts}/${id}`, delHeaders({signal, token}))
    ).json();

    successSnackbar(i18n.t('accountsLibs:deleted'));

    onSuccess();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}
