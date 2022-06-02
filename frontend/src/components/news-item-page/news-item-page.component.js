import React from "react";
import PropTypes from "prop-types";

import TextEditor from "@components/text-editor/text-editor.component";

const NewsItemPage = ({ item, onChangeContent }) => {
  return (
    <div className="full_news_item_wrapper main_text column">
      <div className="news_date_block">
        <div className="month">JAN</div>
        <div className="day">1</div>
        <div className="year">2020</div>
      </div>

      <div className="type_of_post">{item.title}</div>

      <TextEditor
        value={item.title}
        onChange={(value) => {
          onChangeContent({ id: item.id, key: "title", value });
        }}
        isSimple
        charLimit={150}
        element="h3"
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

NewsItemPage.propTypes = {
  item: PropTypes.object.isRequired,
  onChangeContent: PropTypes.func.isRequired,
};

export default NewsItemPage;
