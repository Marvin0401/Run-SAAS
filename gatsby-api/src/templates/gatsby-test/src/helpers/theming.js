import camelCase from "lodash.camelcase";

const cssToJs = (cssObj) => {
  const jsStyles = {};

  for (const [key, val] of Object.entries(cssObj)) {
    jsStyles[camelCase(key)] = val;
  }

  return jsStyles;
};

export const parseCss = (elemClassName, theme) => {
  let styles = {};

  if (!theme) {
    return styles;
  }

  Object.keys(theme).forEach((cssClass) => {
    const rawClassName = cssClass.substring(1);

    if (elemClassName.includes(rawClassName)) {
      styles = cssToJs(theme[cssClass]);
    }
  });

  return styles;
};
