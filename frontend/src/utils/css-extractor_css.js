/* eslint-disable no-unused-vars */
import css from "css";

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
    const childNodeClass = childNode?.className;
    if (!childNode.children) {
      return;
    }

    if (childNodeClass && !isIgnoredClass(childNodeClass)) {
      classNamesList.push(childNodeClass);
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

export default function extractCSS(node) {
  // Collect class names for a DOM subtree
  // Works for styled-components and CSS modules (anything based on CSS classes)
  const parentClassNames = getParentNodeTreeCss(node);

  // console.log("parentClassNames", parentClassNames);

  const classNames = getClassNames(node)
    .filter((item) => typeof item === "string")
    .map((name) => {
      if (!name.split) {
        return name;
      }
      return name?.split(" ");
    })
    .flat()
    .map((name) => `.${name}`);

  console.log("classNames", classNames);

  // Gets embedded CSS for the entire page
  const cssStyles = Array.from(document.head.getElementsByTagName("style"))
    .map((style) => style.innerHTML)
    .join("");

  // console.log("cssStyles", cssStyles);

  // Filters CSS for our classes
  const parsedCSS = css.parse(cssStyles);

  // console.log("parsedCSS", parsedCSS);

  // const cssStr = css.stringify(parsedCSS);
  // console.log("cssStr", parsedCSS);

  // console.log("classNames", classNames);

  const checkSelector = (selector) => {
    return classNames.some((name) => {
      if (name == "." || isIgnoredClass(selector)) {
        return false;
      }

      if (!selector.includes(name)) {
        return false;
      }

      const classList = selector.match(/\.\S+(\s|$)/g);

      // console.log(
      //   "classList",
      //   classList,
      //   classNames,
      //   classNames.includes(classList[0].trim)
      // );

      return classNames.includes(classList[0].trim());
      // return true;
    });
  };

  parsedCSS.stylesheet.rules = parsedCSS.stylesheet.rules
    .filter((rule) => rule.type === "rule")
    .filter((rule) => {
      return rule.selectors.some(checkSelector);
    });

  console.log("parsedCSS", parsedCSS);

  const blockRules = parsedCSS.stylesheet?.rules || [];
  const parsedCSSObject = {};

  blockRules.forEach((rule) => {
    const declarations = rule.declarations.filter((item) => {
      if (!item.property) {
        return false;
      }

      return ALLOWED_CSS_PROPERTIES.some(
        (css_property) => css_property == item.property
      );
    });

    if (declarations.length) {
      const cssClassesStr = rule.selectors.join(" ");
      const cssObjectProperties = declarations.reduce((acc, val) => {
        acc[val.property] = val.value;
        return acc;
      }, {});

      parsedCSSObject[cssClassesStr] = cssObjectProperties;
    }
  });

  // console.log("blockRules", blockRules);

  // console.log("parsedCSS", parsedCSS);

  console.log("parsedCSSObject", parsedCSSObject);

  // const cssStr = css.stringify(parsedCSS);
  // console.log("cssStr", cssStr);
  return parsedCSSObject;
}
