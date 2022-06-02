/* eslint-disable react/display-name */
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import useQuery from "@helpers/useQuery";

const CustomLink = React.forwardRef(({ children, to, onClick, id }, ref) => {
  const query = useQuery();
  const history = useHistory();

  const queries = useMemo(() => {
    return Array.from(query.values());
  }, [query]);

  const handleOnClick = (attr) => {
    onClick();
    const type = attr.target.nodeName;
    if (
      !!to &&
      !(type === "INPUT" && attr.target.type === "submit") &&
      !attr.target.closest(
        'input[type="submit"], a, button, .tweet_buttons, .open_button'
      ) &&
      (history.location.pathname !== to || queries.length)
    ) {
      history.push(to);
    }
  };

  return (
    <div onMouseUp={handleOnClick} ref={ref} id={id}>
      {children}
    </div>
  );
});

CustomLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  id: PropTypes.string,
};

export default CustomLink;
