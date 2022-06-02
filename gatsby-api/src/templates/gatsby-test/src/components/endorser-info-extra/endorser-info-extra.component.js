import React from "react";
import PropTypes from "prop-types";

const EndorserInfoExtra = ({ headline, showHeadline }) => {
  return (
    <div className="inner_page_intro">
      {showHeadline && (
        <h2>
          <span dangerouslySetInnerHTML={{__html: headline}}/>
        </h2>
      )}
    </div>
  );
};

EndorserInfoExtra.propTypes = {
  headline: PropTypes.string.isRequired,
  showHeadline: PropTypes.bool.isRequired,
};

export default EndorserInfoExtra;
