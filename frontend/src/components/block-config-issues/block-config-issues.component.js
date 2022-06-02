import React from "react";
import PropTypes from "prop-types";

import BlockConfigIssueDefault from "@components/block-config-issue-default/block-config-issue-default.component";
import CustomBlockFilter from "@components/custom-block-filter/custom-block-filter.component";

import { DATA_TYPE } from "@constants/";

const BlockConfigIssues = ({ block }) => {
  switch (block.variant) {
    case "DEFAULT":
      return <BlockConfigIssueDefault block={block} />;
    case "EXTRA":
      return (
        <CustomBlockFilter
          block={block}
          dataKeyPath={["items"]}
          dataType={DATA_TYPE.SHARED}
        />
      );
    default:
      return null;
  }
};

BlockConfigIssues.propTypes = {
  block: PropTypes.shape(),
};

export default BlockConfigIssues;
