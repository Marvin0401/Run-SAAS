import camelCase from "lodash.camelcase";
import cloneDeep from "lodash.clonedeep";

const emptyPallet = {
  colors: [],
  title: "color palette",
  blockTheme: {},
  id: "",
  color_category_title: "Yellow",
};

const cssToJs = (cssObj) => {
  const jsStyles = {};

  for (const [key, val] of Object.entries(cssObj)) {
    jsStyles[camelCase(key)] = val;
  }

  return jsStyles;
};

export const parseCss = (elemClassName, theme) => {
  let styles = {};

  if (!theme) {
    return styles;
  }

  Object.keys(theme).forEach((cssClass) => {
    const rawClassName = cssClass.substring(1);

    if (elemClassName.includes(rawClassName)) {
      styles = cssToJs(theme[cssClass]);
    }
  });

  return styles;
};

export const colorPalettesDto = (palletsResp) => {
  const colorPallets = [];

  const setPallets = (palettes, catId) => {
    palettes.forEach((catPItem) => {
      const savedPaletteIdx = colorPallets.findIndex(
        (item) => item.id == catPItem.id
      );

      if (savedPaletteIdx > -1) {
        colorPallets[savedPaletteIdx] = {
          ...catPItem,
          categories: [...colorPallets[savedPaletteIdx].categories, catId],
        };
      } else {
        colorPallets.push({
          ...catPItem,
          categories: [catId],
        });
      }
    });
  };

  const categories = palletsResp.color_categories.map((category) => {
    const categoryPalettes = cloneDeep(category.palettes);
    setPallets(categoryPalettes, category.id);

    delete category.palettes;
    return category;
  });

  categories.sort((c) => c.order * -1);

  let defaultPallet = colorPallets.find((c) =>
    c.title.toLowerCase().includes("default")
  );

  if (!defaultPallet) {
    defaultPallet = colorPallets[0] || emptyPallet;
  }

  return {
    categories,
    colorPallets,
    defaultPallet,
  };
};
