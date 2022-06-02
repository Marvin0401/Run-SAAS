import React from "react";
import PropTypes from "prop-types";

import classnames from "classnames";

const MainTabsTemplate = ({ data = [], isOpen, handleNavigateToItem }) => {
  return (
    <>
      {data.map((menuItem, index) => {
        if (menuItem.children?.length === 0) {
          return (
            <a
              key={`menu-item-${index}`}
              onClick={() => {
                handleNavigateToItem(menuItem.pageId, menuItem.link);
                // e.stopPropagation();
              }}
            >
              <div className={classnames("tab", { open: isOpen })}>
                {menuItem.title}
              </div>
            </a>
          );
        } else {
          return (
            <div
              key={`menu-item-${index}`}
              className={classnames("tab", { open: isOpen })}
            >
              <a
                onClick={() => {
                  if (!menuItem.isHidden) {
                    handleNavigateToItem(menuItem.pageId, menuItem.link);
                    // e.stopPropagation();
                  }
                }}
              >
                {menuItem.title}
              </a>
              <ul className="dropdown_tabs">
                {menuItem.children.map((dropdownItem, ddIdx) => (
                  <li key={`dropdown-item-${index}-${ddIdx}`}>
                    <a
                      onClick={() => {
                        handleNavigateToItem(
                          dropdownItem.pageId,
                          dropdownItem.link
                        );
                        // e.stopPropagation();
                      }}
                    >
                      {dropdownItem.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
      })}
    </>
  );
};

MainTabsTemplate.propTypes = {
  data: PropTypes.array,
  isOpen: PropTypes.bool,
  handleNavigateToItem: PropTypes.func.isRequired,
};

export default MainTabsTemplate;
