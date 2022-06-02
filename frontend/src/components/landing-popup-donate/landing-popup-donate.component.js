import React from "react";
import PropTypes from "prop-types";

import TextEditor from "@components/text-editor/text-editor.component";

const LandingPopupDonate = ({ blockData, sharedBlockData, onChange }) => {
  const data = blockData.donateData;
  return (
    <div className="donate_popup">
      <TextEditor
        onChange={(val) => onChange({ donateData: { ...data, heading: val } })}
        value={data.heading}
        element="h1"
        charLimit={12}
        isSimple
      />
      <TextEditor
        onChange={(val) =>
          onChange({ donateData: { ...data, description: val } })
        }
        value={data.description}
        element="p"
        charLimit={75}
        isSimple
        className="popup_description"
      />
      <p className="popup_description"></p>

      <div className="donate_buttons">
        {sharedBlockData.buttonData.map((data, idx) => (
          <a href={data.url} key={idx} className="donation_amount">
            {data.amount ? `$${data.amount}` : "Other"}
          </a>
        ))}
      </div>
    </div>
  );
};

LandingPopupDonate.propTypes = {
  blockData: PropTypes.object.isRequired,
  sharedBlockData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LandingPopupDonate;
