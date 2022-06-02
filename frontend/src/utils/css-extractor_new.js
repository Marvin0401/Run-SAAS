/* eslint-disable no-unused-vars */
import { CSSUtilities } from "./CSSUtilities";

const CSS_COLORS_RULES = [
  "color",
  "background-color",
  "border-color",
  "background",
];

const IGNORE_CLASSES = [
  "ql-",
  "quill",
  "simple-text-editor",
  "editorContainer",
  "default_style",
];
const IGNORE_TAGS = ["span", "a", "img", "p", "svg", "path", "rect"];

const isIgnored = (nodeName, className) => {
  if (!nodeName) {
    return true;
  }

  const isIgnoredNodeName = IGNORE_TAGS.includes(nodeName?.toLocaleLowerCase());

  if (isIgnoredNodeName) {
    return true;
  }

  const isIgnoredClassName = IGNORE_CLASSES.some(
    (item) => !!className.includes && className.includes(item)
  );

  if (isIgnoredClassName) {
    return true;
  }

  return false;
};

const isColorRule = (ruleName) => {
  return CSS_COLORS_RULES.includes(ruleName);
};

const isColorProperty = (properties) => {
  let isHasActiveColor = false;

  Object.keys(properties).forEach((item) => {
    if (isColorRule(item) && properties[item].status == "active") {
      isHasActiveColor = true;
    }
  });

  return isHasActiveColor;
};

const parseRules = (node) => {
  const ruleList = CSSUtilities.getCSSRules(node, "screen", "*", true);

  // ruleList.sort(function (a, b) {
  //   if (a.inheritance.length == b.inheritance.length) {
  //     if (a.specificity.toString() === b.specificity.toString()) {
  //       return a.index - b.index;
  //     }

  //     if (a.specificity[0] !== b.specificity[0]) {
  //       return a.specificity[0] - b.specificity[0];
  //     }
  //     if (a.specificity[1] !== b.specificity[1]) {
  //       return a.specificity[1] - b.specificity[1];
  //     }
  //     if (a.specificity[2] !== b.specificity[2]) {
  //       return a.specificity[2] - b.specificity[2];
  //     }
  //     return a.specificity[3] - b.specificity[3];
  //   }

  //   return b.inheritance.length - a.inheritance.length;
  // });

  // ruleList.reverse();

  const filteredRules = filterRuleList(ruleList);

  return filteredRules;
};

const filterRuleList = (ruleList) => {
  const filteredRuleList = ruleList.filter((rule) => {
    if (!rule.properties) {
      return false;
    }

    return isColorProperty(rule.properties);
  });

  return filteredRuleList;
};

const parseChildren = (node) => {
  const elList = [];

  const parseNode = (childNode) => {
    if (!childNode.children) {
      return;
    }

    const lastElem = elList.length > 0 ? elList[elList.length - 1] : null;

    if (!isIgnored(childNode.nodeName, childNode.className)) {
      console.log("childNode", childNode);
      // console.log("lastElem", lastElem);

      if (!lastElem) {
        elList.push(childNode);
      }

      if (
        lastElem &&
        childNode.nodeName !== lastElem.nodeName &&
        childNode.className !== lastElem.className
      )
        elList.push(childNode);
    }

    Array.from(childNode.children).map(parseNode);
  };

  parseNode(node);

  return elList;
};

const getStyleObject = (ruleList) => {
  const styleObject = {};

  if (!ruleList?.length) {
    return styleObject;
  }

  ruleList.forEach((item) => {
    if (
      IGNORE_CLASSES.some((ignoredClass) =>
        item.selector.includes(ignoredClass)
      )
    ) {
      return;
    }

    if (!styleObject[item.selector]) {
      styleObject[item.selector] = {};
    }

    if (item?.properties?.color && item?.properties?.color.status == "active") {
      styleObject[item.selector]["color"] = item?.properties?.color.value;
    }

    if (
      item?.properties?.background &&
      item?.properties?.background.status == "active"
    ) {
      styleObject[item.selector]["background"] =
        item?.properties?.background.value;
    }
  });

  return styleObject;
};

export default async function extractCssObject(node) {
  if (!node) {
    return;
  }

  CSSUtilities.define("async", true);
  // CSSUtilities.define("mode", "author");
  CSSUtilities.init();

  const childrenList = parseChildren(node);
  const promises = childrenList.map(async (item) => {
    return new Promise((resolve) => resolve(parseRules(item)));
  });

  const res = await Promise.all(promises);

  return res;

  // console.log("res", res);

  // START

  // let allRules = [];

  // childrenList.forEach((child) => {
  //   const rules = parseRules(child);

  //   // console.log("rules", rules);
  //   allRules = allRules.concat(rules);
  // });

  // console.log("allRules", allRules);

  // const styleObj = getStyleObject(allRules);

  // console.log("styleObj", styleObj);

  // END

  // const rulesEl = parseRules(childNode);
  // if (rulesEl.length) {
  //   rules.push(rulesEl);
  // }

  //   return [styleObj, ...Array.from(node.children).map(getClassNames)].flat();
  // const rules = node.className ? parseRules(node) : [];

  // console.log("filteredRules", rules);
}
