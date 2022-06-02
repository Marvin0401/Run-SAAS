import React from "react";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";
import BLOCKS, { EmptyIcon } from "@config/blocks";
import { BLOCK_CATEGORIES, BLOCK_VARIANT } from "@constants";
import { BLOCK_FREQUENCY } from "@constants/";
import { useParams } from "react-router-dom";
import findDeep from "deepdash/findDeep";
import { useSelector } from "react-redux";
import { pageBlocksSelector } from "@redux/selectors/site";

const BLOCK_SOURCE = [...BLOCKS];

const BlockList = ({ category = "", isDefaultPage, handleAddNewBlock }) => {
  const { pageId } = useParams();

  const pageBlocks = useSelector((state) =>
    pageBlocksSelector({ state, pageId })
  );

  const filteredBlocks = BLOCK_SOURCE.filter((block) => {
    if (isDefaultPage) {
      const blockIsAvailable =
        block.variant === BLOCK_VARIANT.EXTRA ||
        block.variant === BLOCK_VARIANT.MULTI;

      const blockExistsOnPage = findDeep(
        pageBlocks,
        ({ type }) => type === block.type,
        {
          childrenPath: ["children"],
        }
      );

      const blockCanBeUsed =
        (block.frequency === BLOCK_FREQUENCY.ONCE &&
          !blockExistsOnPage?.value) ||
        block.frequency === BLOCK_FREQUENCY.MULTIPLE;

      return blockIsAvailable && blockCanBeUsed;
    } else {
      let blockIsAvailable = false;

      if (category === BLOCK_CATEGORIES.MAIN) {
        blockIsAvailable =
          block.variant === BLOCK_VARIANT.CUSTOM ||
          block.variant === BLOCK_VARIANT.MULTI;
      }
      if (category === BLOCK_CATEGORIES.EXTRA) {
        blockIsAvailable =
          block.variant === BLOCK_VARIANT.EXTRA ||
          block.variant === BLOCK_VARIANT.MULTI;
      }

      const blockExistsOnPage = findDeep(
        pageBlocks,
        ({ type }) => type === block.type,
        {
          childrenPath: ["children"],
        }
      );

      const blockCanBeUsed =
        (block.frequency === BLOCK_FREQUENCY.ONCE &&
          !blockExistsOnPage?.value) ||
        block.frequency === BLOCK_FREQUENCY.MULTIPLE;

      return blockIsAvailable && blockCanBeUsed;
    }
  });

  return (
    <>
      {filteredBlocks.map((item, index) => (
        <a
          className="block_option"
          onClick={(e) => handleAddNewBlock(e, item)}
          key={`blocklist-item-${index}`}
        >
          <ReactSVG className="svg" src={item.icon || EmptyIcon} />
          {item.title}
        </a>
      ))}
    </>
  );
};

BlockList.propTypes = {
  category: PropTypes.string,
  handleAddNewBlock: PropTypes.func.isRequired,
  isDefaultPage: PropTypes.bool.isRequired,
};
export default BlockList;
