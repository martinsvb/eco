import { GetThunkAPI, AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { enqueueSnackbar } from 'notistack';
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
import { ContentData, ContentTypes } from '@eco/types';
import { tokenValidation } from '../../tokenValidation';

type ContentTypePayload = {type: ContentTypes};

export const contentListGet = async (
  {type}: ContentTypePayload,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);
    const data = await checkResponse(
      await fetch(`/api/${endPoints.content}/list/${type}`, getHeaders({signal, token}))
    ).json();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contentGet = async (
  {id, type}: {id: string} & ContentTypePayload,
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
  {body, type, onSuccess}: {body: ContentData, onSuccess: () => void} & ContentTypePayload,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.content}`, postHeaders({body: {...body, type}, signal, token}))
    ).json();

    enqueueSnackbar(i18n.t('contentLibs:created'), {variant: 'success'});

    onSuccess();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contentPatch = async (
  {body, type, id}: {body: Partial<ContentData>, id: string} & ContentTypePayload,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.content}/${id}/${type}`, patchHeaders({body, signal, token}))
    ).json();

    enqueueSnackbar(i18n.t('contentLibs:updated'), {variant: 'success'});

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contentDelete = async (
  {id, type, onSuccess}: {id: string, onSuccess: () => void} & ContentTypePayload,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.content}/${id}/${type}`, delHeaders({signal, token}))
    ).json();

    enqueueSnackbar(i18n.t('contentLibs:deleted'), {variant: 'success'});

    onSuccess();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}
