import { User } from '@prisma/client';
import { usersGet } from "./userApi";
import { createSlice } from '../createSlice';

export interface UserState {
  users: User[];
  getUsersError: unknown | null;
  getUsersLoading: boolean;
}

export const initialUserState: UserState = {
  users: [],
  getUsersError: null,
  getUsersLoading: false,
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
          state.getUsersLoading = true;
        },
        rejected: (state, { error, payload }) => {
          state.getUsersError = payload ?? error;
        },
        fulfilled: (state, { payload }) => {
          state.users = payload;
        },
        settled: (state) => {
          state.getUsersLoading = false;
        },
      },
    )
  }),
  selectors: {
    selectUsers: (state) => state.users,
  },
});

export default userSlice.reducer;

export const { apiGetUsers, resetUsers } = userSlice.actions

export const { selectUsers } = userSlice.selectors
