/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSiteData } from "@redux/slices/site";
import { logout } from "@redux/slices/auth";
import clients, { thunkHandler } from "@services/api";
import { toast } from "react-toastify";

const initialState = {
  headlineFont: "",
  bodyFont: "",
  buttonFont: "",
  pinstripes: true,
  corners: "no", // 'rounded' | 'half_rounded'
  gfontsMeta: [],
  fontSets: [],
};

export const getFontSets = createAsyncThunk(
  "design/get-font-sets",
  (_, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "get",
        url: "api/sites/fonts/",
      }),
      thunkAPI
    );
    return response;
  }
);

export const addFontSet = createAsyncThunk(
  "design/add-font-set",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "post",
        url: "api/sites/upload/font/",
        data,
      }),
      thunkAPI
    );
    return response;
  }
);

export const updateFontSet = createAsyncThunk(
  "design/update-font-set",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "put",
        url: "api/sites/upload/font/",
        data,
      }),
      thunkAPI
    );
    return response;
  }
);

export const deleteFontSet = createAsyncThunk(
  "design/delete-font-set",
  ({ id }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "delete",
        url: `api/sites/delete/font/${id}/`,
      }),
      thunkAPI
    );
    return response.then((value) => {
      value.id = id;
      return value;
    });
  }
);

export const getGoogleFontsMeta = createAsyncThunk(
  "design/google-fonts",
  (_, thunkAPI) => {
    const response = thunkHandler(
      clients.gfonts.client({
        method: "get",
        url: "webfonts?key=AIzaSyDkbG5xmFCVFcYY1P4o2FOUk-d8Ppb9v8w",
      }),
      thunkAPI
    );
    return response;
  }
);

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    setHeadlineFont(state, action) {
      state.headlineFont = action.payload;
      state.bodyFont = action.payload.body[0];
      state.buttonFont = action.payload.button[0];
    },
    setBodyFont(state, action) {
      state.bodyFont = action.payload;
    },
    setButtonFont(state, action) {
      state.buttonFont = action.payload;
    },
    setPinstripes(state, action) {
      state.pinstripes = action.payload;
    },
    setCorners(state, action) {
      state.corners = action.payload;
    },
  },
  extraReducers: {
    [getSiteData.fulfilled]: (state, action) => {
      if (action.meta.arg?.overrideState) {
        if (action.payload.data[0].fonts) {
          state.headlineFont = action.payload.data[0].fonts.headlineFont;
          state.bodyFont = action.payload.data[0].fonts.bodyFont;
          state.buttonFont = action.payload.data[0].fonts.buttonFont;
        }
        if (action.payload?.data?.[0]?.pinstripes) {
          state.pinstripes = action.payload.data[0].pinstripes;
        }
        if (action.payload?.data?.[0]?.corners) {
          state.corners = action.payload.data[0].corners;
        }
      }
    },
    [getGoogleFontsMeta.fulfilled]: (state, action) => {
      state.gfontsMeta = action.payload.items.map((fontData) => {
        return { family: fontData.family };
      });
    },
    [getFontSets.fulfilled]: (state, action) => {
      state.fontSets = action.payload.fonts;
      state.headlineFont = action.payload.fonts[0];
      state.bodyFont = action.payload.fonts[0].body[0];
      state.buttonFont = action.payload.fonts[0].button[0];
    },
    [addFontSet.fulfilled]: (state, action) => {
      toast.success(action.payload.message);
      state.fontSets = [...state.fontSets, action.payload.response];
    },
    [updateFontSet.fulfilled]: (state, action) => {
      toast.success(action.payload.message);

      state.fontSets = state.fontSets.map((fontSet) =>
        fontSet.id === action.payload.response.id
          ? action.payload.response
          : fontSet
      );
    },
    [deleteFontSet.fulfilled]: (state, action) => {
      toast.success(action.payload.message);
      const id = action.payload.id;
      state.fontSets = state.fontSets.filter((fontset) => fontset.id !== id);
    },
    [logout]: () => initialState,
  },
});

export const {
  setHeadlineFont,
  setBodyFont,
  setButtonFont,
  setPinstripes,
  setCorners,
} = designSlice.actions;

export default designSlice.reducer;
