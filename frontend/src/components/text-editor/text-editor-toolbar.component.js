import React from "react";
import PropTypes from "prop-types";

import { ReactSVG } from "react-svg";

import H1Icon from "@assets/images/text-editor/h1.svg";
import H2Icon from "@assets/images/text-editor/h2.svg";
import H3Icon from "@assets/images/text-editor/h3.svg";
import H4Icon from "@assets/images/text-editor/h4.svg";
import LinkIcon from "@assets/images/text-editor/link.svg";
import ListIcon from "@assets/images/text-editor/list.svg";
import ImgIcon from "@assets/images/text-editor/img.svg";
import BoldIcon from "@assets/images/text-editor/b.svg";
import ItalicIcon from "@assets/images/text-editor/i.svg";

// const defaultToolBarOptions = [
//   "bold",
//   "italic",
//   "h1",
//   "h2",
//   "h3",
//   "h4",
//   "link",
//   "list",
//   "image",
// ];

const CustomToolbar = ({ toolbarOptions, toolbarContainer }) => {
  return (
    <div id={toolbarContainer} className="ql-toolbar">
      {toolbarOptions.includes("bold") && (
        <button className="ql-bold">
          <ReactSVG src={BoldIcon} wrapper="span" />
        </button>
      )}
      {toolbarOptions.includes("italic") && (
        <button className="ql-italic">
          <ReactSVG src={ItalicIcon} wrapper="span" />
        </button>
      )}
      {toolbarOptions.includes("h1") && (
        <button className="ql-header" value={1}>
          <ReactSVG src={H1Icon} wrapper="span" />
        </button>
      )}
      {toolbarOptions.includes("h2") && (
        <button className="ql-header" value={2}>
          <ReactSVG src={H2Icon} className="nav_icon svg" wrapper="span" />
        </button>
      )}
      {toolbarOptions.includes("h3") && (
        <button className="ql-header" value={3}>
          <ReactSVG src={H3Icon} className="nav_icon svg" wrapper="span" />
        </button>
      )}
      {toolbarOptions.includes("h4") && (
        <button className="ql-header" value={4}>
          <ReactSVG src={H4Icon} className="nav_icon svg" wrapper="span" />
        </button>
      )}
      {toolbarOptions.includes("link") && (
        <button className="ql-link">
          <ReactSVG src={LinkIcon} className="nav_icon" wrapper="span" />
        </button>
      )}
      {toolbarOptions.includes("list") && (
        <button className="ql-list" value="bullet">
          <ReactSVG src={ListIcon} className="nav_icon svg" wrapper="span" />
        </button>
      )}
      {toolbarOptions.includes("image") && (
        <button className="ql-image">
          <ReactSVG src={ImgIcon} className="nav_icon svg" wrapper="span" />
        </button>
      )}
    </div>
  );
};

CustomToolbar.propTypes = {
  toolbarOptions: PropTypes.arrayOf(PropTypes.string),
  toolbarContainer: PropTypes.string.isRequired,
};

export default CustomToolbar;
