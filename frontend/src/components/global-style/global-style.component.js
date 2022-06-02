import React, { useMemo } from "react";

import { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import { globalStylesSelector } from "@redux/selectors/colorPallets";
import { Helmet } from "react-helmet-async";

const GlobalStyle = () => {
  const { headlineFont, bodyFont, buttonFont, fontSets } = useSelector(
    (store) => store.design
  );

  const fontsUrl = useMemo(() => {
    const weightParamStr =
      ":ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900";

    if (!fontSets || !headlineFont) {
      return "";
    }
    let url = "https://fonts.googleapis.com/css2?";

    fontSets.forEach((fontSet) => {
      url += `family=${fontSet.headline[0]}&`;
      fontSet.body.forEach((bodyFont) => (url += `family=${bodyFont}&`));
      fontSet.button.forEach((buttonFont) => (url += `family=${buttonFont}&`));
    });

    url += `family=${headlineFont.headline[0]}${weightParamStr}&`;
    headlineFont.body.forEach(
      (bodyFont) => (url += `family=${bodyFont}${weightParamStr}&`)
    );
    headlineFont.button.forEach(
      (buttonFont) => (url += `family=${buttonFont}${weightParamStr}&`)
    );

    return url + "display=swap";
  }, [fontSets, headlineFont]);

  const activePallet = useSelector((state) => state.colorPallets.activePallet);
  const globalStyles = useSelector(globalStylesSelector);

  const colors = useMemo(() => {
    const colors = activePallet?.colors || [];

    const cssColorsVariables = colors.reduce((acc, item) => {
      acc[`--${item.css_var}`] = item.hex;
      return acc;
    }, {});

    return cssColorsVariables || {};
  }, [activePallet]);

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
  ".preview_area": {
    "--headline_font": props.headlineFont,
    "--main_font": props.mainFont,
    "--button_font": props.buttonFont,
  },
  ":root": {
    ...props.colors,
  },
  ...props.globalStyles,
}));

export default GlobalStyle;
