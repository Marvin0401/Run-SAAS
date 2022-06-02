import React from "react";
import PropTypes from "prop-types";

import videoIcon from "@assets/images/social_icon-video.svg";
import { useNotificationPopUp } from "@components/notification-pop-up/notification-pop-up.component";
import VideoPopup from "@components/video-popup/video-popup.component";

const VideoPreviewTemplate = ({ embedCode, previewImage }) => {
  const { setPopUp } = useNotificationPopUp();
  return (
    <div
      className="video_preview"
      data-video_id="467827284"
      data-video_platform="vimeo"
    >
      {/* add center_button or round_button class to .video_preview to adjust button default styling */}
      <img src={previewImage} className="preview_image" />
      <div
        className="play_button"
        onClick={() => {
          setPopUp({
            children: <VideoPopup embedCode={embedCode} />,
            outerClassName: "video_overlay open",
            innerClassName: "embed_container-wrapper open",
            closeButtonClassName: "video_close_button open",
          });
        }}
      >
        <img src={videoIcon} alt="Play video" />
      </div>
    </div>
  );
};

VideoPreviewTemplate.propTypes = {
  embedCode: PropTypes.string,
  previewImage: PropTypes.string,
};

export default VideoPreviewTemplate;
