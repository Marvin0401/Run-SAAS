import React, { useState, useRef, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

import ReactQuill from "react-quill";
import "quill-paste-smart";
import TextEditorToolbar from "./text-editor-toolbar.component";

import { v4 as uuidv4 } from "uuid";

import classnames from "classnames";
import useStyles from "./text-editor.style";
import { checkIsKeyAllowed } from "../../helpers/keyboard";
import "@helpers/quill/custom-image-module";
import { useImageUploadPopUp } from "@components/image-upload-modal/image-upload-modal.component";
import { useHistory } from "react-router";

var icons = ReactQuill.Quill.import("ui/icons");
icons["header"] = null;
icons["bold"] = null;
icons["italic"] = null;
icons["link"] = null;
icons["list"] = null;
icons["image"] = null;

const defaultToolBarOptions = [
  "bold",
  "italic",
  "h1",
  "h2",
  "h3",
  "h4",
  "link",
  "list",
  "image",
];

const TextEditor = ({
  value,
  onChange,
  toolbarOptions = defaultToolBarOptions,
  charLimit = -1,
  className,
}) => {
  const reactQuillRef = useRef();
  const history = useHistory();

  const toolbarContainer = useMemo(() => "toolbar_" + uuidv4(), []);
  const inputId = useMemo(() => "input_" + uuidv4(), []);
  const setPopUp = useImageUploadPopUp();

  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#" + toolbarContainer,
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const [isFocused, setIsFocused] = useState(false);
  const [isToolBarFocused, setIsToolbarFocused] = useState(false);

  const classes = useStyles();

  function imageHandler() {
    const input =
      document.getElementById(inputId) || document.createElement("input");
    input.setAttribute("id", inputId);
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = handleOnChangeFileUpload;
    input.click();
  }

  const handleOnUploadSuccess = ({ mediaUrl }) => {
    const editor = reactQuillRef.current.getEditor();
    const range = editor.getSelection();
    const imgBlotOptions = {
      src: mediaUrl,
      id: uuidv4(),
      class: "img-float-left",
      style: "width: 20%;",
    };
    editor.insertEmbed(
      range.index + range.length,
      "CustomImage",
      imgBlotOptions
    );
    setPopUp({ close: true });
  };

  const invokeImageUploadPopup = ({ src }) => {
    let options = {
      enableCrop: true,
      onUploadSuccess: handleOnUploadSuccess,
      src,
      aspectRatio: 1,
      title: "Image",
    };

    setPopUp(options);
  };

  const handleOnChangeFileUpload = (e) => {
    const { files } = e.target;

    if (files && files.length === 0) {
      return;
    }

    invokeImageUploadPopup({
      src: URL.createObjectURL(files[0]),
    });
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    if (!isToolBarFocused) {
      setIsFocused(false);
    }
  };

  const onFocusToolbar = () => {
    setIsToolbarFocused(true);
  };

  const onBlurToolbar = () => {
    setIsToolbarFocused(false);
  };

  const checkCharacterCount = useCallback((event) => {
    const unprivilegedEditor = reactQuillRef.current.getEditor();
    if (
      charLimit != -1 &&
      unprivilegedEditor.getLength() > charLimit &&
      !event.metaKey &&
      !event.ctrlKey &&
      !checkIsKeyAllowed(event.key) &&
      !window.getSelection().toString() &&
      reactQuillRef.current.getEditorSelection()?.length <
        unprivilegedEditor.getLength()
    ) {
      event.preventDefault();
    }
  }, []);

  const changeHandler = (content, delta, source, editor) => {
    const unprivilegedEditor = reactQuillRef.current?.getEditor();

    if (charLimit != -1 && editor.getLength() - 1 > charLimit) {
      unprivilegedEditor?.deleteText(charLimit, unprivilegedEditor.getLength());
      return;
    }

    onChange(content, delta, source, editor);
  };

  const handleImageClick = (e) => {
    const img = e.nativeEvent.path[0];
    if (img.tagName === "IMG") {
      console.log(history.location.pathname);
      e.stopPropagation();
      history.push(`${history.location.pathname}?imageId=${img.id}`);
    }
  };

  return (
    <div
      className={classnames(
        classes.editorContainer,
        className,
        "child-whitespace-wrap z-index-3",
        {
          active: isFocused,
        }
      )}
      onClick={handleImageClick}
    >
      <TextEditorToolbar
        onFocus={onFocusToolbar}
        onBlur={onBlurToolbar}
        toolbarOptions={toolbarOptions}
        toolbarContainer={toolbarContainer}
      />
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        defaultValue={value}
        onChange={(content, delta, source, editor) =>
          changeHandler(content, delta, source, editor)
        }
        modules={modules}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={checkCharacterCount}
        onKeyUp={checkCharacterCount}
        preserveWhitespace
      />
    </div>
  );
};

TextEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  toolbarOptions: PropTypes.arrayOf(PropTypes.string),
  charLimit: PropTypes.number,
  className: PropTypes.string,
};

export default TextEditor;
