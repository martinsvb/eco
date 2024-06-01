import { GridRowId } from '@mui/x-data-grid';
import { GetThunkAPI, AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { pick } from 'ramda';
import {
  checkResponse,
  endPoints,
  getHeaders,
  getErrorValue,
  delHeaders,
  patchHeaders,
  postHeaders
} from '@eco/config';
import { UserData, UserEditData, UserItems, getUrl } from '@eco/types';
import i18n from '@eco/locales';
import { tokenValidation } from '../../tokenValidation';
import { RootState } from '../../store';
import { setAuthUser } from '../auth/authSlice';
import { successSnackbar } from '../snackbars';

export const usersGet = async (
  id: string,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const { user: { filter } } = getState() as RootState;

    const url = getUrl(endPoints.users, filter);

    const data = await checkResponse(await fetch(url, getHeaders({signal, token}))).json();

    return {
      data,
      token
    } as any;
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

    successSnackbar(i18n.t('usersLibs:created'));

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const usersPatch = async (
  {body, id}: {body: Partial<UserData | UserEditData>, id: string},
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.users}/${id}`, patchHeaders({body, signal, token}))
    ).json();

    successSnackbar(i18n.t('usersLibs:updated'));

    if (body.name || body.email) {
      dispatch(setAuthUser(pick([UserItems.Name, UserItems.Email], data)));
    }

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

    successSnackbar(i18n.t('usersLibs:deleted'));

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}
