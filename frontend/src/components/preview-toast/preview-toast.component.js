import React from "react";
import PropTypes from "prop-types";

const PreviewToast = ({ url }) => {
  return (
    <div id="preview-toast">
      <span>
        🍻 Your site can be viewed at:{" "}
        <a href={url} rel="noreferrer" target="_blank">
          {url}
        </a>
        <br />
        It might take a few minutes for changes to get live.
      </span>
    </div>
  );
};

PreviewToast.propTypes = {
  url: PropTypes.string.isRequired,
};

export default PreviewToast;
