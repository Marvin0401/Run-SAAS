import React from "react";
import PropTypes from "prop-types";

import TextEditor from "@components/text-editor/text-editor.component";

const IssueItem = ({ item, onChangeContent }) => {
  return (
    <div className="issues_item_wrapper column">
      <TextEditor
        value={item.eyebrow || ""}
        onChange={(value) => {
          onChangeContent({ id: item.id, key: "eyebrow", value });
        }}
        isSimple
        charLimit={45}
        element="h2"
        className="eyebrow"
      />
      <TextEditor
        value={item.title}
        onChange={(value) => {
          onChangeContent({ id: item.id, key: "title", value });
        }}
        isSimple
        charLimit={80}
        element="h2"
      />

      <TextEditor
        value={item.description || ""}
        onChange={(value) => {
          onChangeContent({ id: item.id, key: "description", value });
        }}
        toolbarOptions={[
          "bold",
          "italic",
          "h2",
          "h3",
          "h4",
          "link",
          "list",
          "image",
        ]}
        charLimit={-1}
      />
    </div>
  );
};

IssueItem.propTypes = {
  item: PropTypes.object.isRequired,
  onChangeContent: PropTypes.func.isRequired,
};

export default IssueItem;
