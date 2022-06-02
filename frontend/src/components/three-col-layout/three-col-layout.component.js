/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Footer from "@components/footer/footer.component";

import classnames from "classnames";
import { useWindowSize } from "@react-hook/window-size";
import { createGlobalStyle } from "styled-components";

import useStyles from "./three-col-layout.style";

const SIDE_BAR_WIDTH = 300;
const CMS_BOTTOM_CONTROLS_HEIGHT = 40;
const MOBILE_VIEW_WIDTH = 480;

const ThreeColLayout = (props) => {
  const { children } = props;
  const [child1, child2, child3] = children;

  const [width, height] = useWindowSize();

  const [isMobile, setIsMobile] = useState(false);
  const [scrollWidth, setScrollWidth] = useState();

  const centralWrapperScale = useMemo(() => {
    if (isMobile) {
      return 1;
    }
    if (child3) {
      return 1 - (SIDE_BAR_WIDTH * 2) / width;
    }

    return 1 - SIDE_BAR_WIDTH / width;
  }, [width, children, isMobile]);

  const centralWrapperWidth = useMemo(() => {
    if (child3) {
      return width - 2 - SIDE_BAR_WIDTH * 2;
    }
    return width - 2 - SIDE_BAR_WIDTH;
  }, [width, children]);

  const previewAreaWidth = useMemo(() => {
    if (isMobile) {
      return MOBILE_VIEW_WIDTH;
    }
    if (child3) {
      return width * centralWrapperScale + SIDE_BAR_WIDTH * 2;
    }
    return width * centralWrapperScale + SIDE_BAR_WIDTH;
  }, [width, children, isMobile]);

  const scaleRatio = useMemo(() => {
    return 2 - centralWrapperScale;
  }, [centralWrapperScale]);

  const previewAreaHeight = useMemo(() => {
    const scalePercent = 100 * centralWrapperScale;
    const diff = 100 - scalePercent;
    const actualHeight = 100 + diff;
    return actualHeight;
  }, [centralWrapperScale]);

  const footerDiff = useMemo(() => {
    return (4 / 100) * (100 * centralWrapperScale);
  }, [centralWrapperScale]);

  const classes = useStyles({
    centralWrapperScale,
    // previewAreaHeight,
    isMobile,
  });

  const handleMobileView = (flag) => {
    setIsMobile(flag);
  };

  useEffect(() => {
    const scrollDiv = document.createElement("div");
    scrollDiv.style.width = "100px";
    scrollDiv.style.height = "100px";
    scrollDiv.style.overflow = "scroll";
    scrollDiv.style.position = "absolute";
    scrollDiv.style.top = "-9999px";
    document.body.appendChild(scrollDiv);

    // Get the scrollbar width
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

    // Delete the DIV
    document.body.removeChild(scrollDiv);

    setScrollWidth(scrollbarWidth);
  }, []);

  return (
    <>
      <div className="main_control_bar">{child1}</div>
      <Styles
        mobile_view_width={`${MOBILE_VIEW_WIDTH}px`}
        scrollWidth={scrollWidth}
      />
      <div
        className={classnames(
          "central_wrapper",
          classes.centralWrapperContainer
        )}
        style={{ width: centralWrapperWidth }}
      >
        <div
          className={classnames("preview_area", classes.previewArea, {
            mobile_view: isMobile,
            desktop_view: !isMobile,
          })}
          style={{
            width: previewAreaWidth,
            height: `calc(${previewAreaHeight}vh - ${footerDiff}rem)`,
          }}
        >
          {child2}
        </div>
      </div>
      <Footer handleMobileView={handleMobileView} />

      {!!child3 && (
        <div
          className="main_control_bar_wrapper palette_bar"
          style={{ width: SIDE_BAR_WIDTH }}
        >
          {child3}
        </div>
      )}
    </>
  );
};

ThreeColLayout.propTypes = {
  children: PropTypes.arrayOf(
    (_propValue, key) =>
      Number(key) > 2 && new Error("Only three children are allowed!")
  ),
};

const Styles = createGlobalStyle`
  :root {
    --mobile_view_width: ${(props) => props.mobile_view_width};
    --scrollbar_width: ${(props) => props.scrollWidth}px;
  }
`;

export default ThreeColLayout;
