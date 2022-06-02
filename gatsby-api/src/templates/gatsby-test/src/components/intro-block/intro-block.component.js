import React from "react";
import PropTypes from "prop-types";

import classnames from "classnames";
import { blockDataSelector } from "@helpers/blockData";

import { INTRO_LAYOUT_TYPE } from "@constants/constants";
import VideoPreviewTemplate from "@components/video-preview-template/video-preview-template.component";

const IntroBlock = ({ block }) => {

  const { data } = block;
  const blockData = blockDataSelector({ data });

  return (
      <section
        className={classnames("intro_home_block main_text white_block", {
          single_col_layout: blockData.layoutType !== INTRO_LAYOUT_TYPE.TWO,
          two_col_layout: blockData.layoutType === INTRO_LAYOUT_TYPE.TWO,
        })}
      >
        <div className="section_gradient_overlay"></div>

        {blockData.layoutType === INTRO_LAYOUT_TYPE.VIDEO ? (
          <VideoPreviewTemplate 
            embedCode={blockData.embedCode}
            previewImage={blockData.horizImage}
          />
        ) : (
          <div className="curvedshadow intro_img_wrapper rotate-left">
            <img
              src={
                blockData.layoutType === INTRO_LAYOUT_TYPE.SINGLE
                  ? blockData.horizImage
                  : blockData.vertImage
              }
              className="vert_image"
            />
          </div>
        )}

        <div className="written_content">
          <h1 dangerouslySetInnerHTML={{__html: blockData.heading}} />

          <div className="home_intro_text quill_editor_custom_style" dangerouslySetInnerHTML={{__html:blockData.text}} />

          {blockData.showSignature && (
            <div className="signature_wrap">
              <img src={blockData.signatureImage} className="signature" />
            </div>
          )}
        </div>
      </section>
  );
};

IntroBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default IntroBlock;
