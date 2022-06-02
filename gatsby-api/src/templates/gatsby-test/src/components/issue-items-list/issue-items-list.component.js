import React from "react";
import PropTypes from "prop-types";

import { ReactSVG } from "react-svg";
import IconArrow from "@assets/images/icon_arrow-1.svg";
import IconCheck from "@assets/images/icon-check.svg";

const IssueItemsList = ({ itemList, onReadMorePress }) => {
  return (
    <div className="issues_list_wrapper column">
      {itemList.map((item) => (
        <article className="issues_item-page" key={item.id}>
          <div className="graphic_wrapper">
            <ReactSVG
              src={IconCheck}
              className="checkmark_icon svg"
              wrapper="span"
            />
          </div>

          <h2 dangerouslySetInnerHTML={{__html: item.title}} />

          <div className="quill_editor_custom_style" dangerouslySetInnerHTML={{__html:item.shortDescription}}/>

          <a
            onClick={(e) => {
              e.preventDefault();
              onReadMorePress(item.id);
            }}
          >
            <button className="btn_style-2">
              Read more
              <ReactSVG
                src={IconArrow}
                className="arrow svg"
                wrapper="span"
              />
            </button>
          </a>
        </article>
      ))}
    </div>
  );
};

IssueItemsList.propTypes = {
  itemList: PropTypes.array.isRequired,
  onReadMorePress: PropTypes.func,
};

export default IssueItemsList;
