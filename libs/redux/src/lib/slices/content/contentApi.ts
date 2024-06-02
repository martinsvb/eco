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
import { ContentData, ContentTypes, getUrl } from '@eco/types';
import { tokenValidation } from '../../tokenValidation';
import { RootState } from '../../store';
import { successSnackbar } from '../snackbars';

type ContentIdentification = {
  parentId?: string;
  type: ContentTypes;
};

export const contentListGet = async (
  {type}: ContentIdentification,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const { content: { filter } } = getState() as RootState;

    const url = getUrl(`${endPoints.content}/list/${type}`, filter);

    const data = await checkResponse(await fetch(url, getHeaders({signal, token}))).json();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contentChildsListGet = async (
  {type, parentId}: ContentIdentification,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);
    const data = await checkResponse(
      await fetch(`/api/${endPoints.content}/list-childs/${type}/${parentId}`, getHeaders({signal, token}))
    ).json();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contentGet = async (
  {id, type}: {id: string} & ContentIdentification,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    return await checkResponse(
      await fetch(`/api/${endPoints.content}/${id}/${type}`, getHeaders({signal, token}))
    ).json();
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contentPost = async (
  {body, type, parentId, onSuccess}: {body: ContentData, onSuccess: () => void} & ContentIdentification,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.content}`, postHeaders({body: {...body, type, parentId}, signal, token}))
    ).json();

    successSnackbar(i18n.t('contentLibs:created'));

    onSuccess();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contentPatch = async (
  {
    body,
    type,
    id,
    parentId,
    successMsg
  }: {body: Partial<ContentData>, id: string, successMsg?: string} & ContentIdentification,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.content}/${id}/${type}`, patchHeaders({body: {...body, parentId}, signal, token}))
    ).json();

    successSnackbar(successMsg || i18n.t('contentLibs:updated'));

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contentApproval = async (
  {
    approve,
    type,
    id
  }: {approve: boolean, id: string} & ContentIdentification,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.content}/approve/${id}/${type}`, patchHeaders({signal, token}))
    ).json();

    successSnackbar(approve ? i18n.t('contentLibs:approve') : i18n.t('contentLibs:unapprove'));

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contentDelete = async (
  {id, type, onSuccess}: {id: string, onSuccess: () => void} & ContentIdentification,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.content}/${id}/${type}`, delHeaders({signal, token}))
    ).json();

    successSnackbar(i18n.t('contentLibs:deleted'));

    onSuccess();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}
