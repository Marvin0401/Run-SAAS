import React from "react";
import PropTypes from "prop-types";

import EndorserInfoExtra from "@components/endorser-info-extra/endorser-info-extra.component";
import EndorserLogoList from "@components/endorser-logo-list/endorser-logo-list.component";
import EndorserPhotoList from "@components/endorser-photo-list/endorser-photo-list.component";

import { blockDataSelector, slugSelector } from "@helpers/blockData";
import { containerOfPageWithBlockSelector } from "@helpers/site";

import StyleInjector from "@components/style-injector/style-injector.component";

import { ReactSVG } from "react-svg";
import ARROWICON from "@assets/images/icon_arrow-1.svg";

import { BLOCK_TYPES, BLOCK_VARIANT, PAGE_CATEGORIES } from "@constants/constants";
import { Link } from 'gatsby';

const EndorsersContainer = ({ block }) => {

  const { data, sharedData } = block;
  const blockData = blockDataSelector({ data });
  const sharedBlockData = blockDataSelector({ data: sharedData });

  const defaultPageContainer =
    containerOfPageWithBlockSelector({
      type: BLOCK_TYPES.ENDORSEMENTS,
      variant: BLOCK_VARIANT.DEFAULT,
    });

  const defaultIsHidden =
    defaultPageContainer?.type === PAGE_CATEGORIES.HIDDEN ||
    defaultPageContainer.type === PAGE_CATEGORIES.DRAFT;
  
  const pageSlug = !defaultIsHidden ? slugSelector({pageId: sharedBlockData.pageId}) : null;

  return (
      <div className="endorsements_block white_block">
        <div className="section_gradient_overlay"></div>
        <EndorserInfoExtra
          headline={blockData?.headline}
          showHeadline={blockData?.showHeadline}
        />

        {blockData?.showFeatureIndividuals && (
          <EndorserPhotoList
            endorserList={sharedBlockData?.featuredIndividuals}
            showFeat
          />
        )}

        {blockData?.showFeatureOrganizations && (
          <EndorserLogoList
            endorserOrganizationList={sharedBlockData?.featuredOrganizations}
            isMonochrome={sharedBlockData?.isMonochrome}
            numRows={blockData.numRows}
          />
        )}

        {!defaultIsHidden && (
          <Link
            to={`/${pageSlug}`}
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
