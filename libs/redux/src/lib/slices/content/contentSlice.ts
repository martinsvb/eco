import { PayloadAction } from '@reduxjs/toolkit';
import { ApiOperations, ContentFilterData, ContentFull, ContentTypes } from '@eco/types';
import {
  contentChildsListGet,
  contentDelete,
  contentGet,
  contentListGet,
  contentPatch,
  contentPost
} from "./contentApi";
import { createSlice } from "../createSlice";

export interface ContentState {
  content: {
    [ContentTypes.Article]: {data: ContentFull | null, childs: ContentFull[], loaded: boolean};
    [ContentTypes.Record]: {data: ContentFull | null, childs: ContentFull[], loaded: boolean};
    [ContentTypes.Task]: {data: ContentFull | null, childs: ContentFull[], loaded: boolean};
    [ContentTypes.New]: {data: ContentFull | null, childs: ContentFull[], loaded: boolean};
  };
  contentList: {
    [ContentTypes.Article]: {data: ContentFull[], loaded: boolean};
    [ContentTypes.Record]: {data: ContentFull[], loaded: boolean};
    [ContentTypes.Task]: {data: ContentFull[], loaded: boolean};
    [ContentTypes.New]: {data: ContentFull[], loaded: boolean};
  };
  error: {
    [ContentTypes.Article]: {[key: string]: unknown | null};
    [ContentTypes.Record]: {[key: string]: unknown | null};
    [ContentTypes.Task]: {[key: string]: unknown | null};
    [ContentTypes.New]: {[key: string]: unknown | null};
  };
  loading: {
    [ContentTypes.Article]: {[key: string]: boolean};
    [ContentTypes.Record]: {[key: string]: boolean};
    [ContentTypes.Task]: {[key: string]: boolean};
    [ContentTypes.New]: {[key: string]: boolean};
  };
  filter: ContentFilterData;
}

export const initialContentState: ContentState = {
  content: {
    [ContentTypes.Article]: {data: null, childs: [], loaded: false},
    [ContentTypes.Record]: {data: null, childs: [], loaded: false},
    [ContentTypes.Task]: {data: null, childs: [], loaded: false},
    [ContentTypes.New]: {data: null, childs: [], loaded: false},
  },
  contentList: {
    [ContentTypes.Article]: {data: [], loaded: false},
    [ContentTypes.Record]: {data: [], loaded: false},
    [ContentTypes.Task]: {data: [], loaded: false},
    [ContentTypes.New]: {data: [], loaded: false},
  },
  error: {
    [ContentTypes.Article]: {},
    [ContentTypes.Record]: {},
    [ContentTypes.Task]: {},
    [ContentTypes.New]: {},
  },
  loading: {
    [ContentTypes.Article]: {},
    [ContentTypes.Record]: {},
    [ContentTypes.Task]: {},
    [ContentTypes.New]: {},
  },
  filter: {}
};

const contentSlice = createSlice({
  name: 'content',
  initialState: initialContentState,
  reducers: (create) => ({
    resetContent: create.reducer(() => initialContentState),
    setContent: create.reducer((
      state,
      {payload: {data, type}}: PayloadAction<{data: ContentFull | null, type: ContentTypes}>
    ) => {
      state.content[type].data = data;
    }),
    setContentFilterData: create.reducer((state, {payload}: PayloadAction<ContentFilterData>) => {
      state.filter = {...state.filter, ...payload};
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
    apiGetContentChildsList: create.asyncThunk(
      contentChildsListGet,
      {
        fulfilled: (state, { payload, meta: { arg: { type } } }) => {
          state.content[type].childs = payload;
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
    selectContentFilter: (state) => state.filter,
  },
});

export default contentSlice.reducer;

export const {
  apiGetContentList,
  apiGetContentChildsList,
  apiGetContent,
  apiPostContent,
  apiPatchContent,
  apiDeleteContent,
  resetContent,
  setContent,
  setContentFilterData
} = contentSlice.actions;

export const {
  selectContent,
  selectContentList,
  selectIsContentsLoading,
  selectContentFilter
} = contentSlice.selectors;
