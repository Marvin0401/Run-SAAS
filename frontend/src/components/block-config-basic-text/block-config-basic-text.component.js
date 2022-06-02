import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addBlock, setBlock } from "@redux/slices/site";
import { deleteBlock } from "@redux/slices/blockData";

import CalloutBlock from "@components/callout-block/callout-block.component";

const BlockConfigBasicText = ({ block }) => {
  const dispatch = useDispatch();

  const handleOnChange = (data, isNone) => {
    // remove the existing callout block data
    if (block.callout) {
      dispatch(deleteBlock(block.callout.data));
    }
    return isNone
      ? dispatch(setBlock({ ...block, callout: null }))
      : dispatch(
          addBlock({
            block:
              block.callout && data.type === block.callout.type
                ? block.callout
                : data,
            comparisonId: block.id,
          })
        );
  };

  return (
    <div>
      <h2>{block.title}</h2>

      <CalloutBlock calloutData={block.callout} onChange={handleOnChange} />
    </div>
  );
};

BlockConfigBasicText.propTypes = {
  block: PropTypes.object.isRequired,
};

export default BlockConfigBasicText;
