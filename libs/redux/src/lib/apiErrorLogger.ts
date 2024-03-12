import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { is } from 'ramda';

export const apiErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { error, payload, meta } = action;

    console.log({ action, api, error, payload: is(String, payload) ? JSON.parse(payload) : payload, meta });
  }

  return next(action);
};
