import { Account } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { is } from 'ramda';
import { jwtDecode } from 'jwt-decode';
import { checkResponse, endPoints, getHeaders, METHODS } from '@eco/config';
import { RootState } from '../../store';

export const accountsApiThunk = createAsyncThunk<Account[]>(
  'accounts/get',
  async (body, { getState, rejectWithValue, signal }) => {
    try {
      const { auth } = getState() as RootState;
      const decoded = jwtDecode(auth.userAuth.accessToken);
      const now = Number((Date.now() / 1000).toFixed(0));
      console.log({decoded, now, valid: decoded.exp! > now});

      return await checkResponse(
        await fetch(
          `/api/${endPoints.accounts}`,
          getHeaders(METHODS.GET, {signal, token: auth.userAuth.accessToken})
        )
      ).json();
    } catch (error: unknown) {
      return rejectWithValue(JSON.stringify(is(Object, error) ? error.apiErrorData : null));
    }
  }
);
