import { GridRowId } from "@mui/x-data-grid";
import { PayloadAction } from '@reduxjs/toolkit';
import { ApiOperations, CompanyFilterData, CompanyFull } from '@eco/types';
import { companyDelete, companyGet, companiesGet, companiesPatch, companiesPost } from "./companyApi";
import { createSlice } from '../createSlice';

export interface CompanyState {
  company: CompanyFull | null;
  companies: CompanyFull[];
  filter: CompanyFilterData;
  error: {[key: string]: unknown | null};
  loading: {[key: string]: boolean};
  loaded: {[key: string]: boolean};
}

export const initialCompanyState: CompanyState = {
  company: null,
  companies: [],
  filter: {},
  error: {},
  loading: {},
  loaded: {},
};

const companySlice = createSlice({
  name: "company",
  initialState: initialCompanyState,
  reducers: (create) => ({
    resetCompanies: create.reducer(() => initialCompanyState),
    unshiftCompany: create.reducer((state, {payload}: PayloadAction<CompanyFull>) => {
      state.companies.unshift(payload);
    }),
    cancelCompany: create.reducer((state, {payload}: PayloadAction<GridRowId>) => {
      state.companies = state.companies.filter(({id, isNew}) => id !== payload || !isNew);
    }),
    setCompanyFilterData: create.reducer((state, {payload}: PayloadAction<CompanyFilterData>) => {
      state.filter = {...state.filter, ...payload};
    }),
    setCompany: create.reducer((state, {payload}: PayloadAction<CompanyState['company']>) => {
      state.company = payload;
    }),
    apiGetCompanies: create.asyncThunk(
      companiesGet,
      {
        pending: (state) => {
          state.loading[ApiOperations.getList] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[ApiOperations.getList] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          state.companies = payload;
          state.loaded[ApiOperations.getList] = true;
        },
        settled: (state) => {
          state.loading[ApiOperations.getList] = false;
        },
      },
    ),
    apiGetCompany: create.asyncThunk(
      companyGet,
      {
        pending: (state) => {
          state.loading[ApiOperations.getItem] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[ApiOperations.getItem] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          state.loaded[ApiOperations.getItem] = true;
          state.company = payload;
        },
        settled: (state) => {
          state.loading[ApiOperations.getItem] = false;
        },
      },
    ),
    apiPostCompany: create.asyncThunk(
      companiesPost,
      {
        pending: (state) => {
          state.loading[ApiOperations.create] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[ApiOperations.create] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          state.companies[0] = payload;
        },
        settled: (state) => {
          state.loading[ApiOperations.create] = false;
        },
      },
    ),
    apiPatchCompany: create.asyncThunk(
      companiesPatch,
      {
        pending: (state) => {
          state.loading[ApiOperations.edit] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[ApiOperations.edit] = payload ?? error;
        },
        fulfilled: (state, { meta: { arg }, payload }) => {
          const index = state.companies.findIndex(({id}) => id === arg.id);
          if (index > -1) {
            state.companies[index] = payload;
          }
          state.company = payload;
        },
        settled: (state) => {
          state.loading[ApiOperations.edit] = false;
        },
      },
    ),
    apiDeleteCompany: create.asyncThunk(
      companyDelete,
      {
        pending: (state) => {
          state.loading[ApiOperations.deleteItem] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[ApiOperations.deleteItem] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          if (payload.id) {
            state.companies = state.companies.filter(({id}) => id !== payload.id);
          }
        },
        settled: (state) => {
          state.loading[ApiOperations.deleteItem] = false;
        },
      },
    )
  }),
  selectors: {
    selectCompanies: (state) => ({
      companies: state.companies,
      isLoading: !!state.loading[ApiOperations.getList],
      loaded: !!state.loaded[ApiOperations.getItem],
    }),
    selectCompany: (state) => state.company,
    selectCompanyFilter: (state) => state.filter,
    selectIsCompaniesLoading: (state, operation: ApiOperations) => !!state.loading[operation],
  },
});

export default companySlice.reducer;

export const {
  apiGetCompanies,
  apiGetCompany,
  apiPostCompany,
  apiPatchCompany,
  apiDeleteCompany,
  cancelCompany,
  resetCompanies,
  setCompanyFilterData,
  setCompany,
  unshiftCompany
} = companySlice.actions

export const {
  selectCompanyFilter,
  selectCompanies,
  selectCompany,
  selectIsCompaniesLoading,
} = companySlice.selectors
