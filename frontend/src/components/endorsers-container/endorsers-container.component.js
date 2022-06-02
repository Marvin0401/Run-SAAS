import React, { useCallback } from "react";
import PropTypes from "prop-types";

import EndorserInfo from "@components/endorser-info/endorser-info.component";
import EndorserList from "@components/endorser-list/endorser-list.component";
import EndorserLogoList from "@components/endorser-logo-list/endorser-logo-list.component";
import EndorserPhotoList from "@components/endorser-photo-list/endorser-photo-list.component";

import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";

const EndorsersContainer = ({ block, pageId }) => {
  const dispatch = useDispatch();

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

  const onChangeFeatureIndividual = useCallback(
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

  const onChangeEndorser = useCallback(
    ({ id, key, parentKey, value }) => {
      const dataToUpdate = [...blockData[parentKey]];

      const updatedData = dataToUpdate.map((item) => {
        return item.id === id
          ? {
              ...item,
              [key]: value,
            }
          : item;
      });

      const updatedBlockData = {
        ...blockData,
        [parentKey]: updatedData,
      };

      dispatch(setDataItem(updatedBlockData));
    },
    [blockData]
  );

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
          onChange={onChangeInfo}
        />
      </div>

      {blockData?.showFeatureIndividuals && (
        <EndorserPhotoList
          endorserList={sharedBlockData?.featuredIndividuals}
          onChange={onChangeFeatureIndividual}
          blockID={block.id}
          pageID={pageId}
          showFeat
          className="endorser_photos_wrapper"
        />
      )}

      {blockData?.showFeatureOrganizations && (
        <EndorserLogoList
          endorserOrganizationList={sharedBlockData?.featuredOrganizations}
          isMonochrome={sharedBlockData?.isMonochrome}
          numRows={blockData.numRows}
          blockID={block.id}
          pageID={pageId}
          className="endorser_logos_wrapper"
        />
      )}

      {blockData?.showEndorserList && (
        <div className="endorser_list">
          <EndorserList
            individualEndorsers={blockData?.individualEndorsers}
            organizationalEndorsers={blockData?.organizationalEndorsers}
            onChange={onChangeEndorser}
            blockID={block.id}
            pageID={pageId}
          />
        </div>
      )}
    </div>
  );
};

EndorsersContainer.propTypes = {
  block: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired,
};

export default EndorsersContainer;
