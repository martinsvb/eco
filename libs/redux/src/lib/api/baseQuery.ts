import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: async (headers, { getState }) => {
    const { auth } = getState() as RootState;
    const { accessToken: token } = auth;

    if (token) {
      headers.set('authentication', `Bearer ${token}`)
    }

    return headers
  },
});

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });
