import React from "react";
import PropTypes from "prop-types";

import classnames from "classnames";

const SimplePopUp = ({
  cssName = "block_popup",
  children,
  label,
  isVisible,
  onClose,
}) => {
  return (
    <div
      className={classnames(cssName, { visible: isVisible })}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {!!label && <div className="cms_popup_label">{label}</div>}
        {children}
      </div>
    </div>
  );
};

SimplePopUp.propTypes = {
  cssName: PropTypes.string,
  children: PropTypes.node,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  label: PropTypes.string,
};

export default SimplePopUp;
