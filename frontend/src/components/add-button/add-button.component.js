import React from "react";
import PropTypes from "prop-types";

import { ReactSVG } from "react-svg";

import IconAdd from "@assets/images/cms/add_icon.svg";

const AddButton = ({ onClick, label }) => {
  return (
    <a className="add_button_wrapper" onClick={onClick}>
      {!!label && label}
      <ReactSVG src={IconAdd} className="svg add_button" wrapper="span" />
    </a>
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
};

export default AddButton;
