const Data = require("../../content/Data.json");

// const blockThemeSelector = ({ blockType }) => {
//   const blockThemesList = Data.blockData.theme;
//   const themeTheme = blockThemesList.find((item) => item.type === blockType);
//   return themeTheme?.theme;
// };

// exports.blockThemeSelector = blockThemeSelector;

const designSelector = () => {
  return Data;
};

const activePaletteSelector = () => {
  return Data.colorPallets.find(palette => palette.id === Data.activePalletId);
};

const colorSelector = () => {
  return Data.colors || {};
}


const globalStylesSelector = () => {
  /* const blockThemesList = Data.blockData.theme;
  // return {};
  const styles = blockThemesList.reduce((acc, item) => {
    if (!acc) {
      acc = {};
    }

    acc = Object.assign(acc, item.theme);
    return acc;
  }, {});

  return styles; */
  
  return Data?.blockTheme || {};

};
exports.designSelector = designSelector;
exports.colorSelector = colorSelector;
exports.activePaletteSelector = activePaletteSelector;
exports.globalStylesSelector = globalStylesSelector;