import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";

import IssuePageInfo from "@components/issue-page-info/issue-page-info.component.js";
import IssueItemsList from "@components/issue-items-list/issue-items-list.component.js";
import IssuesLinks from "@components/issues-links/issues-links.component";
import IssueItem from "@components/issue-item/issue-item.component";

import { blockDataSelector, slugSelector } from "@helpers/blockData";

import StyleInjector from "@components/style-injector/style-injector.component";

const IssuesPageContainer = ({ block, pageId, activeItemId }) => {
  const pageSlug = slugSelector({pageId});

  const { data } = block;

  const blockData = blockDataSelector({ data });

  const activeItemData = useMemo(() => {
    if (!activeItemId) {
      return null;
    }

    return blockData.items.find((item) => item.id == activeItemId);
  }, [activeItemId]);

  const handleNavigateToItem = (itemId) => {
    navigate(`/${pageSlug}/${itemId}`);
  };
  
  return (
      <section className="issues_page_block white_block">
        <div className="section_gradient_overlay"></div>
        {!activeItemData && (
          // check if the css class's implementation in present
          <div className="inner_page_intro">
            <IssuePageInfo
              description={blockData.description}
              eyebrow={blockData.eyebrow}
              headline={blockData.headline}
              showDescription={blockData.showPageDescription}
              showEyebrow={blockData.showEyebrow}
            />
          </div>
        )}
        <div className="issues_page_content_wrapper">
          {blockData.showLinkToFullIssuePages && (
            <IssuesLinks
              itemList={blockData.items}
              onPress={handleNavigateToItem}
            />
          )}

          {!activeItemData && (
            <IssueItemsList
              itemList={blockData.items}
              onReadMorePress={handleNavigateToItem}
            />
          )}

          {!!activeItemData && (
            <IssueItem
              item={activeItemData}
            />
          )}
        </div>
      </section>
  );
};

IssuesPageContainer.propTypes = {
  block: PropTypes.object.isRequired,
  pageId: PropTypes.string,
  activeItemId: PropTypes.string,
};

export default IssuesPageContainer;
