import React from "react";
import PropTypes from "prop-types";

const NewsLinks = ({ itemList, onPress }) => {
  return (
    <div className="side_menu column">
      {itemList.map((item) => (
        <div className="side_menu_item" key={item.id}>
          <div className="type_of_post">{item.type}</div>
          <a
            onClick={(e) => {
              e.preventDefault();
              onPress(item.id, item.link);
            }}
          >
            {item.title}
          </a>
        </div>
      ))}
    </div>
  );
};

NewsLinks.propTypes = {
  itemList: PropTypes.array.isRequired,
  onPress: PropTypes.func,
};

export default NewsLinks;
