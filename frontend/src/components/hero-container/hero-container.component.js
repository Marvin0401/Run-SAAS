import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { setDataItem } from "@redux/slices/blockData";

import HeroTemplate from "@components/hero-template/hero-template.component";
import {
  blockDataSelector,
  activePageSelector,
  homePageSelector,
} from "@redux/selectors/site";
import { PAGE_CATEGORIES } from "@constants";

const HeroContainer = ({ block }) => {
  const dispatch = useDispatch();

  const { sharedData: sharedDataId, data: uniqueDataId } = block;

  const page = useSelector((state) => activePageSelector({ state }));
  const homePage = useSelector((state) => homePageSelector({ state }));
  const isHome = page.id === homePage.id;

  const sharedBlockData = useSelector((state) =>
    blockDataSelector({ state, data: sharedDataId })
  );
  const uniqueBlockData = useSelector((state) =>
    blockDataSelector({ state, data: uniqueDataId })
  );

  let images = {};
  if (!isHome) {
    if (!uniqueBlockData.splitImage)
      images.splitImage = sharedBlockData.splitImage;
    if (!uniqueBlockData.fullImage)
      images.fullImage = sharedBlockData.fullImage;
    if (!uniqueBlockData.mobileImage)
      images.mobileImage = sharedBlockData.mobileImage;
  }

  const consolidatedBlockData = {
    ...sharedBlockData,
    ...uniqueBlockData,
    ...images,
  };

  const mainPages = useSelector(
    (state) =>
      state.site.pages.find(({ type }) => type === PAGE_CATEGORIES.MAIN_NAV)
        .children
  );
  const featuredPage = useSelector(
    (state) =>
      state.site.pages.find(({ type }) => type === PAGE_CATEGORIES.FEATURED_NAV)
        .children
  );

  useEffect(() => {
    const newData = {
      ...sharedBlockData,
      menuItems: mainPages.map((page) => ({
        title: page.name,
        pageId: page.id,
        slug: page.settings.slug,
        isHidden: page.isHidden,
        link: page.externalLink,
        children: page.children.map((child) => ({
          title: child.name,
          pageId: child.id,
          slug: child.settings.slug,
          isHidden: page.isHidden,
          link: page.externalLink,
        })),
      })),
      featuredPage:
        featuredPage?.length === 1
          ? {
              title: featuredPage[0].name,
              pageId: featuredPage[0].id,
              slug: featuredPage[0].settings.slug,
              isHidden: featuredPage[0].isHidden,
              link: featuredPage[0].externalLink,
            }
          : null,
    };

    dispatch(setDataItem(newData));
  }, [mainPages]);

  const setValue = (value) => {
    const updatedData = {
      ...sharedBlockData,
      ...value,
    };
    dispatch(setDataItem(updatedData));
  };

  return (
    <div>
      <HeroTemplate
        data={consolidatedBlockData}
        setValue={setValue}
        isHome={isHome}
      />
    </div>
  );
};

HeroContainer.propTypes = {
  block: PropTypes.shape(),
};

export default HeroContainer;
