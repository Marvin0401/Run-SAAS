import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classnames from "classnames";

const Pinstripes = ({ type }) => {
  const { pinstripes } = useSelector((store) => store.design);
  if (!pinstripes) {
    return null;
  }

  return (
    <div
      className={classnames({
        pinstripes_top: type === "top",
        pinstripes_bottom: type === "bottom",
      })}
    />
  );
};

Pinstripes.propTypes = {
  type: PropTypes.oneOf(["top", "bottom"]).isRequired,
};

export default Pinstripes;
