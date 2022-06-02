import React from "react";
import PropTypes from "prop-types";

import { BLOCK_VARIANT } from "@constants";

import EndorsersContainer from "@components/endorsers-container/endorsers-container.component";
import EndorsersExtraContainer from "@components/endorsers-extra-container/endorsers-extra-container.component";

const EndorsementsFilter = ({ block, pageId }) => {
  switch (block.variant) {
    case BLOCK_VARIANT.DEFAULT:
      return <EndorsersContainer block={block} pageId={pageId} />;
    case BLOCK_VARIANT.EXTRA:
      return <EndorsersExtraContainer block={block} pageId={pageId} />;
    default:
      return null;
  }
};

EndorsementsFilter.propTypes = {
  block: PropTypes.shape(),
  pageId: PropTypes.string.isRequired,
};

export default EndorsementsFilter;
