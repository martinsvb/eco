import { HttpStatus } from '@nestjs/common';
import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { is } from 'ramda';
import i18n from '@eco/locales';
import { errorSnackbar } from './slices/snackbars';
import { errorMessages } from './messages';

export const apiErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { error, payload, meta, type } = action;

    const parsedError = is(String, payload) ? JSON.parse(payload) : payload;

    if (is(Number, parsedError?.status)) {
      const { status } = parsedError;
      if (status === HttpStatus.UNAUTHORIZED) {
        const loginButton: HTMLButtonElement | null = document.querySelector("#loginButton");
        loginButton?.click();
      }
      else {
        errorSnackbar(
          `${errorMessages[status] || i18n.t('apiError:ACTION_FAILED')}, ${i18n.t('apiError:STATUS', {status})}`
        );
      }
    }

    console.log({ api, error, parsedError, meta, type });
  }

  return next(action);
};
