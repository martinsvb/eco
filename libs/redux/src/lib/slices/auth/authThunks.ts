import { Auth } from '@eco/types';
import { checkResponse, endPoints, getHeaders, METHODS } from '@eco/config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { is } from 'ramda';

export const loginApiThunk = createAsyncThunk<Auth, {email: string, password: string}>(
  'auth/login',
  async (body, { rejectWithValue, signal }) => {
    try {
      return await checkResponse(
        await fetch(`/api/${endPoints.login}`, getHeaders(METHODS.POST, {body, signal}))
      ).json();
    } catch (error: unknown) {
      return rejectWithValue(JSON.stringify(is(Object, error) ? error.apiErrorData : null));
    }
  }
);

export const refreshApiThunk = createAsyncThunk<string>(
  'auth/refresh',
  async (body, { rejectWithValue, signal }) => {
    try {
      return await checkResponse(
        await fetch(`/api/${endPoints.refresh}`, getHeaders(METHODS.POST, {signal}))
      ).text();
    } catch (error: unknown) {
      return rejectWithValue(JSON.stringify(is(Object, error) ? error.apiErrorData : null));
    }
  }
);
