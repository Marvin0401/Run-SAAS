import React from "react";
import { ReactSVG } from "react-svg";
import PropTypes from "prop-types";

import IconArrow from "@assets/images/icon_arrow-1.svg";
import TextEditor from "@components/text-editor/text-editor.component";

const LandingPopupGeneral = ({ blockData, onChange }) => {
  const data = blockData.generalData;

  return (
    <div className="general_landing_popup">
      <TextEditor
        onChange={(val) => {
          onChange({ generalData: { ...data, heading: val } });
        }}
        value={data.heading}
        element="h2"
        charLimit={50}
        isSimple
      />
      {data.showDescription && (
        <TextEditor
          onChange={(val) => {
            onChange({ generalData: { ...data, description: val } });
          }}
          value={data.description}
          element="p"
          charLimit={200}
          isSimple
          className="popup_description"
        />
      )}

      <button className="btn_style-2">
        <TextEditor
          onChange={(val) => {
            onChange({ generalData: { ...data, buttonText: val } });
          }}
          value={data.buttonText}
          element="span"
          charLimit={20}
          isSimple
        />
        <ReactSVG
          src={IconArrow}
          className="svg arrow replaced-svg"
          wrapper="svg"
        />
      </button>
    </div>
  );
};

LandingPopupGeneral.propTypes = {
  blockData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LandingPopupGeneral;
