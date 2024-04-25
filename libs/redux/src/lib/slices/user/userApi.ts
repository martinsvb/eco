import { GridRowId } from '@mui/x-data-grid';
import { GetThunkAPI, AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { enqueueSnackbar } from 'notistack';
import {
  checkResponse,
  endPoints,
  getHeaders,
  getErrorValue,
  delHeaders,
  patchHeaders,
  postHeaders
} from '@eco/config';
import { UserData } from '@eco/types';
import i18n from '@eco/locales';
import { tokenValidation } from '../../tokenValidation';

export const usersGet = async (
  id: string,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    return await checkResponse(await fetch(`/api/${endPoints.users}`, getHeaders({signal, token}))).json();
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const userGet = async (
  id: string,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    return await checkResponse(await fetch(`/api/${endPoints.users}/${id}`, getHeaders({signal, token}))).json();
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const usersPost = async (
  {body}: {body: UserData},
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.users}`, postHeaders({body, signal, token}))
    ).json();

    enqueueSnackbar(i18n.t('usersLibs:created'), {variant: 'success'});

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const usersPatch = async (
  {body, id}: {body: Partial<UserData>, id: string},
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.users}/${id}`, patchHeaders({body, signal, token}))
    ).json();

    enqueueSnackbar(i18n.t('usersLibs:updated'), {variant: 'success'});

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const userDelete = async (
  {id}: {id: GridRowId},
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(await fetch(`/api/${endPoints.users}/${id}`, delHeaders({signal, token}))).json();

    enqueueSnackbar(i18n.t('usersLibs:deleted'), {variant: 'success'});

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}
