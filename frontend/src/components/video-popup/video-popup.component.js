import React from "react";
import PropTypes from "prop-types";
const VideoPopup = ({ embedCode }) => {
  return (
    <>
      <div
        className="embed-container"
        dangerouslySetInnerHTML={{ __html: embedCode }}
      ></div>
    </>
  );
};
VideoPopup.propTypes = {
  embedCode: PropTypes.string.isRequired,
};
export default VideoPopup;
