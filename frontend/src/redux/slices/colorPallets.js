import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import clients, { thunkHandler } from "@services/api";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { getSiteData } from "@redux/slices/site";
import { colorPalettesDto } from "@helpers/theming";

const initialState = {
  status: "idle",
  categories: [],
  colorPallets: [],
  activePallet: {
    colors: [],
    title: "",
    blockTheme: {},
  },
  colorCategories: [],
  activePalletId: null,
  isShowPalletSidebar: false,
  selectedBlockTheme: null,
  scrapingStatus: "reset", // 'loading' | 'succeeded',
};

export const getColorPalettes = createAsyncThunk(
  "site/get-color-palettes",
  (_, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "get",
        url: `/api/palette/get-color-palettes/`,
      }),
      thunkAPI
    );

    return response;
  }
);

export const patchColorPalette = createAsyncThunk(
  "site/update-palettes",
  ({ data, id }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "put",
        url: `/api/palette/update-palettes/${id}/`,
        data,
      }),
      thunkAPI
    );

    return response;
  }
);

export const updateColor = createAsyncThunk(
  "site/update-color",
  ({ data, id }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "put",
        url: `/api/palette/update-color/${id}/`,
        data,
      }),
      thunkAPI
    );

    return response;
  }
);
export const updateColorOrder = createAsyncThunk(
  "site/update-color",
  ({ data, id }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "put",
        url: `/api/palette/move-color-order/${id}/`,
        data,
      }),
      thunkAPI
    );

    return response;
  }
);

export const createColorPalette = createAsyncThunk(
  "site/create-color-palette",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "post",
        url: "api/palette/create-color-palette/",
        data,
      }),
      thunkAPI
    );

    return response;
  }
);

