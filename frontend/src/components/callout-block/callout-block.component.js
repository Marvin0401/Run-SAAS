import React from "react";
import { ReactSVG } from "react-svg";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import classnames from "classnames";

import IconBasicText from "@assets/images/cms/block_icon-basic_text.svg";
import IconTextSidebar from "@assets/images/cms/block_icon-text_sidebar.svg";
import IconBulletGrid from "@assets/images/cms/block_icon-bullet_grid.svg";

import { BLOCK_TYPES, BLOCK_VARIANT } from "@constants";

const dataHash = {
  [BLOCK_TYPES.QUOTE]: {
    title: "Quote",
    icon: IconBasicText,
  },
  [BLOCK_TYPES.QUOTE_IMAGE]: {
    title: "Quote with photo",
    icon: IconTextSidebar,
  },
  [BLOCK_TYPES.DATA_DETAILS]: {
    title: "Data details",
    icon: IconBulletGrid,
  },
  NONE: {
    title: "None",
  },
};
const CalloutBlock = ({ calloutData, onChange }) => {
  const { blockId, pageId } = useParams();
  const data = {
    id: uuidv4(),
    variant: BLOCK_VARIANT.CALLOUT,
    data: uuidv4(),
  };

  return (
    <div className="block_config">
      {Object.entries(dataHash).map(([type, { title, icon }]) => {
        switch (type) {
          case "NONE":
            return (
              <Link
                to={`/cms/page/${pageId}/block/${blockId}/callout`}
                className={classnames("block_option", {
                  selected: !calloutData,
                })}
                onClick={() => onChange({ callout: null }, true)}
                key={type}
              >
                <div className="none svg" />
                {title}
              </Link>
            );
          default:
            return (
              <Link
                to={`/cms/page/${pageId}/block/${blockId}/callout`}
                className={classnames("block_option", {
                  selected: calloutData && calloutData.type === type,
                })}
                onClick={() =>
                  onChange({
                    ...data,
                    type,
                    title,
                  })
                }
                key={type}
              >
                <ReactSVG src={icon} className="svg" wrapper="div" />
                {title}
              </Link>
            );
        }
      })}
    </div>
  );
};

CalloutBlock.propTypes = {
  onChange: PropTypes.func.isRequired,
  calloutData: PropTypes.object,
};

export default CalloutBlock;
