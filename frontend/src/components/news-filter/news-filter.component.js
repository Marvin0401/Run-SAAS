import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { BLOCK_VARIANT } from "@constants";

import NewsPageContainer from "@components/news-page-container/news-page-container.component";
import NewsExtraContainer from "@components/news-extra-container/news-extra-container.component";

const NewsFilter = ({ block, pageId }) => {
  const matchParams = useRouteMatch(
    "/cms/page/:pageId/block/:blockId/:itemId?"
  );

  const activeItemId = useMemo(
    () => matchParams?.params?.itemId,
    [matchParams]
  );

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
};

export default NewsFilter;
