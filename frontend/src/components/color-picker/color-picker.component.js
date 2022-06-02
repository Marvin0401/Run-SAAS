import React, { useState } from "react";
import PropTypes from "prop-types";
import { HexColorPicker } from "react-colorful";

const presetColors = ["#cd9323", "#1a53d8", "#9a2151", "#0d6416", "#8d2808"];

const ColorPicker = ({ color = "#fff", handleSelectColor }) => {
  const [colorCloned, setColor] = useState(color);
  return (
    <div className="color-picker">
      <HexColorPicker
        color={colorCloned}
        onChange={handleSelectColor}
      ></HexColorPicker>
      <div className="color-picker-swatches">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            className="color-picker-swatch"
            style={{ background: presetColor }}
            onClick={() => setColor(presetColor)}
          />
        ))}
      </div>
    </div>
  );
};

ColorPicker.propTypes = {
  color: PropTypes.string,
  handleSelectColor: PropTypes.func.isRequired,
};

export default ColorPicker;
