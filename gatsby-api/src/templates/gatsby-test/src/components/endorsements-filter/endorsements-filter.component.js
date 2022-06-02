import React from "react";
import PropTypes from "prop-types";

import { BLOCK_VARIANT } from "@constants/constants";

import EndorsersContainer from "@components/endorsers-container/endorsers-container.component";
import EndorsersExtraContainer from "@components/endorsers-extra-container/endorsers-extra-container.component";

const EndorsementsFilter = ({ block }) => {
  switch (block.variant) {
    case BLOCK_VARIANT.DEFAULT:
      return <EndorsersContainer block={block} />;
    case BLOCK_VARIANT.EXTRA:
      return <EndorsersExtraContainer block={block} />;
    default:
      return null;
  }
};

EndorsementsFilter.propTypes = {
  block: PropTypes.shape(),
};

export default EndorsementsFilter;
