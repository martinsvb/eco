import { GetThunkAPI, AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { checkResponse, getHeaders, getErrorValue, aresEndPoints } from '@eco/config';

export const companyGetAres = async (
  ico: string,
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {

    return await checkResponse(
      await fetch(`${aresEndPoints.subjects}/${ico}`, getHeaders({signal}))
    ).json();
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}
