import React from "react";
import { Popover, ArrowContainer } from "react-tiny-popover";
import PropTypes from "prop-types";

const PopoverContainer = ({
  children,
  content,
  isPopoverOpen,
  setIsPopoverOpen,
}) => {
  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["right"]}
      padding={10}
      onClickOutside={() => {
        setIsPopoverOpen(false);
      }}
      containerStyle={{ width: "200px" }}
      containerClassName={"popover"}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor={"blue"}
          arrowSize={10}
          className="popover-arrow-container"
          arrowClassName="popover-arrow"
        >
          {content}
        </ArrowContainer>
      )}
    >
      {children}
    </Popover>
  );
};

PopoverContainer.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  isPopoverOpen: PropTypes.bool.isRequired,
  setIsPopoverOpen: PropTypes.func.isRequired,
};

export default PopoverContainer;
