import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import { blockDataSelector, slugSelector } from "@helpers/blockData";

import NewsListPage from "@components/news-list-page/news-list-page.component";
import NewsItemPage from "@components/news-item-page/news-item-page.component";
import NewsLinks from "@components/news-links/news-links.component";

import StyleInjector from "@components/style-injector/style-injector.component";

const NewsPageContainer = ({ block, pageId, activeItemId }) => {
  const pageSlug = slugSelector({pageId});
  const { data, sharedData } = block;

  const blockData = blockDataSelector({ data });
  const sharedBlockData = blockDataSelector({ data: sharedData });

  const activeItemData = useMemo(() => {
    if (!activeItemId) {
      return null;
    }

    return sharedBlockData.items.find((item) => item.id == activeItemId);
  }, [activeItemId]);

  const handleNavigateToItem = (itemId, link) => {
    if (link) return window.open(link, "_blank");
    navigate(`/${pageSlug}/${itemId}`);
  };

  return (
    <>
      {!activeItemData && (
        <NewsListPage
          description={blockData.description}
          eyebrow={blockData.eyebrow}
          headline={blockData.headline}
          itemList={sharedBlockData.items}
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
