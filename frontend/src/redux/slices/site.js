/* eslint no-unused-vars: 0 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import clients, { thunkHandler } from "@services/api";
import { login, register, logout } from "@redux/slices/auth";

import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";

import { PAGE_CATEGORIES, BLOCK_VARIANT, BLOCK_TYPES } from "@constants";

import findDeep from "deepdash/findDeep";
import cloneDeep from "lodash.clonedeep";
import { INITIAL_PAGES, NEW_PAGE } from "@config/pages";
import PreviewToast from "@components/preview-toast/preview-toast.component";
import { useNotificationPopUp } from "@components/notification-pop-up/notification-pop-up.component";

const initialState = {
  activePage: null,
  pages: process.env.REACT_APP_DATA_SOURCE === "LOCAL" ? INITIAL_PAGES : null,
  status: "idle",
  settings: null,
  buildInProgress: false,
};

const getHeaderFooterSharedId = (pages) => {
  let sharedHeroDataId, sharedFooterDataId;

  const heroResult = findDeep(
    pages,
    ({ type, sharedData }) => type === BLOCK_TYPES.HERO && sharedData,
    {
      childrenPath: ["children", "blocks"],
    }
  );

  if (heroResult?.value.sharedData) {
    sharedHeroDataId = heroResult.value.sharedData;
  }
  const footerResult = findDeep(
    pages,
    ({ type, data }) => type === BLOCK_TYPES.FOOTER && data,
    {
      childrenPath: ["children", "blocks"],
    }
  );

  if (footerResult?.value.data) {
    sharedFooterDataId = footerResult.value.data;
  }

  return [sharedHeroDataId, sharedFooterDataId];
};

export const getSite = createAsyncThunk("site/get", (_, thunkAPI) => {
  const response = thunkHandler(
    clients.default.client({
      method: "get",
      url: "/api/sites/",
    }),
    thunkAPI
  );

  return response;
});

export const getSiteData = createAsyncThunk(
  "site/get-data",
  ({ siteId, isLive }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "get",
        url: `/api/sites/get/${siteId}${!isLive ? "-draft" : ""}/`,
      }),
      thunkAPI
    );

    return response;
  }
);

export const updateSiteSettings = createAsyncThunk(
  "site/put",
  ({ data, id }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "put",
        url: `api/sites/${id}/`,
        data,
      }),
      thunkAPI
    );

    return response;
  }
);

export const uploadSSLCert = createAsyncThunk(
  "site/cert",
  ({ data, id }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "post",
        url: `api/sites/update-ssl/${id}/`,
        data,
      }),
      thunkAPI
    );

    return response;
  }
);

export const buildSite = createAsyncThunk(
  "site/build",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.gatsby.client({
        method: "post",
        url: "buildWebsite",
        data,
      }),
      thunkAPI
    );

    return response;
  }
);

export const publishSite = createAsyncThunk(
  "site/publish",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.gatsby.client({
        method: "post",
        url: "buildWebsite",
        data,
      }),
      thunkAPI
    );

    return response;
  }
);

export const saveSite = createAsyncThunk(
  "site/save",
  ({ data, isLive }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "post",
        url: "api/sites/upload/",
        data: {
          ...data,
          id: isLive ? data.id : data.id + "-draft",
        },
      }),
      thunkAPI
    );

    return response;
  }
);

export const siteSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    addBlock: (state, action) => {
      const { block, comparisonId } = action.payload;
      const isCallout = block.variant === BLOCK_VARIANT.CALLOUT;
      const isExtra = block.variant === BLOCK_VARIANT.EXTRA;

      const updatedPages = cloneDeep(state.pages);
      const { value: filteredBlocks } = findDeep(
        updatedPages,
        ({ id }) => id === comparisonId,
        {
          childrenPath: ["children", "blocks"],
        }
      );

      /** Check to see if default block shared data needs to be added to extra block */
      if (isExtra && !block.sharedData) {
        const result = findDeep(
          updatedPages,
          ({ type, sharedData }) => type === block.type && sharedData,
          {
            childrenPath: ["children", "blocks"],
          }
        );

        if (result?.value.sharedData) {
          block.sharedData = result.value.sharedData;
        }
      }

      if (isCallout) {
        filteredBlocks.callout = block;
      } else {
        filteredBlocks.children.push({
          ...block,
        });
      }
      state.pages = updatedPages;
    },
    addPage: (state, action) => {
      const { heroDataId } = action.payload;
      const updatedPages = cloneDeep(state.pages);

      const draftItem = updatedPages.find(
        ({ type }) => type === PAGE_CATEGORIES.DRAFT
      );

      let [sharedHeroDataId, sharedFooterDataId] =
        getHeaderFooterSharedId(updatedPages);

      draftItem.children.push({
        ...NEW_PAGE(heroDataId, sharedHeroDataId, sharedFooterDataId),
        id: uuidv4(),
      });

      state.pages = updatedPages;
    },
    deleteBlock: (state, action) => {
      const { payload: id } = action;

      const updatedPages = cloneDeep(state.pages);

      const { key, parent } = findDeep(
        updatedPages,
        ({ id: childId }) => childId === id,
        {
          childrenPath: ["children", "blocks"],
        }
      );

      parent.children.splice(key, 1);

      state.pages = updatedPages;
    },
    deletePage: (state, action) => {
      const { payload: id } = action;

      const updatedPages = cloneDeep(state.pages);

      const { parent } = findDeep(
        updatedPages,
        ({ id: childId }) => childId === id,
        { childrenPath: "children" }
      );

      parent.children = parent.children.filter(
        ({ id: childId }) => childId !== id
      );

      state.pages = updatedPages;

      /** Set the active page to "home" if the active page is deleted */
      if (state.activePage.id === id) {
        state.activePage = state.pages.find(
          ({ type }) => type === PAGE_CATEGORIES.HOME
        ).children[0];
      }
    },
    duplicatePage: (state, action) => {
      const { id, heroDataId } = action.payload;

      const updatedPages = cloneDeep(state.pages);

      const {
        key: pageToDuplicateIndex,
        parent,
        value: pageToDuplicate,
      } = findDeep(updatedPages, ({ id: childId }) => childId === id, {
        childrenPath: "children",
      });

      let [sharedHeroDataId, sharedFooterDataId] =
        getHeaderFooterSharedId(updatedPages);

      const duplicatePage = {
        ...NEW_PAGE(heroDataId, sharedHeroDataId, sharedFooterDataId),
        id: uuidv4(),
        name: `${pageToDuplicate.name} - Copy`,
      };

      parent.children.splice(pageToDuplicateIndex + 1, 0, duplicatePage);

      state.pages = updatedPages;
    },
    hidePage: (state, action) => {
      const { payload: id } = action;

      const updatedPages = cloneDeep(state.pages);

      const { value: pageToHide } = findDeep(
        updatedPages,
        ({ id: childId }) => childId === id,
        { childrenPath: "children" }
      );

      pageToHide.isHidden = !pageToHide.isHidden;

      state.pages = updatedPages;
    },
    setActivePage: (state, action) => {
      const {
        payload: { id },
      } = action;

      const { value: page } = findDeep(
        state.pages,
        ({ id: childId }) => childId === id,
        { childrenPath: "children" }
      );

      state.activePage = page;
    },
    setBlock: (state, action) => {
      const { payload: updatedItem } = action;
      const updatedPages = cloneDeep(state.pages);

      let { value: block } = findDeep(
        updatedPages,
        ({ id: childId }) => childId === updatedItem.id,
        {
          childrenPath: ["children", "blocks"],
        }
      );

      Object.assign(block, updatedItem);
      state.pages = updatedPages;
    },
    updatePage: (state, action) => {
      const { payload: updatedItem } = action;
      const updatedPages = cloneDeep(state.pages);

      let { value: page } = findDeep(
        updatedPages,
        ({ id: childId }) => childId === updatedItem.id,
        {
          childrenPath: ["children"],
        }
      );

      Object.assign(page, updatedItem);
      state.pages = updatedPages;
    },
    setPageBlocks: (state, action) => {
      const { blocks, pageId } = action.payload;

      const updatedPages = cloneDeep(state.pages);
      const { value: page } = findDeep(
        updatedPages,
        ({ id: childId }) => childId === pageId,
        {
          childrenPath: ["children"],
        }
      );
      page.blocks = blocks;

      state.pages = updatedPages;
    },
    setPages: (state, action) => {
      const { payload } = action;

      state.pages = payload;
    },
    setStatus: (state, payload) => {
      state.status = payload;
    },
  },
  extraReducers: {
    [buildSite.fulfilled]: (state) => {
      const url = `https://${state.settings.id}.designedtorun.com`;
      toast(<PreviewToast url={url} />);
      state.status = "build site failed";
      state.buildInProgress = false;
      window.open(url, "_blank");
    },
    [buildSite.pending]: (state) => {
      state.status = "publishing site";
      state.buildInProgress = true;
    },
    [publishSite.pending]: (state) => {
      state.status = "publishing site";
      state.buildInProgress = true;
    },
    [publishSite.fulfilled]: (state) => {
      state.status = "published";
      state.buildInProgress = false;
    },
    [buildSite.rejected]: (state) => {
      state.status = "build site failed";
      state.buildInProgress = false;
      toast.error("Site build failed. Please contact site administrator.");
    },
    [publishSite.rejected]: (state) => {
      state.status = "publishing site failed";
      state.buildInProgress = false;
      toast.error("Site build failed. Please contact site administrator.");
    },
    [getSite.pending]: (state) => {
      state.status = "loading";
    },
    [getSite.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.settings = action.payload.sites[0];
    },
    [getSite.rejected]: (state) => {
      state.status = "failed";
    },
    [getSiteData.pending]: (state) => {
      state.status = "loading";
    },
    [getSiteData.fulfilled]: (state, action) => {
      state.status = "succeeded";
      if (action.meta.arg?.overrideState) {
        state.pages = action.payload.data[0].site.pages;
      }
    },
    [getSiteData.rejected]: (state) => {
      state.status = "failed";
    },
    [login.fulfilled]: (state, action) => {
      const { site } = action.payload;
      state.settings = site;
    },
    [register.fulfilled]: (state, action) => {
      const { site } = action.payload;
      state.settings = site;
    },
    [saveSite.pending]: (state) => {
      state.status = "loading";
    },
    [saveSite.fulfilled]: (state) => {
      state.status = "succeeded";
    },
    [saveSite.rejected]: (state) => {
      state.status = "failed";
    },
    [updateSiteSettings.pending]: (state) => {
      state.status = "loading";
    },
    [updateSiteSettings.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.settings = action.payload;

      toast.success("👍 Site updated");
    },
    [updateSiteSettings.rejected]: (state) => {
      state.status = "failed";
    },
    [uploadSSLCert.pending]: (state) => {
      state.status = "loading";
    },
    [uploadSSLCert.fulfilled]: (state) => {
      state.status = "succeeded";

      toast.success("🔐 SSL Certificate successfully uploaded");
    },
    [uploadSSLCert.rejected]: (state) => {
      state.status = "failed";
    },
    [logout]: () => initialState,
  },
});

export const {
  addBlock,
  addPage,
  deleteBlock,
  deletePage,
  duplicatePage,
  hidePage,
  setActivePage,
  setBlock,
  setPageBlocks,
  setPages,
  updatePage,
  setStatus,
} = siteSlice.actions;

export default siteSlice.reducer;
