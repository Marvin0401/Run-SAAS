import React from "react";
import PropTypes from "prop-types";

import VideoPreviewTemplate from "../video-preview-template/video-preview-template.component";

// import { useDispatch, useSelector } from 'react-redux'

const VideoPreviewContainer = ({ embedCode, previewImage }) => {
  // const dispatch = useDispatch()

  // const state = useSelector(state => state)

  return (
    <>
      <VideoPreviewTemplate embedCode={embedCode} previewImage={previewImage} />
    </>
  );
};
VideoPreviewContainer.propTypes = {
  embedCode: PropTypes.string,
  previewImage: PropTypes.string,
};

export default VideoPreviewContainer;
