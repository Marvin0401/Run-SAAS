import React from "react";
import PropTypes from "prop-types";
import { blockDataSelector } from "@helpers/blockData";

const FullWidthImageBlock = ({ block }) => {

  const { data } = block;

  const blockData = blockDataSelector({ data });

  return (
    <>
      {blockData.headlineOn && (
        <div className="video_image_header white_block">
          <h3 dangerouslySetInnerHTML={{__html: blockData.title}} />
        </div>
      )}

      <section className="full_width_video">
        <div
          className="video_preview"
          data-video_id="467827284"
          data-video_platform="vimeo"
        >
          <img src={blockData.thumbnail} />
        </div>
      </section>

      {blockData.captionOn && (
        <div className="video_image_caption white_block">
          <small className="quill_editor_custom_style" dangerouslySetInnerHTML={{__html:blockData.description}} />
        </div>
      )}
    </>
  );
};

FullWidthImageBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default FullWidthImageBlock;
