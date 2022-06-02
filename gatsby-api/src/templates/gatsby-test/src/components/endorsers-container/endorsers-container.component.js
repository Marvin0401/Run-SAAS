import React from "react";
import PropTypes from "prop-types";

import EndorserInfo from "@components/endorser-info/endorser-info.component";
import EndorserList from "@components/endorser-list/endorser-list.component";
import EndorserLogoList from "@components/endorser-logo-list/endorser-logo-list.component";
import EndorserPhotoList from "@components/endorser-photo-list/endorser-photo-list.component";

import { blockDataSelector } from "@helpers/blockData";

import StyleInjector from "@components/style-injector/style-injector.component";

const EndorsersContainer = ({ block }) => {

  const { data, sharedData } = block;
  const blockData = blockDataSelector({ data });
  const sharedBlockData = blockDataSelector({ data: sharedData });

  return (
      <div>
        <div className="endorsements_block white_block">
          <div className="section_gradient_overlay"></div>
          <EndorserInfo
            showDescription={blockData?.showDescription}
            showEyebrow={blockData?.showEyebrow}
            description={blockData?.description}
            eyebrow={blockData?.eyebrow}
            headline={blockData?.headline}
          />
        </div>
        {blockData?.showFeatureIndividuals && (
          <EndorserPhotoList
            endorserList={sharedBlockData?.featuredIndividuals}
            showFeat
            className="endorser_photos_wrapper"
          />
        )}

        {blockData?.showFeatureOrganizations && (
          <EndorserLogoList
            endorserOrganizationList={sharedBlockData?.featuredOrganizations}
            isMonochrome={sharedBlockData?.isMonochrome}
            numRows={blockData.numRows}
            // TODO: update this component to include className
            className="endorser_logos_wrapper"
          />
        )}

        {blockData?.showEndorserList && (
          <div className="endorser_list">
            <EndorserList
              individualEndorsers={blockData?.individualEndorsers}
              organizationalEndorsers={blockData?.organizationalEndorsers}
            />
          </div>
        )}
      </div>
  );
};

EndorsersContainer.propTypes = {
  block: PropTypes.object.isRequired,
};

export default EndorsersContainer;
