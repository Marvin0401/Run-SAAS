import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import classnames from "classnames";

const MainTabsTemplate = ({ data = [], isOpen, handleNavigate }) => {

  return (
    <>
      {data && data.map((menuItem, index) => {
        if (menuItem.children?.length === 0) {
          return (
            <a
              key={`menu-item-${index}`}
              onClick={() =>
                handleNavigate(menuItem.slug, menuItem.link)
              }
              className="tab"
            >
              <div className={classnames({ open: isOpen })}>
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
                onClick={() =>
                  !menuItem.isHidden &&
                  handleNavigate(menuItem.slug, menuItem.link)
                }
              >
                {menuItem.title}
              </a>
              <ul className="dropdown_tabs">
                {menuItem.children.map((dropdownItem, ddIdx) => (
                  <li key={`dropdown-item=${index}-${ddIdx}`}>
                    <a
                      onClick={() =>
                        handleNavigate(dropdownItem.slug, dropdownItem.link)
                      }
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
  handleNavigate: PropTypes.func.isRequired,
};

export default MainTabsTemplate;
