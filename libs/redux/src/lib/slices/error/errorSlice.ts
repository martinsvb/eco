import { PayloadAction } from '@reduxjs/toolkit';
import { ApiOperations, ErrorData, ErrorsFilterData } from '@eco/types';
import { errorDelete, errorGet, errorPost, errorsGet, errorsPatch } from "./errorApi";
import { createSlice } from "../createSlice";

export interface ErrorState {
  error: ErrorData | null;
  errors: ErrorData[];
  errorsFilter: ErrorsFilterData;
  apiError: {[key: string]: unknown | null};
  loading: {[key: string]: boolean};
  loaded: {[key: string]: boolean};
}

export const initialErrorState: ErrorState = {
  error: null,
  errors: [],
  errorsFilter: {},
  apiError: {},
  loading: {},
  loaded: {},
};

const errorSlice = createSlice({
  name: 'error',
  initialState: initialErrorState,
  reducers: (create) => ({
    resetErrors: create.reducer(() => initialErrorState),
    setError: create.reducer((state, {payload}: PayloadAction<ErrorData | null>) => {
      state.error = payload;
    }),
    setErrorsFilterData: create.reducer((state, {payload}: PayloadAction<ErrorsFilterData>) => {
      state.errorsFilter = {...state.errorsFilter, ...payload};
    }),
    clearErrorsFilterData: create.reducer((state) => {
      state.errorsFilter = {};
    }),
    apiGetErrors: create.asyncThunk(
      errorsGet,
      {
        pending: (state) => {
          state.loading[ApiOperations.getList] = true;
        },
        rejected: (state, { error, payload }) => {
          state.apiError[ApiOperations.getList] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          state.errors = payload;
          state.loaded[ApiOperations.getList] = true;
        },
        settled: (state) => {
          state.loading[ApiOperations.getList] = false;
        },
      },
    ),
    apiGetError: create.asyncThunk(
      errorGet,
      {
        pending: (state) => {
          state.loading[ApiOperations.getItem] = true;
        },
        rejected: (state, { error, payload }) => {
          state.apiError[ApiOperations.getItem] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          state.error = payload;
          state.loaded[ApiOperations.getItem] = true;
        },
        settled: (state) => {
          state.loading[ApiOperations.getItem] = false;
        },
      },
    ),
    apiPostError: create.asyncThunk(
      errorPost,
      {
        pending: (state) => {
          state.loading[ApiOperations.create] = true;
        },
        rejected: (state, { error, payload }) => {
          state.apiError[ApiOperations.create] = payload ?? error;
        },
        settled: (state) => {
          state.loading[ApiOperations.create] = false;
        },
      },
    ),
    apiPatchError: create.asyncThunk(
      errorsPatch,
      {
        pending: (state) => {
          state.loading[ApiOperations.edit] = true;
        },
        rejected: (state, { error, payload }) => {
          state.apiError[ApiOperations.edit] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          const index = state.errors.findIndex(({id}) => id === payload.id);
          if (index > -1) {
            state.errors[index] = payload;
          }
        },
        settled: (state) => {
          state.loading[ApiOperations.edit] = false;
        },
      },
    ),
    apiDeleteError: create.asyncThunk(
      errorDelete,
      {
        pending: (state) => {
          state.loading[ApiOperations.deleteItem] = true;
        },
        rejected: (state, { error, payload }) => {
          state.apiError[ApiOperations.deleteItem] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          if (payload.id) {
            state.errors = state.errors.filter(({id}) => id !== payload.id);
          }
        },
        settled: (state) => {
          state.loading[ApiOperations.deleteItem] = false;
        },
      },
    )
  }),
  selectors: {
    selectError: (state) => state.error,
    selectErrors: (state) => ({
      errors: state.errors,
      isLoading: !!state.loading[ApiOperations.getList],
      loaded: !!state.loaded[ApiOperations.getItem],
    }),
    selectErrorsFilter: (state) => state.errorsFilter,
    selectIsErrorsLoading: (state, operation: ApiOperations) => !!state.loading[operation],
  },
});

export default errorSlice.reducer;

export const {
  apiGetError,
  apiGetErrors,
  apiPostError,
  apiPatchError,
  apiDeleteError,
  resetErrors,
  setError,
  setErrorsFilterData,
  clearErrorsFilterData
} = errorSlice.actions;

export const {
  selectError,
  selectErrors,
  selectIsErrorsLoading,
  selectErrorsFilter
} = errorSlice.selectors;
