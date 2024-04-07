import { Content } from '@prisma/client';
import { PayloadAction } from '@reduxjs/toolkit';
import { ApiOperations, ContentTypes } from '@eco/types';
import { contentListGet } from "./contentApi";
import { createSlice } from "../createSlice";

export interface ContentState {
  content: {
    [ContentTypes.Article]: Content | null;
    [ContentTypes.Task]: Content | null;
    [ContentTypes.New]: Content | null;
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
    [ContentTypes.Article]: null,
    [ContentTypes.Task]: null,
    [ContentTypes.New]: null,
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
      state.content[type] = data;
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
  }),
  selectors: {
    selectContent: (state, type: ContentTypes) => state.content[type],
    selectContentList: (state, type: ContentTypes) => ({
      data: state.contentList[type].data,
      loaded: state.contentList[type].loaded,
      isLoading: !!state.loading[type][ApiOperations.getList]
    }),
    selectIsContentsLoading: (state, type: ContentTypes, operation: ApiOperations) => (
      !!state.loading[type][operation]
    ),
  },
});

export default contentSlice.reducer;

export const {
  apiGetContentList,
  resetContent,
  setContent
} = contentSlice.actions;

export const {
  selectContent,
  selectContentList,
  selectIsContentsLoading
} = contentSlice.selectors;
