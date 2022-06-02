import React from "react";
import PropTypes from "prop-types";
import TextEditor from "@components/text-editor/text-editor.component";

const EndorserInfoExtra = ({ headline, onChange, showHeadline }) => {
  return (
    <div className="inner_page_intro">
      {showHeadline && (
        <h2>
          <TextEditor
            value={headline}
            onChange={(value) => {
              onChange({ key: "headline", value });
            }}
            toolbarOptions={[]}
            charLimit={45}
            element="span"
          />
        </h2>
      )}
    </div>
  );
};

EndorserInfoExtra.propTypes = {
  headline: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  showHeadline: PropTypes.bool.isRequired,
};

export default EndorserInfoExtra;
