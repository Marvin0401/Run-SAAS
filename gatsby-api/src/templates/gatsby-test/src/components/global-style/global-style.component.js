import React, { useMemo } from "react";

import { createGlobalStyle } from "styled-components";
import { fontsSelector } from "@helpers/fonts";
import { activePaletteSelector, globalStylesSelector, colorSelector } from "@helpers/design";
import { Helmet } from "react-helmet";

const GlobalStyle = () => {
  const { headlineFont, bodyFont, buttonFont } = fontsSelector();

  const fontsUrl = useMemo(() => {
    const weightParamStr =
      ":ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900";

    if (!headlineFont) {
      return "";
    }
    let url = "https://fonts.googleapis.com/css2?";

    url += `family=${headlineFont.headline[0]}${weightParamStr}&`;
    headlineFont.body.forEach((bodyFont) => (url += `family=${bodyFont}${weightParamStr}&`));
    headlineFont.button.forEach(
      (buttonFont) => (url += `family=${buttonFont}${weightParamStr}&`)
    );

    return url + "display=swap";
  }, [headlineFont]);

  // const activePallet = activePaletteSelector();
  const globalStyles = globalStylesSelector();
  const colorsSel = colorSelector();

  const colors = useMemo(() => {
    const cssColorsVariables = colorsSel?.reduce((acc, item) => {
      acc[`--${item.css_var}`] = item.hex;
      return acc;
    }, {});

    return cssColorsVariables;
  }, [colorsSel]);

  return (
    headlineFont && (
      <>
        <Styles
          headlineFont={headlineFont.headline[0]}
          mainFont={bodyFont}
          buttonFont={buttonFont}
          colors={colors}
          globalStyles={globalStyles}
        />
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href={fontsUrl} rel="stylesheet" />
        </Helmet>
      </>
    )
  );
};

const Styles = createGlobalStyle((props) => ({
  ":root": {
    "--headline_font": props.headlineFont,
    "--main_font": props.mainFont,
    "--button_font": props.buttonFont,
    ...props.colors,
  },
  ...props.globalStyles,
}));

export default GlobalStyle;
