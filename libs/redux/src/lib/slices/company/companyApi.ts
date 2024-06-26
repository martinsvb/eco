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
import { CompanyData, getUrl } from '@eco/types';
import i18n from '@eco/locales';
import { tokenValidation } from '../../tokenValidation';
import { RootState } from '../../store';
import { successSnackbar } from '../snackbars';

export const companiesGet = async (
  id: string,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const { company: { filter } } = getState() as RootState;

    const url = getUrl(endPoints.companies, filter);

    const data = await checkResponse(await fetch(url, getHeaders({signal, token}))).json();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const companyGet = async (
  id: string,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    return await checkResponse(
      await fetch(`/api/${endPoints.companies}/${id}`, getHeaders({signal, token}))
    ).json();
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const companiesPost = async (
  {body}: {body: CompanyData, id: string},
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.companies}`, postHeaders({body, signal, token}))
    ).json();

    successSnackbar(i18n.t('companiesLibs:created'));

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const companiesPatch = async (
  {body, id}: {body: Partial<CompanyData>, id: string},
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.companies}/${id}`, patchHeaders({body, signal, token}))
    ).json();

    successSnackbar(i18n.t('companiesLibs:updated'));

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const companyDelete = async (
  {id}: {id: GridRowId},
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.companies}/${id}`, delHeaders({signal, token}))
    ).json();

    successSnackbar(i18n.t('companiesLibs:deleted'));

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}
