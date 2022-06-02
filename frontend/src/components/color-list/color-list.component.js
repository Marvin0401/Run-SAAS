import React from "react";
import PropTypes from "prop-types";
import cloneDeep from "lodash.clonedeep";
import { useSelector } from "react-redux";

const ColorList = ({ handleSelectAlertNateColor }) => {
  const activePallet = useSelector((state) => state.colorPallets.activePallet);

  const COLOR_SOURCE = cloneDeep(activePallet?.colors) || [];

  return (
    <>
      {COLOR_SOURCE.map((item, index) => (
        <a
          className="block_option"
          onClick={(e) => handleSelectAlertNateColor(e, item.hex)}
          key={`colorlist-item-${index}`}
        >
          <div className="rect-icon" style={{ background: item.hex }} />
          {item.name}
        </a>
      ))}
    </>
  );
};

ColorList.propTypes = {
  handleSelectAlertNateColor: PropTypes.func.isRequired,
};

export default ColorList;
