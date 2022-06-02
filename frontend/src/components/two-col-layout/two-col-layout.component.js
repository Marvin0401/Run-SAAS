import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Footer from "@components/footer/footer.component";

import classnames from "classnames";
import { useWindowSize } from "@react-hook/window-size";

import useStyles from "./two-col-layout.style";

const SIDE_BAR_WIDTH = 300;
const CMS_BOTTOM_CONTROLS_HEIGHT = 40;

const TwoColLayout = (props) => {
  const { children } = props;

  const [width, height] = useWindowSize();

  const centralWrapperScale = useMemo(() => {
    return 1 - SIDE_BAR_WIDTH / width;
  }, [width]);

  const scaleRatio = useMemo(() => {
    return 2 - centralWrapperScale;
  }, [centralWrapperScale]);

  const previewAreaHeight = useMemo(() => {
    return height * scaleRatio + CMS_BOTTOM_CONTROLS_HEIGHT * scaleRatio;
  }, [height, centralWrapperScale]);

  const classes = useStyles({ centralWrapperScale, previewAreaHeight });

  const [child1, child2] = children;

  return (
    <>
      <div className="main_control_bar">{child1}</div>
      <div
        className={classnames(
          "central_wrapper",
          classes.centralWrapperContainer
        )}
      >
        <div
          className={classnames("preview_area", classes.previewArea)}
          id="preview_area"
        >
          {child2}
        </div>
      </div>
      <Footer />
    </>
  );
};

TwoColLayout.propTypes = {
  children: PropTypes.arrayOf(
    (_propValue, key) =>
      Number(key) > 1 && new Error("Only two children are allowed!")
  ),
};

export default TwoColLayout;
