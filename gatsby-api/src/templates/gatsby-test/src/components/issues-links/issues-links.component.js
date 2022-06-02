import React from "react";
import PropTypes from "prop-types";

const IssuesLinks = ({ itemList, onPress }) => {
  return (
    <div className="side_menu column">
      {itemList.map((item) => (
        <div className="side_menu_item" key={item.id}>
          <a
            onClick={(e) => {
              e.preventDefault();
              onPress(item.id);
            }}
          >
            {item.title}
          </a>
        </div>
      ))}
    </div>
  );
};

IssuesLinks.propTypes = {
  itemList: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default IssuesLinks;
