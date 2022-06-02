import React from "react";
import PropTypes from "prop-types";

import BlockConfigEndorsementsDefault from "@components/block-config-endorsements-default/block-config-endorsements-default.component";
import BlockConfigEndorsementsExtra from "@components/block-config-endorsements-extra/block-config-endorsements-extra.component";

const BlockConfigEndorsements = ({ block }) => {
  switch (block.variant) {
    case "DEFAULT":
      return <BlockConfigEndorsementsDefault block={block} />;
    case "EXTRA":
      return <BlockConfigEndorsementsExtra block={block} />;
    default:
      return null;
  }
};

BlockConfigEndorsements.propTypes = {
  block: PropTypes.shape(),
};

export default BlockConfigEndorsements;
