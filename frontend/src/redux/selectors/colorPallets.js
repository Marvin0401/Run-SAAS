export const categoryColorPalletsSelector = ({ state, categoryId }) => {
  const { colorPallets } = state.colorPallets;

  const categoryPallets = colorPallets.filter((item) =>
    item.categories.includes(categoryId)
  );

  return categoryPallets || [];
};

export const activeCategoryColorPalletsSelector = ({ state, categoryId }) => {
  const activePallets = categoryColorPalletsSelector({
    state,
    categoryId,
  }).filter((c) => c.is_active);

  return activePallets;
};

export const globalStylesSelector = (state) => {
  const styles = state?.colorPallets.activePallet?.blockTheme;
  return styles;
};
