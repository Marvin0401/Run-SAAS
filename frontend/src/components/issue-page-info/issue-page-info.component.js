import React from "react";
import PropTypes from "prop-types";
import TextEditor from "@components/text-editor/text-editor.component";

const IssuePageInfo = ({
  description,
  eyebrow,
  headline,
  onChange,
  showDescription,
  showEyebrow,
}) => {
  return (
    <>
      <h2>
        {showEyebrow && (
          <TextEditor
            value={eyebrow || ""}
            onChange={(value) => {
              onChange({ key: "eyebrow", value });
            }}
            isSimple
            charLimit={45}
            element="span"
            className="eyebrow"
          />
        )}
        <TextEditor
          value={headline}
          onChange={(value) => {
            onChange({ key: "headline", value });
          }}
          isSimple
          charLimit={45}
          element="span"
        />
      </h2>
      {showDescription && (
        <TextEditor
          value={description || ""}
          onChange={(value) => {
            onChange({ key: "description", value });
          }}
          toolbarOptions={["bold", "italic", "link"]}
          charLimit={350}
          element="div"
          className="intro_p"
        />
      )}
    </>
  );
};

IssuePageInfo.propTypes = {
  description: PropTypes.string.isRequired,
  eyebrow: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  showDescription: PropTypes.bool.isRequired,
  showEyebrow: PropTypes.bool.isRequired,
};

export default IssuePageInfo;
