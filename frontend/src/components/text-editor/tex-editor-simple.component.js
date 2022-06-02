import React, {
  useCallback,
  useRef,
  // , useState
} from "react";
import PropTypes from "prop-types";
import ContentEditable from "react-contenteditable";
import { checkIsKeyAllowed } from "../../helpers/keyboard";

const TextEditorSimple = ({
  value,
  onChange,
  handleClick,
  handleKeyUp,
  charLimit = -1,
  element = "span",
  autoCapitalize,
  className,
}) => {
  const editorRef = useRef(null);

  const onChangeText = (value) => {
    onChange(value);
  };

  // const [lastMetaKey, setLastMetaKey] = useState(false);
  // const [lastCtrlKey, setlastCtrlKey] = useState(false);
  // let a = true;

  const checkCharacterCount = useCallback((e) => {
    //   if (a) return;
    //   if (event.key !== "Meta" && event.key !== "Control") {
    //     setLastMetaKey(event.metaKey);
    //     setlastCtrlKey(event.ctrlKey);
    //   }
    const val = e.target.value || e.target.innerText || "";
    let rawText = val?.replace(/<[^>]*>/g, "") || "";

    // if (e.key !== "Backspace") console.log(val);
    if (
      charLimit != -1 &&
      rawText.length >= charLimit &&
      !e.metaKey &&
      !e.ctrlKey &&
      !checkIsKeyAllowed(e.key) &&
      !window.getSelection().toString()
    ) {
      e.preventDefault();
    }
  }, []);

  const handleChange = (e) => {
    let val = autoCapitalize ? "" : editorRef.current.innerText;
    val = e.target.value || e.target.innerText || "";
    let rawText = val?.replace(/<[^>]*>/g, "") || "";

    if (charLimit >= 0) {
      onChangeText(rawText.slice(0, charLimit));
    } else {
      onChangeText(rawText);
    }
  };

  if (element == "input" || element == "textarea") {
    return React.createElement(element, {
      ref: editorRef,
      className: "simple-text-editor",
      onInput: handleChange,
      value: value,
      onChange: handleChange,
      maxLength: charLimit,
    });
  }

  return (
    <pre className="whitespace-wrap z-index-3">
      <ContentEditable
        html={value}
        onChange={handleChange}
        onClick={handleClick}
        onKeyUp={handleKeyUp}
        onKeyDown={checkCharacterCount}
        innerRef={editorRef}
        tagName={element}
        className={
          className ? `simple-text-editor ${className}` : "simple-text-editor"
        }
        // autoCorrect={false}
        // spellCheck={false}
        // translate="no"
      />
    </pre>
  );
};

TextEditorSimple.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func,
  handleKeyUp: PropTypes.func,
  autoCapitalize: PropTypes.bool,
  toolbarOptions: PropTypes.arrayOf(PropTypes.string),
  charLimit: PropTypes.number,
  isSimple: PropTypes.bool,
  element: PropTypes.string,
  className: PropTypes.string,
};

export default TextEditorSimple;
