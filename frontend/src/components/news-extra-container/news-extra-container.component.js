import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import NewsListExtraBlock from "@components/news-list-extra-block/news-list-extra-block.component";

import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";

const NewsExtraContainer = ({ block }) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { data, sharedData } = block;

  const blockData = useSelector((state) => blockDataSelector({ state, data }));

  const sharedBlockData = useSelector((state) =>
    blockDataSelector({ state, data: sharedData })
  );

  const onChangeInfo = ({ key, value }) => {
    const updatedData = {
      ...blockData,
      [key]: value,
    };

    dispatch(setDataItem(updatedData));
  };

  const onChangeItemContent = useCallback(
    ({ id, key, value }) => {
      const updatedData = sharedBlockData.items.map((item) => {
        return item.id === id
          ? {
              ...item,
              [key]: value,
            }
          : item;
      });

      const updatedBlockData = {
        ...sharedBlockData,
        items: updatedData,
      };

      dispatch(setDataItem(updatedBlockData));
    },
    [blockData]
  );

  // eslint-disable-next-line no-unused-vars
  const handleNavigateToItem = (itemId) => {
    const item = sharedBlockData.items.find(
      ({ id: compareItemId }) => compareItemId === itemId
    );

    if (item?.link) {
      window.open(item?.link, "_blank").focus();
    } else {
      history.push(
        `/cms/page/${sharedBlockData.pageId}/block/${sharedBlockData.blockId}/${itemId}`
      );
    }
  };

  return (
    <>
      <NewsListExtraBlock
        headline={blockData.headline}
        onChange={onChangeInfo}
        itemList={sharedBlockData.items}
        onChangeItemContent={onChangeItemContent}
        onReadMorePress={handleNavigateToItem}
      />
    </>
  );
};

NewsExtraContainer.propTypes = {
  block: PropTypes.object.isRequired,
  pageId: PropTypes.string,
};

export default NewsExtraContainer;
