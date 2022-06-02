import React, { useState } from "react";
import { ReactSVG } from "react-svg";

import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import IconTrash from "@assets/images/cms/list_icon-trash.svg";
import LinkIcon from "@assets/images/cms/list_icon-link.svg";
import EditIcon from "@assets/images/cms/list_icon-edit.svg";
import IconOpenButton from "@assets/images/open_button.svg";
import { ACTIONS_TYPES } from "@components/custom-block-filter/custom-block-filter-config.constants";

const CustomBlockFilterItem = ({
  item,
  listItemPropHandler,
  deleteContentItem,
  actions,
  blockId,
}) => {
  const [isLinkEnabled, setIsLinkEnabled] = useState(!!item.link);
  const history = useHistory();
  const editHandler = ({ id }) => {
    history.push(`${blockId}/${id}`);
  };
  return (
    <>
      <li key={item.id}>
        <div className="row_wrapper">
          <input
            onChange={(e) =>
              listItemPropHandler({
                updatedPropObj: {
                  title: e.target.value,
                },
                item,
              })
            }
            type="text"
            value={item.title}
          />
          {actions.includes(ACTIONS_TYPES.EDIT) && (
            <ReactSVG
              src={EditIcon}
              className="svg"
              onClick={() => {
                editHandler({
                  id: item.id,
                });
              }}
              wrapper="span"
            />
          )}
          {actions.includes(ACTIONS_TYPES.LINK) && (
            <ReactSVG
              src={LinkIcon}
              className="svg"
              onClick={() => {
                if (!isLinkEnabled) {
                  listItemPropHandler({
                    updatedPropObj: {
                      link: "",
                    },
                    item,
                  });
                }
                setIsLinkEnabled(!isLinkEnabled);
              }}
              wrapper="span"
            />
          )}

          {actions.includes(ACTIONS_TYPES.DELETE) && (
            <ReactSVG
              src={IconTrash}
              className="svg"
              onClick={() => {
                deleteContentItem({
                  id: item.id,
                });
              }}
              wrapper="span"
            />
          )}
          <ReactSVG
            beforeInjection={(svg) => svg.classList.add("handle")}
            src={IconOpenButton}
            className="svg drag_icon"
            wrapper="span"
          />
        </div>
      </li>
      {isLinkEnabled && (
        <div className="input_wrapper">
          <label>Links To</label>
          <input
            type="text"
            value={item.link}
            onChange={(e) =>
              listItemPropHandler({
                updatedPropObj: {
                  link: e.target.value,
                },
                item,
              })
            }
          />
        </div>
      )}
    </>
  );
};

CustomBlockFilterItem.propTypes = {
  item: PropTypes.object.isRequired,
  listItemPropHandler: PropTypes.func.isRequired,
  deleteContentItem: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired,
  blockId: PropTypes.string,
};

export default CustomBlockFilterItem;
