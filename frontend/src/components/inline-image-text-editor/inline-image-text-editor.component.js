import { ReactSVG } from "react-svg";
import classnames from "classnames";
import PropTypes from "prop-types";

import RighImageTextEditor from "@assets/images/cms/inline-image-right.svg";
import CenterImageTextEditor from "@assets/images/cms/inline-image-centered.svg";
import LeftImageTextEditor from "@assets/images/cms/inline-image-left.svg";
import Slider from "@components/slider/slider.component";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";

function InlineImageTextEditor({ imageId }) {
  const [selectedAlignment, setSelectedAlignment] = useState("img-float-left");
  const [width, setWidth] = useState(20);
  const history = useHistory();

  const verify = useCallback((imageEl) => {
    "data-verify";
    if (
      !imageEl ||
      imageEl.tagName !== "IMG" ||
      imageEl.getAttribute("data-verify") !== "RUN-TEXT-EDITOR"
    ) {
      history.push(history.location.pathname);
      return true;
    }
  }, []);

  useEffect(() => {
    const imageEl = document.getElementById(imageId);
    if (verify(imageEl)) {
      return;
    }
    setSelectedAlignment(imageEl.className);
    const w = imageEl.style.width?.replace("%", "");
    setWidth((w && +w) || 20);
  }, [verify]);

  useEffect(() => {
    const imageEl = document.getElementById(imageId);
    if (verify(imageEl)) {
      return;
    }

    imageEl.className = selectedAlignment;
    imageEl.style.width = width + "%";
  }, [selectedAlignment, width, verify]);

  return (
    <div className="inline-text-image-editor">
      <h1>Inline Photo</h1>
      <div className="option_wrapper icon_row tall_icons three">
        <ReactSVG
          src={RighImageTextEditor}
          className={classnames("svg", {
            selected: "img-float-left" === selectedAlignment,
          })}
          wrapper="svg"
          onClick={() => setSelectedAlignment("img-float-left")}
        />
        <ReactSVG
          src={LeftImageTextEditor}
          className={classnames("svg", {
            selected: "img-float-right" === selectedAlignment,
          })}
          wrapper="svg"
          onClick={() => setSelectedAlignment("img-float-right")}
        />
        <ReactSVG
          src={CenterImageTextEditor}
          className={classnames("svg", {
            selected: "img-center" === selectedAlignment,
          })}
          onClick={() => setSelectedAlignment("img-center")}
          wrapper="svg"
        />
      </div>
      <hr className="big_grey" />
      <div className="option_wrapper">
        <h3 className="slider_label">Image Width</h3>
        <Slider
          min={20}
          max={50}
          values={[width]}
          onChange={(values) => setWidth(values[0])}
        />
      </div>
    </div>
  );
}

InlineImageTextEditor.propTypes = {
  imageId: PropTypes.string.isRequired,
};

export default InlineImageTextEditor;
