import React from "react";
import VIDEO from "@assets/images/social_icon-video.svg";
import PropTypes from "prop-types";
import { blockDataSelector } from "@helpers/blockData";
import { useNotificationPopUp } from "@components/notification-pop-up/notification-pop-up.component";
import VideoPopup from "@components/video-popup/video-popup.component";

const FullWidthVideoBlock = ({ block }) => {
  const { setPopUp } = useNotificationPopUp();

  const { data } = block;

  const blockData = blockDataSelector({ data });

  return (
    <>
      {blockData.headlineOn && (
        <div className="video_image_header white_block">
          <h3 dangerouslySetInnerHTML={{__html: blockData.title}}/>
        </div>
      )}

      <section className="full_width_video">
        <div
          className="video_preview"
          data-video_id="467827284"
          data-video_platform="vimeo"
        >
          <img src={blockData.thumbnail} />
          <div
            className="play_button"
            onClick={() => {
              setPopUp({
                children: <VideoPopup embedCode={blockData.embedCode} />,
                outerClassName: "video_overlay open",
                innerClassName: "embed_container-wrapper open",
                closeButtonClassName: "video_close_button open",
              });
            }}
          >
            <img src={VIDEO} alt="Play video" />
          </div>
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

FullWidthVideoBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default FullWidthVideoBlock;
