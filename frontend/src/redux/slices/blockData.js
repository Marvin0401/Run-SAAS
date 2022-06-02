import { createSlice } from "@reduxjs/toolkit";

import cloneDeep from "lodash.clonedeep";

import { addBlock, getSiteData } from "@redux/slices/site";
import { logout } from "@redux/slices/auth";

import { BLOCK_DATA } from "@config/blocks";
import { INITIAL_DATA } from "@config/pages";
import { DATA_TYPE } from "@constants";

const initialState = {
  data: process.env.REACT_APP_DATA_SOURCE === "LOCAL" ? INITIAL_DATA : null,
};

export const blockDataSlice = createSlice({
  name: "blockData",
  initialState,
  reducers: {
    setDataItem: (state, action) => {
      const { payload: updatedItem } = action;
      const data = cloneDeep(state.data);
      const updatedData = data.filter(({ id }) => id !== updatedItem.id);

      updatedData.push(updatedItem);

      state.data = updatedData;
    },
    deleteBlock: (state, action) => {
      const { payload: idToDelete } = action;
      const data = cloneDeep(state.data);
      const updatedData = data.filter(({ id }) => id !== idToDelete);

      state.data = updatedData;
    },
    addBlockData: (state, action) => {
      const { block } = action.payload;

      const updatedData = [...state.data];

      if (block.data) {
        updatedData.push({
          blockType: block.type,
          id: block.data,
          type: DATA_TYPE.UNIQUE,
          ...BLOCK_DATA[block.type],
        });
      }

      state.data = updatedData;
    },
  },
  extraReducers: {
    [addBlock]: (state, action) => {
      const { block } = action.payload;

      const updatedData = [...state.data];

      if (block.data) {
        updatedData.push({
          blockType: block.type,
          id: block.data,
          type: DATA_TYPE.UNIQUE,
          ...BLOCK_DATA[block.type],
        });
      }

      if (block.sharedData) {
        updatedData.push({
          blockType: block.type,
          id: block.sharedData,
          type: DATA_TYPE.SHARED,
          ...BLOCK_DATA[block.type],
        });
      }

      state.data = updatedData;
    },
    [getSiteData.fulfilled]: (state, action) => {
      if (action.meta.arg?.overrideState) {
        state.data = action.payload.data[0].blockData.data;
      }
    },
    [logout]: () => initialState,
  },
});

export const { setDataItem, deleteBlock, addBlockData } =
  blockDataSlice.actions;
export default blockDataSlice.reducer;
