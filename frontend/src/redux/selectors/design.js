import mapDeep from "deepdash/mapDeep";

export const blockThemeSelector = ({ state, blockType }) => {
  const blockThemesList = state.design.blockThemes;
  const themeTheme = blockThemesList?.find((item) => item.type === blockType);
  return themeTheme?.theme;
};

export const activePageThemeSelector = (state) => {
  const activePageBlocks = state.site.activePage.blocks || [];

  let activePageBlocksTypes = mapDeep(activePageBlocks, ({ type }) => type, {
    childrenPath: ["children"],
  });

  activePageBlocksTypes = Array.from(new Set(activePageBlocksTypes));

  const activePageBlocksThemes = state.design.blockThemes?.filter((item) =>
    activePageBlocksTypes?.includes(item.type)
  );

  return activePageBlocksThemes || [];
};
