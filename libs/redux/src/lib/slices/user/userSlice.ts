import { createSlice } from "@reduxjs/toolkit";
import { User } from '@prisma/client';
import { RootState } from "../../store";
import { REQUEST_STATUS } from "@eco/config";
import { usersApiThunk } from "./userThunks";

export interface UserState {
  users: User[];
  usersReqStatus: REQUEST_STATUS;
}

export const initialUserState: UserState = {
  users: [],
  usersReqStatus: REQUEST_STATUS.IDDLE,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(usersApiThunk.pending, (state) => {
        state.usersReqStatus = REQUEST_STATUS.PENDING;
      })
      .addCase(usersApiThunk.rejected, (state) => {
        state.usersReqStatus = REQUEST_STATUS.ERROR;
      })
      .addCase(usersApiThunk.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.usersReqStatus = REQUEST_STATUS.SUCCESS;
      });
  },
});

export default userSlice.reducer;

export const selectUsers = (state: RootState) => state.user.users;

export const selectUserUserReqStatus = (state: RootState) => state.user.usersReqStatus;
