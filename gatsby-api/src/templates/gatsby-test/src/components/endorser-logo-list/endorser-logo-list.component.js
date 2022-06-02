import React from "react";
import PropTypes from "prop-types";

import classnames from "classnames";

const EndorserLogoList = ({
  endorserOrganizationList,
  isMonochrome = false,
  numRows,
}) => {
  return (
    <div
      className={classnames("endorser_logos_wrapper", {
        monochrome: isMonochrome,
      })}
    >
      {endorserOrganizationList.slice(0, numRows * 4).map((item) => (
        <div key={item.id}>
          <img src={item.image} />
        </div>
      ))}
    </div>
  );
};

EndorserLogoList.propTypes = {
  endorserOrganizationList: PropTypes.array.isRequired,
  isMonochrome: PropTypes.bool,
  numRows: PropTypes.string.isRequired,
};

export default EndorserLogoList;
