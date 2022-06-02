import React from "react";
import PropTypes from "prop-types";

const NewsItemPage = ({ item }) => {
  return (
    <div className="full_news_item_wrapper main_text column">
      <div className="news_date_block">
        <div className="month">JAN</div>
        <div className="day">1</div>
        <div className="year">2020</div>
      </div>

      <div className="type_of_post">{item.title}</div>

      <h3 dangerouslySetInnerHTML={{__html: item.title}} />

      <div className="quill_editor_custom_style" dangerouslySetInnerHTML={{__html: item.description}} />

    </div>
  );
};

NewsItemPage.propTypes = {
  item: PropTypes.object.isRequired,
};

export default NewsItemPage;
