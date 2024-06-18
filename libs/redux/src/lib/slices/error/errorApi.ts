import { GetThunkAPI, AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import {
  checkResponse,
  endPoints,
  getHeaders,
  getErrorValue,
  patchHeaders,
  delHeaders
} from '@eco/config';
import { ErrorData, getUrl } from '@eco/types';
import { RootState } from '../../store';
import { tokenValidation } from '../../tokenValidation';

export const errorsGet = async (
  id: string,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const { error: { errorsFilter } } = getState() as RootState;

    const url = getUrl(endPoints.errors, errorsFilter);

    const data = await checkResponse(await fetch(url, getHeaders({signal, token}))).json();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const errorGet = async (
  id: string,
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    return await checkResponse(await fetch(`/api/${endPoints.errors}/${id}`, getHeaders({signal, token}))).json();
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const errorsPatch = async (
  {body, id}: {body: Partial<ErrorData>, id: string},
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.errors}/${id}`, patchHeaders({body, signal, token}))
    ).json();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const errorDelete = async (
  {id, onSuccess}: {id: string, onSuccess: () => void},
  { dispatch, getState, rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const token = await tokenValidation(dispatch, getState);

    const data = await checkResponse(
      await fetch(`/api/${endPoints.errors}/${id}`, delHeaders({signal, token}))
    ).json();

    onSuccess();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}
