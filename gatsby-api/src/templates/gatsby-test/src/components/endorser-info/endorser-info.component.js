import React from "react";
import PropTypes from "prop-types";

const EndorserInfo = ({
  description,
  eyebrow,
  headline,
  showDescription,
  showEyebrow,
}) => {
  return (
    <div className="inner_page_intro">
      <h2>
        {showEyebrow && (
          <span className="eyebrow" dangerouslySetInnerHTML={{__html:eyebrow}} />
        )}
        <span dangerouslySetInnerHTML={{__html:headline}} />
      </h2>
      {showDescription && (
        <div className="intro_p quill_editor_custom_style" dangerouslySetInnerHTML={{__html:description}}></div>
      )}
    </div>
  );
};

EndorserInfo.propTypes = {
  description: PropTypes.string.isRequired,
  eyebrow: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  showDescription: PropTypes.bool.isRequired,
  showEyebrow: PropTypes.bool.isRequired,
};

export default EndorserInfo;
