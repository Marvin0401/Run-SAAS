import React from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";

import BlockEventsList from "@components/block-events-list/block-events-list.component";
import BlockEventsItem from "@components/block-events-item/block-events-item.component";

const BlockEventsContainer = ({ block, itemId, pageId }) => {
  const dispatch = useDispatch();

  const { data } = block;

  const blockData = useSelector((state) => blockDataSelector({ state, data }));

  const setItemValue = ({ updatedPropObj, item: changedItem }) => {
    const updatedItems = blockData?.items?.map((item) => {
      return item.id === changedItem.id
        ? {
            ...item,
            ...updatedPropObj,
          }
        : item;
    });
    const updatedData = {
      ...blockData,
      items: updatedItems,
    };
    dispatch(setDataItem(updatedData));
  };

  const setValue = (value) => {
    const updatedData = {
      ...blockData,
      ...value,
    };
    dispatch(setDataItem(updatedData));
  };

  if (itemId)
    return (
      <BlockEventsItem
        blockData={blockData}
        itemId={itemId}
        setItemValue={setItemValue}
      />
    );
  else
    return (
      <BlockEventsList
        block={block}
        pageId={pageId}
        setItemValue={setItemValue}
        blockData={blockData}
        setValue={setValue}
      />
    );
};

BlockEventsContainer.propTypes = {
  block: PropTypes.object.isRequired,
  itemId: PropTypes.string,
  pageId: PropTypes.string,
};
export default BlockEventsContainer;
