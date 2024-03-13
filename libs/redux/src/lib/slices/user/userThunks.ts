import { User } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkResponse, endPoints, getHeaders, METHODS, getErrorValue } from '@eco/config';
import { tokenValidation } from '../../tokenValidation';

export const usersApiThunk = createAsyncThunk<User[]>(
  'users/get',
  async (body, { dispatch, getState, rejectWithValue, signal }) => {
    try {
      const token = await tokenValidation(dispatch, getState);

      return await checkResponse(
        await fetch(`/api/${endPoints.users}`, getHeaders(METHODS.GET, {signal, token}))
      ).json();
    } catch (error: unknown) {
      return rejectWithValue(getErrorValue(error));
    }
  }
);
