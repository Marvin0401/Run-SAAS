/* eslint-disable no-unused-vars */
import { isEmpty } from "lodash";

const IGNORE_CLASSES = [
  "cms",
  "ql-link",
  "ql-italic",
  "ql-bold",
  "ql-toolbar",
  "ql-link",
  "ql-",
  "quill",
  "editorContainer",
  "default_style",
  "nav_icon svg",
  "marketing_site",
  "social_icons",
  "svg",
  "gradient_overlay",
];

const IGNORED_CLASSES_FULL = [".simple-text-editor"];

const ALLOWED_CSS_PROPERTIES = [
  "background",
  "background-color",
  "border-color",
  "border-top-color",
  "border-bottom-color",
  "border-left-color",
  "border-right-color",
  "color",
];

const ALLOWED_CSS_PROPERTIES_REGEX =
  /.\s(background:|background-color:|border-color:|border-top-color:|border-bottom-color:|border-left-color:|border-right-color:|color:)/gm;

function isIgnoredClass(className) {
  if (typeof className !== "string") {
    return true;
  }

  if (IGNORED_CLASSES_FULL.includes(className)) {
    return true;
  }

  return IGNORE_CLASSES.some((item) => !!className?.includes(item));
}

function getClassNames(node) {
  const classNamesList = [];

  function getChildClassName(childNode) {
    // skip if the childnode is null or is in invisible status
    if (!childNode || childNode.offsetParent === null) {
      return;
    }

    const childNodeClass = childNode.className;

    if (childNodeClass && !isIgnoredClass(childNodeClass)) {
      classNamesList.push(childNodeClass);
    }

    if (!childNode.children) {
      return;
    }

    Array.from(childNode.children).map(getChildClassName);
  }

  getChildClassName(node);

  return classNamesList;
}

function getParentNodeTreeCss(node) {
  const parentNodes = [];

  const getClassName = (pNode) => {
    if (!pNode.parentNode) {
      return;
    }

    if (pNode.parentNode.className) {
      parentNodes.unshift(pNode.parentNode.className);
    }

    getClassName(pNode.parentNode);
  };

  getClassName(node);

  return parentNodes;
}

function removePseudoElements(className) {
  if (!className) {
    return className;
  }

  const pseudoStartIdx = className.indexOf(":");
  if (pseudoStartIdx == -1) {
    return className;
  }

  return className.slice(0, pseudoStartIdx);
}

function parseCssRules(classNames) {
  const styleSheets = Array.from(document.styleSheets).filter(
    (styleSheet) =>
      !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
  );

  const blockRuleList = [];

  const checkSelector = (selectorText) => {
    if (!selectorText) {
      return false;
    }

    if (IGNORE_CLASSES.some((item) => selectorText.includes(item))) {
      return false;
    }

    if (IGNORED_CLASSES_FULL.includes(selectorText)) {
      return false;
    }

    const parentClassesList = selectorText.match(/\.\S+(\s|$)/g);

    const parentClass = removePseudoElements(parentClassesList?.[0]);

    if (parentClass && classNames.includes(parentClass.trim())) {
      return classNames.some((item) => selectorText.includes(item));
    }

    return false;
  };

  const checkCssText = (cssText) => {
    return ALLOWED_CSS_PROPERTIES_REGEX.test(cssText);
  };

  styleSheets.forEach((sheet) => {
    for (const rule of sheet.cssRules) {
      const isHasAllowedProperty = checkCssText(rule.cssText);

      const isHasAllowedSelector = checkSelector(rule.selectorText);

      if (isHasAllowedProperty && isHasAllowedSelector) {
        blockRuleList.push(rule);
      }
    }
  });

  return blockRuleList;
}

function prepareCssVal(cssVal) {
  return cssVal.replace(";", "");
}

function parseCssProperties(cssText) {
  const cssStr = cssText.match(/{([^}]+)}/);

  if (!cssStr[1]) {
    return null;
  }

  let rawCss = cssStr[1]?.trim();

  if (!rawCss || !rawCss?.length) {
    return null;
  }

  const cssObject = {};

  const cssArr = rawCss.split("; ");

  // Check if the display for this css object is none
  let isShowed = true;
  cssArr.forEach((item) => {
    const [key, val] = item.split(": ");
    if (key === "display" && val === "none") {
      isShowed = false;
    }
  });

  if (isShowed) {
    cssArr.forEach((item) => {
      const [key, val] = item.split(": ");

      // @TODO add gradient parser
      if (
        ALLOWED_CSS_PROPERTIES.includes(key) &&
        !val.includes("url") &&
        !val.includes("gradient")
      ) {
        cssObject[key] = prepareCssVal(val);
      }
    });
  }

  if (isEmpty(cssObject)) {
    return null;
  }

  return cssObject;
}

function getCssObject(cssRules) {
  const cssObject = {};

  cssRules.forEach((rule) => {
    const ruleCss = parseCssProperties(rule.cssText);

    if (ruleCss && rule.selectorText) {
      // if (cssObject[rule.selectorText]) {
      //   console.log(
      //     " cssObject[rule.selectorText]",
      //     rule.selectorText,
      //     cssObject[rule.selectorText],
      //     ruleCss
      //   );
      // }

      cssObject[rule.selectorText] = ruleCss;
    }
  });

  return cssObject;
}

export default function extractCSStoObject(node, debug) {
  const isDebugActive = debug == true || window.colorEditorDebug == true;
  // const isDebugActive = true;

  if (isDebugActive) {
    console.log("START PARSE");
  }

  const classNames = getClassNames(node)
    .filter((item) => typeof item === "string")
    .map((name) => {
      if (!name.split) {
        console.log("name", name);
        return name;
      }
      return name?.split(" ");
    })
    .flat()
    .map((name) => `.${name}`);

  if (isDebugActive) {
    console.log("blockClassNames", classNames);
  }

  const rules = parseCssRules(classNames);

  if (isDebugActive) {
    console.log("cssRules", rules);
  }

  const cssObject = getCssObject(rules);

  if (isDebugActive) {
    console.log("cssObject", cssObject);
  }

  if (isDebugActive) {
    console.log("END PARSE");
  }

  return cssObject;
}
