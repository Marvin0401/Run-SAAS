import React, { useMemo } from "react";
import PropTypes from "prop-types";

import TextEditorQuiil from "./text-editor-quiil.component";
import TextEditorSimple from "./tex-editor-simple.component";

const TextEditor = ({
  value,
  onChange,
  toolbarOptions = [],
  charLimit = -1,
  isSimple,
  element = "span",
  className,
}) => {
  const isSimpleTypeEditor = useMemo(() => {
    return toolbarOptions.length === 0 || isSimple;
  }, [toolbarOptions]);

  return (
    <React.Fragment>
      {isSimpleTypeEditor && (
        <TextEditorSimple
          value={value}
          onChange={onChange}
          element={element}
          charLimit={charLimit}
          className={className}
        />
      )}
      {!isSimpleTypeEditor && (
        <TextEditorQuiil
          value={value}
          onChange={onChange}
          toolbarOptions={toolbarOptions}
          charLimit={charLimit}
          className={className}
        />
      )}
    </React.Fragment>
  );
};

TextEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  toolbarOptions: PropTypes.arrayOf(PropTypes.string),
  charLimit: PropTypes.number,
  isSimple: PropTypes.bool,
  element: PropTypes.string,
  className: PropTypes.string,
};

export default TextEditor;