export const colorPalletsSlice = createSlice({
  name: "colorPallets",
  initialState,
  reducers: {
    addColorPallet: (state, action) => {
      const { colorPallet, categoryId } = action.payload;

      const newColorPallet = {
        ...colorPallet,
        id: uuidv4(),
      };

      state.colorPallets.push(newColorPallet);

      const updatedCategories = cloneDeep(state.categories);

      const categoryIdx = updatedCategories.findIndex(
        (item) => item.id == categoryId
      );

      updatedCategories[categoryIdx].hiddenPattesIds.push(newColorPallet.id);
      updatedCategories[categoryIdx].palletsIds.push(newColorPallet.id);

      state.categories = updatedCategories;
    },
    updateColorPallet: (state, action) => {
      const updatedItem = action.payload;

      const updatedColorPallets = cloneDeep(state.colorPallets);

      const itemIdx = updatedColorPallets.findIndex(
        (item) => item.id === updatedItem.id
      );

      if (itemIdx > -1) {
        updatedColorPallets[itemIdx] = updatedItem;
      }

      if (state.activePallet.id === updatedItem.id) {
        state.activePallet = updatedItem;
      }

      state.colorPallets = updatedColorPallets;
    },
    updateCategory: (state, action) => {
      const updatedItem = action.payload;

      const updatedCategory = cloneDeep(state.categories);

      const itemIdx = updatedCategory.findIndex(
        (item) => item.id === updatedItem.id
      );

      if (itemIdx > -1) {
        updatedCategory[itemIdx] = updatedItem;
      }

      state.categories = updatedCategory;
    },
    updateColorPalletVisibility: (state, action) => {
      const { categoryId, itemId, isVisible } = action.payload;

      const updatedCategories = cloneDeep(state.categories);

      const categoryIdx = updatedCategories.findIndex(
        (item) => item.id === categoryId
      );

      let hidenItems = cloneDeep(
        updatedCategories[categoryIdx].hiddenPattesIds
      );

      if (!isVisible) {
        hidenItems = hidenItems.filter((item) => item !== itemId);
      } else {
        hidenItems.push(itemId);
      }

      updatedCategories[categoryIdx].hiddenPattesIds = hidenItems;

      state.categories = updatedCategories;
    },
    removeColorPalletFromCategory: (state, action) => {
      const { categoryId, itemId } = action.payload;

      const updatedCategories = cloneDeep(state.categories);

      const categoryIdx = updatedCategories.findIndex(
        (item) => item.id === categoryId
      );

      let palletsItems = cloneDeep(updatedCategories[categoryIdx].palletsIds);
      palletsItems = palletsItems.filter((item) => item !== itemId);

      let hidenItems = cloneDeep(
        updatedCategories[categoryIdx].hiddenPattesIds
      );
      hidenItems = palletsItems.filter((item) => item !== itemId);

      updatedCategories[categoryIdx].palletsIds = palletsItems;
      updatedCategories[categoryIdx].hiddenPattesIds = hidenItems;

      state.categories = updatedCategories;
    },
    toggleColorPalletCategory: (state, action) => {
      const { categoryId, itemId } = action.payload;

      let itemCount = state.categories.reduce((acc, category) => {
        if (category.palletsIds.includes(itemId)) {
          acc += 1;
        }

        return acc;
      }, 0);

      const updatedCategories = cloneDeep(state.categories);

      const categoryIdx = updatedCategories.findIndex(
        (item) => item.id === categoryId
      );

      let palletsItems = cloneDeep(updatedCategories[categoryIdx].palletsIds);

      if (palletsItems.includes(itemId) && itemCount !== 1) {
        palletsItems = palletsItems.filter((item) => item !== itemId);
      } else if (!palletsItems.includes(itemId)) {
        palletsItems.push(itemId);
      }

      let hidenItems = cloneDeep(
        updatedCategories[categoryIdx].hiddenPattesIds
      );

      if (hidenItems.includes(itemId) && itemCount !== 1) {
        hidenItems = hidenItems.filter((item) => item !== itemId);
      }

      updatedCategories[categoryIdx].palletsIds = palletsItems;
      updatedCategories[categoryIdx].hiddenPattesIds = hidenItems;

      state.categories = updatedCategories;
    },
    setActivePallet: (state, action) => {
      state.activePallet = action.payload;
    },
    setIsShowPalletSidebar: (state, action) => {
      state.isShowPalletSidebar = action.payload;
    },
    closeResetPalletSidebar: (state) => {
      state.activePallet = state.colorPallets.find(
        (c) => c.id == state.activePallet.id
      );
      state.isShowPalletSidebar = false;
    },
    setSelectedBlockTheme: (state, action) => {
      const cssTheme = cloneDeep(state.activePallet?.blockTheme);
      const newBlockTheme = cloneDeep(action.payload.theme);
      state.selectedBlockTheme = action.payload;

      const blockTheme = Object.keys(newBlockTheme).reduce((acc, item) => {
        if (cssTheme && cssTheme[item]) {
          acc[item] = cssTheme[item];
        } else {
          acc[item] = newBlockTheme[item];
        }

        return acc;
      }, {});

      state.selectedBlockTheme.theme = blockTheme;
    },
    updateSelectedBlockTheme: (state, action) => {
      state.selectedBlockTheme = action.payload;
    },
    setScrapingStatus: (state, action) => {
      state.scrapingStatus = action.payload;
    },
    mergePalletCssTheme: (state, action) => {
      const cssTheme = cloneDeep(state.activePallet.blockTheme);
      const updatedCss = { ...cssTheme, ...action.payload };

      state.activePallet.blockTheme = updatedCss;
    },
  },
  extraReducers: {
    [getSiteData.fulfilled]: (state, action) => {
      if (action.meta.arg?.overrideState) {
        const activePalletId = action.payload.data[0]?.activePalletId;
        state.activePalletId = activePalletId;
      }
    },
    [getColorPalettes.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const activePalletId = state.activePalletId;

      const { defaultPallet, categories, colorPallets } = colorPalettesDto(
        action.payload
      );

      state.categories = categories;
      state.colorPallets = colorPallets;
      let activePallet;

      if (activePalletId) {
        activePallet = colorPallets.find((c) => c.id == activePalletId);
      }

      if (activePallet) {
        state.activePallet = activePallet;
      } else {
        state.activePallet = defaultPallet;
      }
    },
  },
});

export const {
  addColorPallet,
  updateColorPallet,
  updateCategory,
  updateColorPalletVisibility,
  removeColorPalletFromCategory,
  toggleColorPalletCategory,
  setActivePallet,
  setIsShowPalletSidebar,
  setSelectedBlockTheme,
  setScrapingStatus,
  mergePalletCssTheme,
  updateSelectedBlockTheme,
  closeResetPalletSidebar,
} = colorPalletsSlice.actions;

export default colorPalletsSlice.reducer;
