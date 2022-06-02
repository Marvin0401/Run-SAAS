import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import clients, { thunkHandler } from "@services/api";

import { toast } from "react-toastify";

import { refreshProfile, updateUserProfile } from "@redux/slices/profile";

const initialState = {
  refresh: null,
  status: "idle",
  token: null,
  user: null,
  showRegPopup: false,
};

export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "post",
        url: "api/account/reset-password/",
        data,
      }),
      thunkAPI
    );

    return response;
  }
);

export const login = createAsyncThunk("auth/login", ({ data }, thunkAPI) => {
  const response = thunkHandler(
    clients.default.client({
      method: "post",
      url: "api/account/login/",
      data,
    }),
    thunkAPI
  );

  return response;
});

export const getAccountDetails = createAsyncThunk(
  "auth/account",
  (_, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "get",
        url: "api/account/",
      }),
      thunkAPI
    );
    return response;
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refresh-token",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "post",
        url: "api/token/refresh/",
        data,
      }),
      thunkAPI
    );

    return response;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "post",
        url: "/api/account/register/",
        data,
      }),
      thunkAPI
    );

    return response;
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "post",
        url: "/api/account/reset-password/confirm/",
        data,
      }),
      thunkAPI
    );

    return response;
  }
);

export const updatePassword = createAsyncThunk(
  "auth/update-password",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "put",
        url: "api/account/profile/reset-password/",
        data,
      }),
      thunkAPI
    );

    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearpopup: (state) => {
      state.showRegPopup = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      delete clients.default.client.defaults.headers.common["Authorization"];
    },
  },
  extraReducers: {
    "persist/REHYDRATE": (state, action) => {
      const token = action.payload?.auth?.token;

      if (token)
        clients.default.client.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
    },
    [login.pending]: (state) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      const { refresh, token, user } = action.payload;

      state.refresh = refresh;
      state.status = "succeeded";
      state.user = user;
      state.token = token;

      clients.default.client.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    },
    [login.rejected]: (state) => {
      state.status = "failed";
    },
    [getAccountDetails.pending]: (state) => {
      state.status = "loading";
    },
    [getAccountDetails.fulfilled]: (state, action) => {
      const { user } = action.payload;
      state.status = "succeeded";
      state.user = user;
    },
    [getAccountDetails.rejected]: (state) => {
      state.status = "failed";
    },
    [forgotPassword.pending]: (state) => {
      state.status = "loading";
    },
    [forgotPassword.fulfilled]: (state) => {
      state.status = "succeeded";

      toast.success("📬 Check your email to continue");
    },
    [forgotPassword.rejected]: (state) => {
      state.status = "failed";
    },
    [refreshToken.pending]: (state) => {
      state.status = "refreshing";
    },
    [refreshToken.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.refresh = action.payload.refresh;
      state.token = action.payload.access;
    },
    [refreshToken.rejected]: (state) => {
      state.status = "rejected";
    },
    [register.pending]: (state) => {
      state.status = "loading";
    },
    [register.fulfilled]: (state, action) => {
      const { refresh, token, user } = action.payload;
      state.refresh = refresh;
      state.status = "succeeded";
      state.user = user;
      state.token = token;
      state.showRegPopup = true;

      clients.default.client.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    },
    [register.rejected]: (state) => {
      state.status = "failed";
    },
    [resetPassword.pending]: (state) => {
      state.status = "loading";
    },
    [resetPassword.fulfilled]: (state) => {
      state.status = "succeeded";

      toast.success("🔐 Password reset");
    },
    [resetPassword.rejected]: (state) => {
      state.status = "failed";
    },
    [updatePassword.pending]: (state) => {
      state.status = "loading";
    },
    [updatePassword.fulfilled]: (state) => {
      state.status = "succeeded";

      toast.success(
        "🔐 Password updated. You'll be redirected to login page shortly."
      );
    },
    [updatePassword.rejected]: (state) => {
      state.status = "failed";
    },
    [updateUserProfile.fulfilled]: (state, action) => {
      const { user } = action.payload;

      state.user = {
        ...state.user,
        ...user,
      };

      toast.success("👍 Profile updated");
    },
    [refreshProfile.fulfilled]: (state, action) => {
      const { user_profile: user } = action.payload;

      state.user = {
        ...state.user,
        ...user,
      };
    },
  },
});

export const { clearpopup, logout } = authSlice.actions;
export default authSlice.reducer;
