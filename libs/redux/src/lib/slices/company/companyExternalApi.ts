import { MutableRefObject } from 'react';
import { UseFormSetValue, FieldValues } from 'react-hook-form';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { GridRowId } from '@mui/x-data-grid';
import { GetThunkAPI, AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { checkResponse, getHeaders, getErrorValue, aresEndPoints } from '@eco/config';

export const companyGetAres = async (
  {ico}: {id: GridRowId, ico: string, apiRef: MutableRefObject<GridApiCommunity>},
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

export const companyGetFromAres = async (
  {ico}: {ico: string, setValue: UseFormSetValue<FieldValues>},
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
