/* eslint-disable no-unused-vars */
import { isEmpty } from "lodash";
import rgb2hex from "rgb2hex";
import csstree from "css-tree";

const ignoredStyles = [
  ".ql-",
  ".svg",
  ".quill",
  "editorContainer",
  // ".simple-text-editor",
];

function getColor(rgbaColor) {
  const hexColor = rgb2hex(rgbaColor);
  if (hexColor.alpha === 0) {
    return null;
  }

  return hexColor.hex;
}

function getBorderColor(computedStyle) {
  let isHasBorder = false;

  if (computedStyle.borderTopWidth && computedStyle.borderTopWidth !== "0px") {
    isHasBorder = true;
  }

  if (
    computedStyle.borderBottomWidth &&
    computedStyle.borderBottomWidth !== "0px"
  ) {
    isHasBorder = true;
  }

  if (
    computedStyle.borderLeftWidth &&
    computedStyle.borderLeftWidth !== "0px"
  ) {
    isHasBorder = true;
  }

  if (
    computedStyle.borderRightWidth &&
    computedStyle.borderRightWidth !== "0px"
  ) {
    isHasBorder = true;
  }

  if (isHasBorder) {
    return getColor(computedStyle.borderColor);
  }

  return null;
}

function getClassNameString(className) {
  return "." + className?.trim().replace(/\s+/g, ".");
}

function getClassNames(node) {
  const style = getComputedStyle(node);

  let styleObj = {};
  const backgroundColor = getColor(style.backgroundColor);
  const color = getColor(style.color);
  const borderColor = getBorderColor(style.borderColor);

  if (backgroundColor) {
    styleObj["background-color"] = backgroundColor;
  }

  if (color) {
    styleObj.color = color;
  }

  if (borderColor) {
    styleObj["border-color"] = borderColor;
  }

  if (borderColor || color || backgroundColor) {
    styleObj.className = node?.className;
  }

  return [styleObj, ...Array.from(node.children).map(getClassNames)].flat();
}

function getParentId(node) {
  let parentId = undefined;

  const getId = (childNode) => {
    if (childNode.id && !parentId) {
      parentId = childNode.id;
      return;
    }

    Array.from(childNode.children).map(getId);
  };

  getId(node);

  return parentId;
}

export default function extractCSS(node) {
  const classNames = getClassNames(node).filter(
    (item) =>
      !isEmpty(item) && !!item.className && typeof item.className == "string"
  );

  const parentId = getParentId(node);

  const styleObject = {};

  classNames.forEach((cssItem) => {
    let classNameStr = getClassNameString(cssItem.className);

    const isIgnoredClassName = ignoredStyles.some((item) =>
      classNameStr.includes(item)
    );

    if (isIgnoredClassName) {
      return;
    }
    const cssCopy = Object.assign({}, cssItem);
    delete cssCopy.className;
    // classNameStr = parentId
    //   ? "#" + parentId + " " + classNameStr
    //   : classNameStr;
    styleObject[classNameStr] = cssCopy;
  });

  const cssStyles = Array.from(document.head.getElementsByTagName("style"))
    .map((style) => style.innerHTML)
    .join("");

  const parsedCSS = css.parse(cssStyles);

  parsedCSS.stylesheet.rules = parsedCSS.stylesheet.rules
    .filter((rule) => rule.type === "rule")
    .filter(
      (rule) =>
        rule.selectors.some((selector) =>
          selector.includes(".header_signup-bar")
        ) &&
        rule.declarations.some(
          (declaration) =>
            declaration.property == "background" &&
            declaration.value == "var(--teal)"
        )
    );

  console.log(" parsedCSS.stylesheet.rules", parsedCSS.stylesheet.rules);

  return styleObject;
}
