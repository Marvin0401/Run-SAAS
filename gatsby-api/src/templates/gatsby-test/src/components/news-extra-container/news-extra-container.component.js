import React from "react";
import PropTypes from "prop-types";
import { blockDataSelector, slugSelector } from "@helpers/blockData";
import { navigate } from "gatsby"

import NewsListExtraBlock from "@components/news-list-extra-block/news-list-extra-block.component";

const NewsExtraContainer = ({ block }) => {
  const { data, sharedData } = block;

  const blockData = blockDataSelector({ data });
  const sharedBlockData = blockDataSelector({ data: sharedData });

  const pageSlug = slugSelector({pageId: sharedBlockData.pageId});

  // eslint-disable-next-line no-unused-vars
  const handleNavigateToItem = (itemId) => {
    const item = sharedBlockData.items.find(
      ({ id: compareItemId }) => compareItemId === itemId
    );

    if (item?.link) {
      window.open(item?.link, "_blank").focus();
    } else {
      navigate(`/${pageSlug}/${itemId}`);
    }
  };

  return (
    <>
      <NewsListExtraBlock
        headline={blockData.headline}
        itemList={sharedBlockData.items}
        onReadMorePress={handleNavigateToItem}
      />
    </>
  );
};

NewsExtraContainer.propTypes = {
  block: PropTypes.object.isRequired,
  pageId: PropTypes.string,
  activeItemId: PropTypes.string,
};

export default NewsExtraContainer;
