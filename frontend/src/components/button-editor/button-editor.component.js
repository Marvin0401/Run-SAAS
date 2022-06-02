import React from "react";
import PropTypes from "prop-types";
import TextEditorSimple from "@components/text-editor/tex-editor-simple.component";

const ButtonEditor = ({ value, onChange }) => {
  return (
    <TextEditorSimple
      value={value || " "}
      onChange={onChange}
      handleClick={(ev) => {
        ev.stopPropagation();
        ev.preventDefault();
      }}
      handleKeyUp={(ev) => {
        if (ev.code === "Space" || ev.code === "Enter") {
          ev.stopPropagation();
          ev.preventDefault();
        }
      }}
      autoCapitalize
    />
  );
};

ButtonEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ButtonEditor;
