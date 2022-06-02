import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { designSelector } from "@helpers/design";

const Pinstripes = ({ type }) => {
  const { pinstripes } = designSelector();
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
