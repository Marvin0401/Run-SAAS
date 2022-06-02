import React from "react";
import PropTypes from "prop-types";

const BlockConfigLandingPopupGeneral = ({ data, onChange }) => {
  return (
    <div className="option_group">
      <div className="option_wrapper">
        <input
          type="checkbox"
          className="toggle_button"
          checked={data.showDescription}
          onChange={() =>
            onChange({
              generalData: { ...data, showDescription: !data.showDescription },
            })
          }
        />
        <div className="toggle_label">Show/hide description</div>
        <hr className="spacer" style={{ width: "100%" }} />
      </div>
      <div className="option_wrapper">
        <div className="input_wrapper">
          <label>Button URL:</label>
          <input
            type="url"
            value={data.buttonUrl}
            onChange={(e) =>
              onChange({
                generalData: { ...data, buttonUrl: e.target.value },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

BlockConfigLandingPopupGeneral.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BlockConfigLandingPopupGeneral;
