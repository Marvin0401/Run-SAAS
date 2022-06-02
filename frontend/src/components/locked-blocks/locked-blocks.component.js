import React from "react";
import PropTypes from "prop-types";
import Block from "@components/block/block.component";

const LockedBlocks = ({ list, pageId }) => {
  return (
    <>
      <div key={list.id}>
        <h2>{list.title}</h2>
        <ul className="cms_controls_list">
          {list.children.length > 0 && (
            <Block data={list.children[0]} pageId={pageId} />
          )}
        </ul>
      </div>
      {/* <hr className="spacer_small" /> */}
    </>
  );
};

LockedBlocks.propTypes = {
  list: PropTypes.object,
  pageId: PropTypes.string.isRequired,
};

export default LockedBlocks;
