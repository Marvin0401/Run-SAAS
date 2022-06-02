import React from "react";
import PropTypes from "prop-types";

const IssueItem = ({ item }) => {
  return (
    <div className="issues_item_wrapper column">
      <h2 className="eyebrow" dangerouslySetInnerHTML={{__html: item.eyebrow}} />
      <h2 dangerouslySetInnerHTML={{__html: item.title}} />

      <div className="quill_editor_custom_style" dangerouslySetInnerHTML={{__html: item.description}}/>

    </div>
  );
};

IssueItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default IssueItem;
