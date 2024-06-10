import { GridRowId } from '@mui/x-data-grid';
import { GetThunkAPI, AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import {
  checkResponse,
  endPoints,
  getHeaders,
  getErrorValue,
  delHeaders,
  patchHeaders,
  postHeaders
} from '@eco/config';
import { ContactData, getUrl } from '@eco/types';
import i18n from '@eco/locales';
import { tokenValidation } from '../../tokenValidation';
import { RootState } from '../../store';
import { successSnackbar } from '../snackbars';

export const contactsGet = async (
  id: string,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const { contact: { filter } } = getState() as RootState;

    const url = getUrl(endPoints.contacts, filter);

    const data = await checkResponse(await fetch(url, getHeaders({signal, token}))).json();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contactGet = async (
  id: string,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    return await checkResponse(
      await fetch(`/api/${endPoints.contacts}/${id}`, getHeaders({signal, token}))
    ).json();
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contactsPost = async (
  {body}: {body: ContactData, id: string},
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.contacts}`, postHeaders({body, signal, token}))
    ).json();

    successSnackbar(i18n.t('contactsLibs:created'));

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contactsPatch = async (
  {body, id}: {body: Partial<ContactData>, id: string},
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.contacts}/${id}`, patchHeaders({body, signal, token}))
    ).json();

    successSnackbar(i18n.t('contactsLibs:updated'));

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contactDelete = async (
  {id}: {id: GridRowId},
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.contacts}/${id}`, delHeaders({signal, token}))
    ).json();

    successSnackbar(i18n.t('contactsLibs:deleted'));

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}
