import { Account } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkResponse, endPoints, getHeaders, METHODS, getErrorValue } from '@eco/config';
import { tokenValidation } from '../../tokenValidation';

export const accountsApiThunk = createAsyncThunk<Account[]>(
  'accounts/get',
  async (body, { dispatch, getState, rejectWithValue, signal }) => {
    try {
      const token = await tokenValidation(dispatch, getState);

      return await checkResponse(
        await fetch(`/api/${endPoints.accounts}`, getHeaders(METHODS.GET, {signal, token}))
      ).json();
    } catch (error: unknown) {
      return rejectWithValue(getErrorValue(error));
    }
  }
);
