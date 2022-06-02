import React from "react";
import PropTypes from "prop-types";

import BlockConfigLandingPopup from "@components/block-config-landing-popup/block-config-landing-popup.component";
import BlockConfigDonate from "@components/block-config-donate/block-config-donate.component";

import { BLOCK_VARIANT } from "@constants/";

const BlockConfigLanding = ({ block }) => {
  switch (block.variant) {
    case BLOCK_VARIANT.LOCKED:
      return <BlockConfigLandingPopup block={block} />;
    case BLOCK_VARIANT.EXTRA:
      return <BlockConfigDonate block={block} />;
    default:
      return null;
  }
};

BlockConfigLanding.propTypes = {
  block: PropTypes.shape(),
};

export default BlockConfigLanding;
