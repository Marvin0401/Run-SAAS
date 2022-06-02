import React from "react";
import PropTypes from "prop-types";
import { BLOCK_VARIANT } from "@constants/constants";

import LandingPopupBlock from "@components/landing-popup-block/landing-popup-block.component";
import DonateBlock from "@components/donate-block/donate-block.component";

const LandingFilter = ({ block }) => {
  switch (block.variant) {
    case BLOCK_VARIANT.LOCKED:
      return <LandingPopupBlock block={block} key={block.id} />;
    case BLOCK_VARIANT.EXTRA:
      return <DonateBlock block={block} key={block.id} />;
    default:
      return null;
  }
};

LandingFilter.propTypes = {
  block: PropTypes.shape(),
};

export default LandingFilter;
