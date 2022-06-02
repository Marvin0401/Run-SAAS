import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import clients, { thunkHandler } from "@services/api";

const initialState = {
  status: "idle",
};

export const refreshProfile = createAsyncThunk(
  "profile/profile-refresh",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "put",
        url: "api/account/update/profile/",
        data,
      }),
      thunkAPI
    );

    return response;
  }
);

export const updateUserProfile = createAsyncThunk(
  "profile/user-profile",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "put",
        url: "api/account/update/profile/",
        data,
      }),
      thunkAPI
    );

    return response;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: {
    [updateUserProfile.pending]: (state) => {
      state.status = "loading";
    },
    [updateUserProfile.fulfilled]: (state) => {
      state.status = "succeeded";
    },
    [updateUserProfile.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const { logout } = profileSlice.actions;
export default profileSlice.reducer;
