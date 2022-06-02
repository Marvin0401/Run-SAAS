import { createSlice } from "@reduxjs/toolkit";
import { setActivePage } from "./site";
import { resetPassword } from "./auth";

const initialState = {
  redirect: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setRedirect: (state, action) => {
      const { payload: redirect } = action;
      state.redirect = redirect;
    },
  },
  extraReducers: {
    [resetPassword.fulfilled]: (state) => {
      state.redirect = "/login";
    },
    [setActivePage]: (state, action) => {
      const {
        payload: { id, redirect },
      } = action;

      if (redirect) state.redirect = `/cms/page/${id}/blocks`;
    },
  },
});

export const { setRedirect } = navSlice.actions;
export default navSlice.reducer;
