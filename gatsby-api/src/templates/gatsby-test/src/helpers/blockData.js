const { PAGE_CATEGORIES } = require("../constants/constants.js");

const Data = require("../../content/Data.json");

const { BLOCK_TYPES, DATA_TYPE } = require("../constants/constants");

const blockDataSelector = ({ data: dataId }) => {
  const blockData = Data.blockData.data;

  const dataToReturn = blockData.find(({ id }) => id === dataId);

  return dataToReturn;
};
exports.blockDataSelector = blockDataSelector;

const heroBlockData = Data.blockData.data.find(({type, blockType}) => type === DATA_TYPE.SHARED && blockType === BLOCK_TYPES.HERO);

const slugSelector = ({ pageId }) => {
  if (!heroBlockData.menuItems) return undefined;

  const blockData = heroBlockData.menuItems;

  let item;

  blockData.forEach(blockItem => {
    if (blockItem.pageId === pageId) {
      item = blockItem;
      return;
    } else if(blockItem.children.length) {
      const result = blockItem.children.find(nestedItem => nestedItem.pageId === pageId)
      if(result) {
        item = result;
        return;
      }
    }
  })
  if (!item) {
    // check if hidden
    Data.site.pages.forEach(pageList => {
      if (pageList.type === PAGE_CATEGORIES.HIDDEN) {
        const result = pageList.children.find(page => page.id === pageId);
        item = result && result.settings;
        return;
      }
    });
  }
  return item.slug;
};
exports.slugSelector = slugSelector;