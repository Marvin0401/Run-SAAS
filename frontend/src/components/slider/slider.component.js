import React from "react";
import { Range } from "react-range";
import PropTypes from "prop-types";

const Slider = ({ values, onChange, min = 0, max = 15, step = 1 }) => {
  return (
    <Range
      step={step}
      min={min}
      max={max}
      values={values}
      onChange={onChange}
      renderTrack={({ props, children }) => (
        <div {...props} className="slider_track">
          {children}
        </div>
      )}
      renderThumb={({ props }) => <div {...props} className="slider_thumb" />}
    />
  );
};

Slider.propTypes = {
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  step: PropTypes.number,
};

export default Slider;
