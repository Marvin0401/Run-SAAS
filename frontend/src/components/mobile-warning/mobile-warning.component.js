import React from "react";

import PropTypes from "prop-types";

const MobileWarning = (props) => {
  return (
    <>
      <div className="no_mobile_message">
        The RUN! content management system is not available on phones.
      </div>
      {props.children}
    </>
  );
};

MobileWarning.propTypes = {
  children: PropTypes.node,
};

export default MobileWarning;
