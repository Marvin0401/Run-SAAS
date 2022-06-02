import React from "react";
import PropTypes from "prop-types";
import TextEditor from "@components/text-editor/text-editor.component";

import { ReactSVG } from "react-svg";
import IconArrow from "@assets/images/icon_arrow-1.svg";
import IconCheck from "@assets/images/icon-check.svg";

const IssueItemsList = ({ itemList, onChangeItemContent, onReadMorePress }) => {
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

          <TextEditor
            value={item.title}
            onChange={(value) => {
              onChangeItemContent({ id: item.id, key: "title", value });
            }}
            isSimple
            charLimit={45}
            element="h2"
          />

          <TextEditor
            value={item.shortDescription || ""}
            onChange={(value) => {
              onChangeItemContent({
                id: item.id,
                key: "shortDescription",
                value,
              });
            }}
            toolbarOptions={["bold", "italic", "link"]}
            charLimit={500}
            element="p"
          />
          <a
            onClick={(e) => {
              e.preventDefault();
              onReadMorePress(item.id);
            }}
          >
            <button className="btn_style-2">
              Read more
              <ReactSVG src={IconArrow} className="arrow svg" wrapper="span" />
            </button>
          </a>
        </article>
      ))}
    </div>
  );
};

IssueItemsList.propTypes = {
  itemList: PropTypes.array.isRequired,
  onChangeItemContent: PropTypes.func.isRequired,
  onReadMorePress: PropTypes.func,
};

export default IssueItemsList;
