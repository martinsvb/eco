import { PayloadAction } from '@reduxjs/toolkit';
import { equals } from 'ramda';
import { ApiOperations, ContentData, ContentFilterData, ContentFull, ContentTypes } from '@eco/types';
import {
  contentChildsListGet,
  contentDelete,
  contentGet,
  contentListGet,
  contentPatch,
  contentPost
} from "./contentApi";
import { createSlice } from "../createSlice";

interface ContentItemData {
  data: ContentFull | null;
  tempData: ContentData | null;
  loaded: boolean;
}

interface ContentListData {
  data: ContentFull[];
  loaded: boolean;
}

export const initContentData = {
  data: null,
  tempData: null,
  loaded: false
}

const initContentListData = {
  data: [],
  loaded: false
}

export interface ContentState {
  content: {
    [ContentTypes.Article]: ContentItemData;
    [ContentTypes.Record]: ContentItemData;
    [ContentTypes.Task]: ContentItemData;
    [ContentTypes.New]: ContentItemData;
  };
  contentList: {
    [ContentTypes.Article]: ContentListData;
    [ContentTypes.Record]: ContentListData;
    [ContentTypes.Task]: ContentListData;
    [ContentTypes.New]: ContentListData;
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
  preview: boolean;
}

export const initialContentState: ContentState = {
  content: {
    [ContentTypes.Article]: initContentData,
    [ContentTypes.Record]: initContentData,
    [ContentTypes.Task]: initContentData,
    [ContentTypes.New]: initContentData,
  },
  contentList: {
    [ContentTypes.Article]: initContentListData,
    [ContentTypes.Record]: initContentListData,
    [ContentTypes.Task]: initContentListData,
    [ContentTypes.New]: initContentListData,
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
  filter: {},
  preview: false
};

const contentSlice = createSlice({
  name: 'content',
  initialState: initialContentState,
  reducers: (create) => ({
    resetContent: create.reducer(() => initialContentState),
    resetContentItem: create.reducer((
      state,
      {payload: {type}}: PayloadAction<{type: ContentTypes}>
    ) => {
      state.content[type] = initContentData;
    }),
    setContent: create.reducer((
      state,
      {payload: {data, type}}: PayloadAction<{data: ContentFull | null, type: ContentTypes}>
    ) => {
      state.content[type].data = data;
    }),
    setContentTemp: create.reducer((
      state,
      {payload: {data, type}}: PayloadAction<{data: ContentData | null, type: ContentTypes}>
    ) => {
      if (!equals(state.content[type].tempData, data)) {
        state.content[type].tempData = data;
      }
    }),
    setContentFilterData: create.reducer((state, {payload}: PayloadAction<ContentFilterData>) => {
      state.filter = {...state.filter, ...payload};
    }),
    setContentPreview: create.reducer((state, {payload}: PayloadAction<boolean>) => {
      state.preview = payload;
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
        pending: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.getList] = true;
          state.contentList[type].loaded = false;
        },
        rejected: (state, { error, payload, meta: { arg: { type } } }) => {
          state.error[type][ApiOperations.getList] = payload ?? error;
        },
        fulfilled: (state, { payload, meta: { arg: { type } } }) => {
          state.contentList[type].data = payload;
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
          if (payload.id && state.contentList[type].data.length) {
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
        tempData: state.content[type].tempData,
        loaded: state.contentList[type].loaded,
        isLoading: !!state.loading[type][ApiOperations.getItem]
      }
    },
    selectContentChilds: (state, type: ContentTypes, parentId: string) => {
      return {
        data: state.contentList[type].data.filter((item) => item.parentId === parentId),
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
    selectContentPreview: (state) => state.preview,
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
  resetContentItem,
  setContent,
  setContentTemp,
  setContentFilterData,
  setContentPreview
} = contentSlice.actions;

export const {
  selectContent,
  selectContentChilds,
  selectContentList,
  selectIsContentsLoading,
  selectContentFilter,
  selectContentPreview
} = contentSlice.selectors;
