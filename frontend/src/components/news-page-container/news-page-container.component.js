import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import NewsListPage from "@components/news-list-page/news-list-page.component";
import NewsItemPage from "@components/news-item-page/news-item-page.component";
import NewsLinks from "@components/news-links/news-links.component";

import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";

const NewsPageContainer = ({ block, activeItemId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { data, sharedData } = block;

  const blockData = useSelector((state) => blockDataSelector({ state, data }));
  const sharedBlockData = useSelector((state) =>
    blockDataSelector({ state, data: sharedData })
  );

  const activeItemData = useMemo(() => {
    if (!activeItemId) {
      return null;
    }

    return sharedBlockData.items.find((item) => item.id == activeItemId);
  }, [activeItemId, sharedBlockData]);

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
      {!activeItemData && (
        <NewsListPage
          description={blockData.description}
          eyebrow={blockData.eyebrow}
          headline={blockData.headline}
          onChange={onChangeInfo}
          itemList={sharedBlockData.items}
          onChangeItemContent={onChangeItemContent}
          onReadMorePress={handleNavigateToItem}
        />
      )}

      {!!activeItemData && (
        <section className="news_page_item_block white_block">
          <div className="section_gradient_overlay"></div>
          <NewsLinks
            itemList={sharedBlockData.items}
            onPress={handleNavigateToItem}
          />
          <NewsItemPage
            item={activeItemData}
            onChangeContent={onChangeItemContent}
            key={activeItemId}
          />
        </section>
      )}
    </>
  );
};

NewsPageContainer.propTypes = {
  block: PropTypes.object.isRequired,
  pageId: PropTypes.string,
  activeItemId: PropTypes.string,
};

export default NewsPageContainer;
