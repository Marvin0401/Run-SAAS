import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Loader = ({ className }) => {
  return <div className={classnames("loader", className)} />;
};

Loader.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
  ]),
};

export default Loader;
