import findDeep from "deepdash/findDeep";
import { PAGE_CATEGORIES } from "../../constants";

export const activePageSelector = ({ state }) => {
  const activePageId = state.site.activePage?.id;

  if (!activePageId) return null;

  const { value: page } = findDeep(
    state.site.pages,
    ({ id }) => activePageId === id,
    {
      childrenPath: ["children"],
    }
  );

  return page;
};

export const homePageSelector = ({ state }) => {
  const { value: page } = findDeep(
    state.site.pages,
    ({ type }) => type === PAGE_CATEGORIES.HOME,
    {
      childrenPath: ["children"],
    }
  );

  return page.children[0];
};

export const pageWithBlockSelector = ({ state, variant, type }) => {
  const { parent: blocksContainer } = findDeep(
    state.site.pages,
    ({ type: compareType, variant: compareVariant }) =>
      type === compareType && variant === compareVariant,
    {
      childrenPath: ["blocks", "children"],
    }
  );

  const { parent: page } = findDeep(
    state.site.pages,
    ({ id }) => id === blocksContainer.id,
    {
      childrenPath: ["blocks", "children"],
    }
  );

  return page;
};

export const containerOfPageWithBlockSelector = ({ state, variant, type }) => {
  const { parent: blocksContainer } = findDeep(
    state.site.pages,
    ({ type: compareType, variant: compareVariant }) =>
      type === compareType && variant === compareVariant,
    {
      childrenPath: ["blocks", "children"],
    }
  );

  const { parent: page } = findDeep(
    state.site.pages,
    ({ id }) => id === blocksContainer.id,
    {
      childrenPath: ["blocks", "children"],
    }
  );

  const { parent: container } = findDeep(
    state.site.pages,
    ({ id }) => id === page.id,
    {
      childrenPath: ["children"],
    }
  );

  return container;
};

export const pageBlocksSelector = ({ state, pageId }) => {
  const { value: page } = findDeep(
    state.site.pages,
    ({ id: pId }) => pageId === pId,
    {
      childrenPath: "children",
    }
  );

  return page.blocks;
};

export const blockSelector = ({ state, blockId }) => {
  const { value: block } = findDeep(
    state.site.pages,
    ({ id }) => blockId === id,
    {
      childrenPath: ["children", "blocks"],
    }
  );

  return block;
};

export const blockDataSelector = ({ state, data: dataId }) => {
  const blockData = state.blockData.data;

  const dataToReturn = blockData.find(({ id }) => id === dataId);

  return dataToReturn;
};

export const blockThemSelector = ({ state, blockId }) => {
  const { value: block } = findDeep(
    state.site.pages,
    ({ id }) => blockId === id,
    {
      childrenPath: ["children", "blocks"],
    }
  );

  return block?.theme;
};

export const uniqueBlockDataSelector = ({ state, data }) => {
  let blockData = {};

  state.blockData.data.some((dataItem) => {
    if (dataItem.id === data[0]) {
      blockData = dataItem;
      return true;
    }
  });
  return blockData;
};

export const isDefaultPageSelector = ({ state, pageId }) => {
  const { value: page } = findDeep(
    state.site.pages,
    ({ id: pId }) => pageId === pId,
    {
      childrenPath: "children",
    }
  );

  return page.isDefault;
};

export const saveDataSelector = (state) => {
  // eslint-disable-next-line no-unused-vars
  const { activePage, status, ...rest } = state.site;
  const { activePallet } = state.colorPallets;

  const { headlineFont, bodyFont, buttonFont, pinstripes, corners } =
    state.design;

  const data = {
    activePalletId: activePallet?.id,
    site: rest,
    fonts: {
      headlineFont,
      bodyFont,
      buttonFont,
    },
    blockData: { ...state.blockData },
    pinstripes,
    corners,
    blockTheme: activePallet?.blockTheme || {},
    colors: activePallet?.colors || [],
  };

  return data;
};

export const pageSelector = ({ state, pageId }) => {
  if (!pageId) return null;

  const { value: page } = findDeep(
    state.site.pages,
    ({ id: pId }) => pageId === pId,
    {
      childrenPath: "children",
    }
  );

  return page;
};
