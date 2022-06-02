import Data from "@content/Data.json";
import findDeep from "deepdash/findDeep";
import { PAGE_CATEGORIES } from "@constants/constants";

export const siteSelector = () => {
  return Data.site.settings;
};

export const homePageSelector = () => {
  const { value: page } = findDeep(
    Data.site.pages,
    ({ type }) => type === PAGE_CATEGORIES.HOME,
    {
      childrenPath: ["children"],
    }
  );

  return page.children[0];
};

export const containerOfPageWithBlockSelector = ({ variant, type }) => {

  const { parent: blocksContainer } = findDeep(
    Data.site.pages,
    ({ type: compareType, variant: compareVariant }) =>
      type === compareType && variant === compareVariant,
    {
      childrenPath: ["blocks", "children"],
    }
  );

  const { parent: page } = findDeep(
    Data.site.pages,
    ({ id }) => id === blocksContainer.id,
    {
      childrenPath: ["blocks", "children"],
    }
  );

  const { parent: container } = findDeep(
    Data.site.pages,
    ({ id }) => id === page.id,
    {
      childrenPath: ["children"],
    }
  );

  return container;
};
