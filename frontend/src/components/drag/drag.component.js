import React, { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import classnames from "classnames";

const Drag = ({
  children,
  handleCanDrop,
  handleDrop,
  hasNestedChildren,
  id,
  index,
  isNested = false,
  isNestingAllowed,
  listType,
  nestedParentID,
  onHover,
  type,
  isSameListAllowed = false,
}) => {
  const ref = useRef(null);
  const previewRef = useRef(null);

  const [{ opacity }, drag, preview] = useDrag(
    () => ({
      type,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.3 : 1,
      }),
      item: {
        id,
        index,
        listType,
        nestedParentID,
        type,
      },
      previewOptions: {
        captureDraggingState: false,
      },
    }),
    [id, index, listType, nestedParentID]
  );

  const [{ didDrop, removeClass }, drop] = useDrop(
    {
      accept: type,
      canDrop: (item, monitor) => {
        if (monitor.isOver({ shallow: true })) {
          return handleCanDrop(
            item,
            listType,
            index,
            nestedParentID,
            false,
            hasNestedChildren
          );
        }
      },
      hover: (item, monitor) => {
        if (!ref.current) {
          return;
        }
        let hoverIndex = index;
        let dragIndex = item.index;
        // dont update when hovering over itself
        if (item.listType === listType && dragIndex === hoverIndex) {
          return;
        }

        if (isNestingAllowed) {
          ref.current.className = "drag_hover";
          onHover(listType, hoverIndex, ref);
          return;
        }

        hoverIndex = modifyHoverIndex(item, monitor, hoverIndex);
        onHover(listType, hoverIndex, ref);
      },
      drop(item, monitor) {
        if (monitor.didDrop()) return;
        let hoverIndex = index;
        if (!isNestingAllowed) {
          hoverIndex = modifyHoverIndex(item, monitor, hoverIndex);
        }
        handleDrop(
          item,
          listType,
          hoverIndex,
          isNestingAllowed,
          nestedParentID,
          hasNestedChildren
        );
        return {};
      },
      collect: (monitor) => {
        let removeClass = false;

        if (ref.current && monitor.isOver()) {
          const hoverBoundingRect = ref.current.getBoundingClientRect();
          const clientOffset = monitor.getClientOffset();
          if (
            clientOffset.x > hoverBoundingRect.right ||
            clientOffset.x < hoverBoundingRect.left ||
            clientOffset.y < hoverBoundingRect.top ||
            clientOffset.y > hoverBoundingRect.bottom
          ) {
            removeClass = true;
          }
        }
        return {
          didDrop: monitor.didDrop(),
          removeClass,
        };
      },
    },
    [index, listType, handleDrop, isNestingAllowed, nestedParentID]
  );
  useEffect(() => {
    if (!previewRef.current) return;
    ref.current.className = "";
  }, [didDrop, removeClass]);

  const modifyHoverIndex = (item, monitor, hoverIndex) => {
    // Determine rectangle on screen
    const hoverBoundingRect = ref.current.getBoundingClientRect();
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    if (hoverClientY > hoverMiddleY) {
      // add to bottom
      ref.current.className = "hover-bottom";
      if (item.listType !== listType || isSameListAllowed) hoverIndex++;
    } else {
      ref.current.className = "hover-top";
    }

    return hoverIndex;
  };

  drag(drop(ref));
  preview(previewRef);
  return (
    <>
      <div
        ref={previewRef}
        style={{ opacity }}
        className={classnames("drag", { subpage: isNested })}
      >
        <ul ref={ref}>{children}</ul>
      </div>
    </>
  );
};

Drag.propTypes = {
  children: PropTypes.node,
  handleCanDrop: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  hasNestedChildren: PropTypes.bool,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isNested: PropTypes.bool,
  isNestingAllowed: PropTypes.bool,
  listType: PropTypes.string.isRequired,
  nestedParentID: PropTypes.string,
  onHover: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  isSameListAllowed: PropTypes.bool,
};
export default Drag;
