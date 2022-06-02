import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import IssuePageInfo from "@components/issue-page-info/issue-page-info.component";
import IssueItemsList from "@components/issue-items-list/issue-items-list.component";
import IssuesLinks from "@components/issues-links/issues-links.component";
import IssueItem from "@components/issue-item/issue-item.component";

import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";
import classnames from "classnames";

const IssuesPageContainer = ({ block, pageId, activeItemId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { data } = block;

  const blockData = useSelector((state) => blockDataSelector({ state, data }));

  const activeItemData = useMemo(() => {
    if (!activeItemId) {
      return null;
    }

    return blockData.items.find((item) => item.id == activeItemId);
  }, [activeItemId, blockData]);

  const onChangeInfo = ({ key, value }) => {
    const updatedData = {
      ...blockData,
      [key]: value,
    };

    dispatch(setDataItem(updatedData));
  };

  const onChangeItemContent = useCallback(
    ({ id, key, value }) => {
      const updatedData = blockData.items.map((item) => {
        return item.id === id
          ? {
              ...item,
              [key]: value,
            }
          : item;
      });

      const updatedBlockData = {
        ...blockData,
        items: updatedData,
      };

      dispatch(setDataItem(updatedBlockData));
    },
    [blockData]
  );

  const handleNavigateToItem = (itemId) => {
    history.push(`/cms/page/${pageId}/block/${block.id}/${itemId}`);
  };

  return (
    <section
      className={classnames("issues_page_block white_block", {
        one_page_option: !blockData.showLinkToFullIssuePages,
      })}
    >
      <div className="section_gradient_overlay"></div>

      {!activeItemData && (
        <div className="inner_page_intro">
          <IssuePageInfo
            description={blockData.description}
            eyebrow={blockData.eyebrow}
            headline={blockData.headline}
            onChange={onChangeInfo}
            showDescription={blockData.showPageDescription}
            showEyebrow={blockData.showEyebrow}
          />
        </div>
      )}
      <div className="issues_page_content_wrapper">
        <IssuesLinks
          itemList={blockData.items}
          onPress={handleNavigateToItem}
          activeItemId={activeItemId}
        />
        {!activeItemData && (
          <IssueItemsList
            itemList={blockData.items}
            onChangeItemContent={onChangeItemContent}
            onReadMorePress={handleNavigateToItem}
          />
        )}
        {!!activeItemData && (
          <IssueItem
            item={activeItemData}
            onChangeContent={onChangeItemContent}
            key={activeItemId}
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
