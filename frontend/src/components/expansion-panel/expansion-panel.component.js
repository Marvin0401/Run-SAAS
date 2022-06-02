import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import PropTypes from "prop-types";
import IconArrow from "@assets/images/icon_arrow-1.svg";
import classnames from "classnames";

const ExpansionPanel = ({ title, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div>
        <div className="expansion-panel">
          <div
            className="expansion-header"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="expansion-title">{title}</div>
            <div className="expansion-icon">
              <ReactSVG
                src={IconArrow}
                className={classnames("svg arrow", {
                  arrowDown: isExpanded,
                })}
                wrapper="span"
              />
            </div>
          </div>
          {isExpanded && (
            <div className="expansion-body">
              <p className="expansion-description">{description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

ExpansionPanel.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ExpansionPanel;
