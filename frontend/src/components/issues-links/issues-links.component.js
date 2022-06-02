import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const IssuesLinks = ({ activeItemId, itemList, onPress }) => {
  return (
    <div className="side_menu column">
      {itemList.map((item) => (
        <div className="side_menu_item" key={item.id}>
          <a
            onClick={(e) => {
              e.preventDefault();
              onPress(item.id);
            }}
            className={classnames({ active: activeItemId === item.id })}
          >
            {item.title}
          </a>
        </div>
      ))}
    </div>
  );
};

IssuesLinks.propTypes = {
  activeItemId: PropTypes.string,
  itemList: PropTypes.array.isRequired,
  onPress: PropTypes.func,
};

export default IssuesLinks;
