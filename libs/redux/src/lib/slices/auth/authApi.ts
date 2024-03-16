import { checkResponse, endPoints, getErrorValue, postHeaders } from '@eco/config';
import { LoginData } from '@eco/types';
import { AsyncThunkConfig, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';

export const loginPost = async (
  body: LoginData,
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    return await checkResponse(await fetch(`/api/${endPoints.login}`, postHeaders({body, signal}))).json();
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const loginGooglePost = async (
  body: {token?: string},
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    return await checkResponse(await fetch(`/api/${endPoints.loginGoogle}`, postHeaders({body, signal}))).json();
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const refreshPost = async (
  id: string,
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    return await checkResponse(await fetch(`/api/${endPoints.refresh}`, postHeaders({signal}))).json();
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}
