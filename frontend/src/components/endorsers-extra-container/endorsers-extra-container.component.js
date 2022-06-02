import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import EndorserInfoExtra from "@components/endorser-info-extra/endorser-info-extra.component";
import EndorserLogoList from "@components/endorser-logo-list/endorser-logo-list.component";
import EndorserPhotoList from "@components/endorser-photo-list/endorser-photo-list.component";

import { useDispatch, useSelector } from "react-redux";
import {
  blockDataSelector,
  containerOfPageWithBlockSelector,
} from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";

import { ReactSVG } from "react-svg";
import ARROWICON from "@assets/images/icon_arrow-1.svg";

import { BLOCK_TYPES, BLOCK_VARIANT, PAGE_CATEGORIES } from "@constants/";

const EndorsersContainer = ({ block, pageId }) => {
  const dispatch = useDispatch();

  const { data, sharedData } = block;
  const blockData = useSelector((state) => blockDataSelector({ state, data }));

  const sharedBlockData = useSelector((state) =>
    blockDataSelector({ state, data: sharedData })
  );

  const defaultPageContainer = useSelector((state) =>
    containerOfPageWithBlockSelector({
      state,
      type: BLOCK_TYPES.ENDORSEMENTS,
      variant: BLOCK_VARIANT.DEFAULT,
    })
  );

  const defaultIsHidden =
    defaultPageContainer?.type === PAGE_CATEGORIES.HIDDEN ||
    defaultPageContainer.type === PAGE_CATEGORIES.DRAFT;

  const onChangeInfo = ({ key, value }) => {
    const updatedData = {
      ...blockData,
      [key]: value,
    };

    dispatch(setDataItem(updatedData));
  };

  const onChangeEndorser = useCallback(
    ({ id, key, parentKey, value }) => {
      const dataToUpdate = [...sharedBlockData[parentKey]];

      const updatedData = dataToUpdate.map((item) => {
        return item.id === id
          ? {
              ...item,
              [key]: value,
            }
          : item;
      });

      const updatedBlockData = {
        ...sharedBlockData,
        [parentKey]: updatedData,
      };

      dispatch(setDataItem(updatedBlockData));
    },
    [blockData]
  );

  return (
    <div className="endorsements_block white_block">
      <div className="section_gradient_overlay"></div>
      <EndorserInfoExtra
        headline={blockData?.headline}
        showHeadline={blockData?.showHeadline}
        onChange={onChangeInfo}
      />

      {blockData?.showFeatureIndividuals && (
        <EndorserPhotoList
          endorserList={sharedBlockData?.featuredIndividuals}
          onChange={onChangeEndorser}
          blockID={block.id}
          pageID={pageId}
          showFeat
        />
      )}

      {blockData?.showFeatureOrganizations && (
        <EndorserLogoList
          endorserOrganizationList={sharedBlockData?.featuredOrganizations}
          isMonochrome={sharedBlockData?.isMonochrome}
          numRows={blockData.numRows}
          blockID={block.id}
          pageID={pageId}
        />
      )}

      {!defaultIsHidden && (
        <Link
          to={`/cms/page/${sharedBlockData.pageId}/block/${sharedBlockData.blockId}`}
        >
          <button type="button" className="btn_style-1">
            View all endorsers{" "}
            <ReactSVG className="arrow svg" src={ARROWICON} wrapper="svg" />
          </button>
        </Link>
      )}
    </div>
  );
};

EndorsersContainer.propTypes = {
  block: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired,
};

export default EndorsersContainer;
