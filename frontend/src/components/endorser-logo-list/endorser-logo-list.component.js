import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import classnames from "classnames";

const EndorserLogoList = ({
  endorserOrganizationList,
  isMonochrome = false,
  numRows,
  blockID,
  pageID,
  style,
}) => {
  return (
    <Link
      to={`/cms/page/${pageID}/block/${blockID}/featured-organizations`}
      className={classnames("endorser_logos_wrapper", {
        monochrome: isMonochrome,
      })}
      style={style}
    >
      {endorserOrganizationList.slice(0, numRows * 4).map((item) => (
        <div key={item.id}>
          <img src={item.image} />
        </div>
      ))}
    </Link>
  );
};

EndorserLogoList.propTypes = {
  endorserOrganizationList: PropTypes.array.isRequired,
  isMonochrome: PropTypes.bool,
  numRows: PropTypes.string.isRequired,
  blockID: PropTypes.string.isRequired,
  pageID: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default EndorserLogoList;
