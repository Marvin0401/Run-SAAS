import React from "react";
import PropTypes from "prop-types";
import { BLOCK_VARIANT } from "@constants/constants";

import NewsPageContainer from "@components/news-page-container/news-page-container.component";
import NewsExtraContainer from "@components/news-extra-container/news-extra-container.component";

const NewsFilter = ({ block, pageId, activeItemId }) => {

  switch (block.variant) {
    case BLOCK_VARIANT.DEFAULT:
      return (
        <NewsPageContainer
          block={block}
          pageId={pageId}
          activeItemId={activeItemId}
        />
      );
    case BLOCK_VARIANT.EXTRA:
      return (
        <NewsExtraContainer
          block={block}
          pageId={pageId}
          activeItemId={activeItemId}
        />
      );
    default:
      return null;
  }
};

NewsFilter.propTypes = {
  block: PropTypes.shape(),
  pageId: PropTypes.string,
  activeItemId: PropTypes.string,
};

export default NewsFilter;
