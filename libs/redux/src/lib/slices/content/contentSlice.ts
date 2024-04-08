import { Content } from '@prisma/client';
import { PayloadAction } from '@reduxjs/toolkit';
import { ApiOperations, ContentTypes } from '@eco/types';
import { contentDelete, contentGet, contentListGet, contentPatch, contentPost } from "./contentApi";
import { createSlice } from "../createSlice";

export interface ContentState {
  content: {
    [ContentTypes.Article]: {data: Content | null, loaded: boolean};
    [ContentTypes.Task]: {data: Content | null, loaded: boolean};
    [ContentTypes.New]: {data: Content | null, loaded: boolean};
  };
  contentList: {
    [ContentTypes.Article]: {data: Content[], loaded: boolean};
    [ContentTypes.Task]: {data: Content[], loaded: boolean};
    [ContentTypes.New]: {data: Content[], loaded: boolean};
  };
  error: {
    [ContentTypes.Article]: {[key: string]: unknown | null};
    [ContentTypes.Task]: {[key: string]: unknown | null};
    [ContentTypes.New]: {[key: string]: unknown | null};
  };
  loading: {
    [ContentTypes.Article]: {[key: string]: boolean};
    [ContentTypes.Task]: {[key: string]: boolean};
    [ContentTypes.New]: {[key: string]: boolean};
  };
}

export const initialContentState: ContentState = {
  content: {
    [ContentTypes.Article]: {data: null, loaded: false},
    [ContentTypes.Task]: {data: null, loaded: false},
    [ContentTypes.New]: {data: null, loaded: false},
  },
  contentList: {
    [ContentTypes.Article]: {data: [], loaded: false},
    [ContentTypes.Task]: {data: [], loaded: false},
    [ContentTypes.New]: {data: [], loaded: false},
  },
  error: {
    [ContentTypes.Article]: {},
    [ContentTypes.Task]: {},
    [ContentTypes.New]: {},
  },
  loading: {
    [ContentTypes.Article]: {},
    [ContentTypes.Task]: {},
    [ContentTypes.New]: {},
  },
};

const contentSlice = createSlice({
  name: 'content',
  initialState: initialContentState,
  reducers: (create) => ({
    resetContent: create.reducer(() => initialContentState),
    setContent: create.reducer((
      state,
      {payload: {data, type}}: PayloadAction<{data: Content | null, type: ContentTypes}>
    ) => {
      state.content[type].data = data;
    }),
    apiGetContentList: create.asyncThunk(
      contentListGet,
      {
        pending: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.getList] = true;
        },
        rejected: (state, { error, payload, meta: { arg: { type } } }) => {
          state.error[type][ApiOperations.getList] = payload ?? error;
        },
        fulfilled: (state, { payload, meta: { arg: { type } } }) => {
          state.contentList[type].data = payload;
          state.contentList[type].loaded = true;
        },
        settled: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.getList] = false;
        },
      },
    ),
    apiGetContent: create.asyncThunk(
      contentGet,
      {
        pending: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.getItem] = true;
        },
        rejected: (state, { error, payload, meta: { arg: { type } } }) => {
          state.error[type][ApiOperations.getItem] = payload ?? error;
        },
        fulfilled: (state, { payload, meta: { arg: { type } } }) => {
          state.content[type].data = payload;
          state.content[type].loaded = true;
        },
        settled: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.getItem] = false;
        },
      },
    ),
    apiPostContent: create.asyncThunk(
      contentPost,
      {
        pending: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.create] = true;
        },
        rejected: (state, { error, payload, meta: { arg: { type } } }) => {
          state.error[type][ApiOperations.create] = payload ?? error;
        },
        fulfilled: (state, { payload, meta: { arg: { type } } }) => {
          state.contentList[type].data.push(payload);
        },
        settled: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.create] = false;
        },
      },
    ),
    apiPatchContent: create.asyncThunk(
      contentPatch,
      {
        pending: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.edit] = true;
        },
        rejected: (state, { error, payload, meta: { arg: { type } } }) => {
          state.error[type][ApiOperations.edit] = payload ?? error;
        },
        fulfilled: (state, { payload, meta: { arg: { type } } }) => {
          const index = state.contentList[type].data.findIndex(({id}) => id === payload.id);
          if (index > -1) {
            state.contentList[type].data[index] = payload;
          }
        },
        settled: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.edit] = false;
        },
      },
    ),
    apiDeleteContent: create.asyncThunk(
      contentDelete,
      {
        pending: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.deleteItem] = true;
        },
        rejected: (state, { error, payload, meta: { arg: { type } } }) => {
          state.error[type][ApiOperations.deleteItem] = payload ?? error;
        },
        fulfilled: (state, { payload, meta: { arg: { type } } }) => {
          if (payload.id) {
            state.contentList[type].data = state.contentList[type].data.filter(({id}) => id !== payload.id);
          }
        },
        settled: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.deleteItem] = false;
        },
      },
    ),
  }),
  selectors: {
    selectContent: (state, type: ContentTypes) => {
      return {
        data: state.content[type].data,
        loaded: state.contentList[type].loaded,
        isLoading: !!state.loading[type][ApiOperations.getItem]
      }
    },
    selectContentList: (state, type: ContentTypes) => {
      return {
        data: state.contentList[type].data,
        loaded: state.contentList[type].loaded,
        isLoading: !!state.loading[type][ApiOperations.getList]
      }
    },
    selectIsContentsLoading: (state, type: ContentTypes, operation: ApiOperations) => {
      return !!state.loading[type][operation];
    },
  },
});

export default contentSlice.reducer;

export const {
  apiGetContentList,
  apiGetContent,
  apiPostContent,
  apiPatchContent,
  apiDeleteContent,
  resetContent,
  setContent
} = contentSlice.actions;

export const {
  selectContent,
  selectContentList,
  selectIsContentsLoading
} = contentSlice.selectors;
