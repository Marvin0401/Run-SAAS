import React, { useRef, useEffect } from "react";

import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import classnames from "classnames";

const Drop = ({
  acceptableTypes,
  allowDrops,
  children,
  className,
  handleCanDrop,
  handleDrop,
  index,
  isList,
  nestedParentID,
  type,
}) => {
  const ref = useRef(null);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: acceptableTypes,
      canDrop: (item, monitor) => {
        if (monitor.isOver({ shallow: true })) {
          return handleCanDrop(
            item,
            type,
            index,
            nestedParentID,
            isList,
            false,
            allowDrops
          );
        }
      },
      hover: (item, monitor) => {
        if (monitor.isOver({ shallow: true }) && monitor.canDrop()) {
          ref.current.className = classnames("drop", className, "drag_hover");
        }
      },
      drop(item, monitor) {
        if (monitor.didDrop()) return;
        handleDrop(item, type, index, false, nestedParentID);
        return {};
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [handleDrop, index, nestedParentID]
  );

  useEffect(() => {
    if (!isOver) {
      ref.current.className = classnames("drop", className);
    }
  }, [isOver]);

  drop(ref);
  return (
    <ul ref={ref} className={classnames("drop", className)}>
      {children}
    </ul>
  );
};

Drop.propTypes = {
  acceptableTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  allowDrops: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  handleCanDrop: PropTypes.func.isRequired,
  handleDrop: PropTypes.func,
  index: PropTypes.number,
  isList: PropTypes.bool,
  nestedParentID: PropTypes.string,
  type: PropTypes.string.isRequired,
};
export default Drop;
