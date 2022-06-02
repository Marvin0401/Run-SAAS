import React from "react";
import PropTypes from "prop-types";

import IssuesBlock from "@components/issues-block/issues-block.component";
import IssuesPageContainer from "@components/issues-page-container/issues-page-container.component";

import { BLOCK_VARIANT } from "@constants/";

const IssuesFilter = ({ block, pageId, itemId }) => {
  switch (block.variant) {
    case BLOCK_VARIANT.DEFAULT:
      return (
        <IssuesPageContainer
          block={block}
          pageId={pageId}
          activeItemId={itemId}
        />
      );
    case BLOCK_VARIANT.EXTRA:
      return <IssuesBlock block={block} key={block.id} />;
    default:
      return null;
  }
};

IssuesFilter.propTypes = {
  block: PropTypes.shape(),
  pageId: PropTypes.string,
  itemId: PropTypes.string,
};

export default IssuesFilter;
