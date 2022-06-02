import React from "react";
import PropTypes from "prop-types";

import BlockEventsList from "@components/block-events-list/block-events-list.component";
import BlockEventsItem from "@components/block-events-item/block-events-item.component";
import { blockDataSelector } from "@helpers/blockData";

const BlockEventsContainer = ({ block, itemId, pageId }) => {

  const { data } = block;
  const blockData = blockDataSelector({ data });

  if (itemId)
    return (
      <BlockEventsItem
        blockData={blockData}
        itemId={itemId}
      />
    );
  else
    return (
      <BlockEventsList
        pageId={pageId}
        blockData={blockData}
      />
    );
};

BlockEventsContainer.propTypes = {
  block: PropTypes.object.isRequired,
  itemId: PropTypes.string,
  pageId: PropTypes.string,
};
export default BlockEventsContainer;
