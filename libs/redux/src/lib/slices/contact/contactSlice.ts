import { GridRowId } from "@mui/x-data-grid";
import { PayloadAction } from '@reduxjs/toolkit';
import { ApiOperations, ContactFilterData, ContactFull, ContactItems } from '@eco/types';
import { createSlice } from '../createSlice';
import { companyGetAres } from '../company/companyExternalApi';
import { contactDelete, contactGet, contactsGet, contactsPatch, contactsPost } from "./contactApi";

export interface ContactState {
  contact: ContactFull | null;
  contacts: ContactFull[];
  filter: ContactFilterData;
  error: {[key: string]: unknown | null};
  loading: {[key: string]: boolean};
  loaded: {[key: string]: boolean};
}

export const initialContactState: ContactState = {
  contact: null,
  contacts: [],
  filter: {},
  error: {},
  loading: {},
  loaded: {},
};

const contactSlice = createSlice({
  name: "contact",
  initialState: initialContactState,
  reducers: (create) => ({
    resetContacts: create.reducer(() => initialContactState),
    unshiftContact: create.reducer((state, {payload}: PayloadAction<ContactFull>) => {
      state.contacts.unshift(payload);
    }),
    cancelContact: create.reducer((state, {payload}: PayloadAction<GridRowId>) => {
      state.contacts = state.contacts.filter(({id, isNew}) => id !== payload || !isNew);
    }),
    setContactFilterData: create.reducer((state, {payload}: PayloadAction<ContactFilterData>) => {
      state.filter = {...state.filter, ...payload};
    }),
    clearContactFilterData: create.reducer((state) => {
      state.filter = {};
    }),
    setContact: create.reducer((state, {payload}: PayloadAction<ContactState['contact']>) => {
      state.contact = payload;
    }),
    apiGetContacts: create.asyncThunk(
      contactsGet,
      {
        pending: (state) => {
          state.loading[ApiOperations.getList] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[ApiOperations.getList] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          state.contacts = payload;
          state.loaded[ApiOperations.getList] = true;
        },
        settled: (state) => {
          state.loading[ApiOperations.getList] = false;
        },
      },
    ),
    apiGetContact: create.asyncThunk(
      contactGet,
      {
        pending: (state) => {
          state.loading[ApiOperations.getItem] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[ApiOperations.getItem] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          state.loaded[ApiOperations.getItem] = true;
          state.contact = payload;
        },
        settled: (state) => {
          state.loading[ApiOperations.getItem] = false;
        },
      },
    ),
    apiGetContactAres: create.asyncThunk(
      companyGetAres,
      {
        pending: (state, { meta: { arg: { id } } }) => {
          state.loading[`${ApiOperations.getExternalItem}-${id}`] = true;
        },
        rejected: (state, { meta: { arg: { id } }, error, payload }) => {
          state.error[`${ApiOperations.getExternalItem}-${id}`] = payload ?? error;
        },
        fulfilled: (
          state,
          { meta: { arg: { id, ico, apiRef } }, payload: { ico: aresIco, dic, obchodniJmeno, sidlo } }
        ) => {
          state.loaded[`${ApiOperations.getExternalItem}-${id}`] = true;
          const index = state.contacts.findIndex((item) => item.id === id);
          if (index > -1 && ico === aresIco) {
            apiRef.current.setEditCellValue(
              { id, field: ContactItems.Name, value: obchodniJmeno, debounceMs: 10 },
            );
            apiRef.current.setEditCellValue(
              { id, field: ContactItems.Vat, value: dic, debounceMs: 10 },
            );
            apiRef.current.setEditCellValue(
              { id, field: ContactItems.Address, value: sidlo.textovaAdresa, debounceMs: 10 },
            );
          }
        },
        settled: (state, { meta: { arg: { id } } }) => {
          state.loading[`${ApiOperations.getExternalItem}-${id}`] = false;
        },
      },
    ),
    apiPostContact: create.asyncThunk(
      contactsPost,
      {
        pending: (state, { meta: { arg: { id } } }) => {
          state.loading[`${ApiOperations.create}-${id}`] = true;
        },
        rejected: (state, { meta: { arg: { id } }, error, payload }) => {
          state.error[`${ApiOperations.create}-${id}`] = payload ?? error;
        },
        fulfilled: (state, { meta: { arg }, payload }) => {
          const index = state.contacts.findIndex(({id}) => id === arg.id);
          if (index > -1) {
            state.contacts[index] = payload;
          }
        },
        settled: (state, { meta: { arg: { id } } }) => {
          state.loading[`${ApiOperations.create}-${id}`] = false;
        },
      },
    ),
    apiPatchContact: create.asyncThunk(
      contactsPatch,
      {
        pending: (state, { meta: { arg: { id } } }) => {
          state.loading[`${ApiOperations.edit}-${id}`] = true;
        },
        rejected: (state, { meta: { arg: { id } }, error, payload }) => {
          state.error[`${ApiOperations.edit}-${id}`] = payload ?? error;
        },
        fulfilled: (state, { meta: { arg }, payload }) => {
          const index = state.contacts.findIndex(({id}) => id === arg.id);
          if (index > -1) {
            state.contacts[index] = payload;
          }
          state.contact = payload;
        },
        settled: (state, { meta: { arg: { id } } }) => {
          state.loading[`${ApiOperations.edit}-${id}`] = false;
        },
      },
    ),
    apiDeleteContact: create.asyncThunk(
      contactDelete,
      {
        pending: (state) => {
          state.loading[ApiOperations.deleteItem] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[ApiOperations.deleteItem] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          if (payload.id) {
            state.contacts = state.contacts.filter(({id}) => id !== payload.id);
          }
        },
        settled: (state) => {
          state.loading[ApiOperations.deleteItem] = false;
        },
      },
    )
  }),
  selectors: {
    selectContacts: (state) => ({
      contacts: state.contacts,
      isLoading: !!state.loading[ApiOperations.getList],
      loaded: !!state.loaded[ApiOperations.getItem],
    }),
    selectContact: (state) => state.contact,
    selectContactFilter: (state) => state.filter,
    selectIsContactsLoading: (state, operation: string) => !!state.loading[operation],
    selectContactsLoading: (state) => state.loading,
  },
});

export default contactSlice.reducer;

export const {
  apiGetContacts,
  apiGetContact,
  apiGetContactAres,
  apiPostContact,
  apiPatchContact,
  apiDeleteContact,
  cancelContact,
  resetContacts,
  setContactFilterData,
  clearContactFilterData,
  setContact,
  unshiftContact,
} = contactSlice.actions

export const {
  selectContactFilter,
  selectContacts,
  selectContact,
  selectIsContactsLoading,
  selectContactsLoading,
} = contactSlice.selectors
