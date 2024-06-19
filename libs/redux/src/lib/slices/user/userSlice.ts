import { GridRowId } from "@mui/x-data-grid";
import { PayloadAction } from '@reduxjs/toolkit';
import { is } from "ramda";
import { ApiOperations, UserFilterData, UserFull } from '@eco/types';
import { userDelete, userGet, usersGet, usersPatch, usersPost } from "./userApi";
import { decodeToken } from "@eco/config";
import { createSlice } from '../createSlice';

export interface UserState {
  user: UserFull | null;
  users: UserFull[];
  filter: UserFilterData;
  error: {[key: string]: unknown | null};
  loading: {[key: string]: boolean};
  loaded: {[key: string]: boolean};
}

export const initialUserState: UserState = {
  user: null,
  users: [],
  filter: {},
  error: {},
  loading: {},
  loaded: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: (create) => ({
    resetUsers: create.reducer(() => initialUserState),
    unshiftUser: create.reducer((state, {payload}: PayloadAction<UserFull>) => {
      state.users.unshift(payload);
    }),
    cancelUser: create.reducer((state, {payload}: PayloadAction<GridRowId>) => {
      state.users = state.users.filter(({id, isNew}) => id !== payload || !isNew);
    }),
    setFilterData: create.reducer((state, {payload}: PayloadAction<UserFilterData>) => {
      state.filter = {...state.filter, ...payload};
    }),
    clearFilterData: create.reducer((state) => {
      state.filter = {};
    }),
    setUser: create.reducer((state, {payload}: PayloadAction<UserState['user']>) => {
      state.user = payload;
    }),
    apiGetUsers: create.asyncThunk(
      usersGet,
      {
        pending: (state) => {
          state.loading[ApiOperations.getList] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[ApiOperations.getList] = payload ?? error;
        },
        fulfilled: (state, { payload: { data, token } }) => {
          const { userId } = decodeToken(token) as any;
          let userIndex = null;
          state.users = data.map((user: UserFull, index: number) => {
            if (user.id === userId) {
              userIndex = index;
              return {...user, isSelected: true};
            } 
            return user;
          });
          if (is(Number, userIndex)) {
            state.users.unshift(state.users.splice(userIndex, 1)[0]);
          }
          state.loaded[ApiOperations.getList] = true;
        },
        settled: (state) => {
          state.loading[ApiOperations.getList] = false;
        },
      },
    ),
    apiGetUser: create.asyncThunk(
      userGet,
      {
        pending: (state) => {
          state.loading[ApiOperations.getItem] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[ApiOperations.getItem] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          state.loaded[ApiOperations.getItem] = true;
          state.user = payload;
        },
        settled: (state) => {
          state.loading[ApiOperations.getItem] = false;
        },
      },
    ),
    apiPostUser: create.asyncThunk(
      usersPost,
      {
        pending: (state, { meta: { arg: { id } } }) => {
          state.loading[`${ApiOperations.getExternalItem}-${id}`] = true;
        },
        rejected: (state, { meta: { arg: { id } }, error, payload }) => {
          state.error[`${ApiOperations.getExternalItem}-${id}`] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          state.users[0] = payload;
        },
        settled: (state, { meta: { arg: { id } } }) => {
          state.loading[`${ApiOperations.getExternalItem}-${id}`] = false;
        },
      },
    ),
    apiPatchUser: create.asyncThunk(
      usersPatch,
      {
        pending: (state, { meta: { arg: { id } } }) => {
          state.loading[`${ApiOperations.edit}-${id}`] = true;
        },
        rejected: (state, { meta: { arg: { id } }, error, payload }) => {
          state.error[`${ApiOperations.edit}-${id}`] = payload ?? error;
        },
        fulfilled: (state, { meta: { arg }, payload }) => {
          const index = state.users.findIndex(({id}) => id === arg.id);
          if (index > -1) {
            state.users[index] = payload;
          }
          state.user = payload;
        },
        settled: (state, { meta: { arg: { id } } }) => {
          state.loading[`${ApiOperations.edit}-${id}`] = false;
        },
      },
    ),
    apiDeleteUser: create.asyncThunk(
      userDelete,
      {
        pending: (state) => {
          state.loading[ApiOperations.deleteItem] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[ApiOperations.deleteItem] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          if (payload.id) {
            state.users = state.users.filter(({id}) => id !== payload.id);
          }
        },
        settled: (state) => {
          state.loading[ApiOperations.deleteItem] = false;
        },
      },
    )
  }),
  selectors: {
    selectUsers: (state) => ({
      users: state.users,
      isLoading: !!state.loading[ApiOperations.getList],
      loaded: !!state.loaded[ApiOperations.getItem],
    }),
    selectUser: (state) => state.user,
    selectFilter: (state) => state.filter,
    selectIsUsersLoading: (state, operation: ApiOperations) => !!state.loading[operation],
    selectUsersLoading: (state) => state.loading,
  },
});

export default userSlice.reducer;

export const {
  apiGetUsers,
  apiGetUser,
  apiPostUser,
  apiPatchUser,
  apiDeleteUser,
  cancelUser,
  resetUsers,
  setFilterData,
  clearFilterData,
  setUser,
  unshiftUser
} = userSlice.actions

export const {
  selectFilter,
  selectUsers,
  selectUser,
  selectIsUsersLoading,
  selectUsersLoading,
} = userSlice.selectors
