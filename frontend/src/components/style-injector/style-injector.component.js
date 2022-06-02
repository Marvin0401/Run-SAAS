/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { deepMap } from "react-children-utilities";
import { parseCss } from "@helpers/theming";

const StyleInjector = ({ children, theme }) => {
  return (
    <React.Fragment>
      {deepMap(children, (child) => {
        if (child && !!child.props?.className) {
          return React.cloneElement(child, {
            ...child.props,
            className: `${child.props.className}`,
            style: {
              ...child.props.style,
              ...parseCss(child.props.className, theme),
            },
          });
        }
        return child;
      })}
    </React.Fragment>
  );
};

StyleInjector.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object,
};

export default StyleInjector;
