import { User } from '@prisma/client';
import { usersGet } from "./userApi";
import { createSlice } from '../createSlice';
import { ApiOperations } from '@eco/types';

export interface UserState {
  users: User[];
  error: {[key: string]: unknown | null};
  loading: {[key: string]: boolean};
  loaded: {[key: string]: boolean};
}

export const initialUserState: UserState = {
  users: [],
  error: {},
  loading: {},
  loaded: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: (create) => ({
    resetUsers: create.reducer(() => initialUserState),
    apiGetUsers: create.asyncThunk(
      usersGet,
      {
        pending: (state) => {
          state.loading[ApiOperations.getList] = true;
        },
        rejected: (state, { error, payload }) => {
          state.error[ApiOperations.getList] = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          state.users = payload;
          state.loaded[ApiOperations.getList] = true;
        },
        settled: (state) => {
          state.loading[ApiOperations.getList] = false;
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
  },
});

export default userSlice.reducer;

export const { apiGetUsers, resetUsers } = userSlice.actions

export const { selectUsers } = userSlice.selectors
