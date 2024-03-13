import { checkResponse, endPoints, getErrorValue, postHeaders } from '@eco/config';
import { AsyncThunkConfig, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';

export const loginPost = async (
  body: {email: string, password: string},
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    return await checkResponse(await fetch(`/api/${endPoints.login}`, postHeaders({body, signal}))).json();
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
