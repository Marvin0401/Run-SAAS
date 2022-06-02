import React, { useCallback, useState } from "react";

import PropTypes from "prop-types";

import ReactModal from "react-modal";
import classNames from "classnames";

const NotificationPopUpContext = React.createContext({});

const NotificationPopUp = ({
  children,
  isVisible,
  onClose,
  title,
  unSetModal,
  outerClassName,
  innerClassName,
  appElement = "#root",
  parentSelector,
  closeButtonClassName,
}) => {
  const [showDialog, setShowDialog] = useState(
    typeof isVisible !== "undefined" ? isVisible : true
  );

  const handleCloseDialog = () => {
    setShowDialog(false);
    onClose && onClose();
    unSetModal();
  };

  const parentSelectorFunc = () => document.querySelector(parentSelector);

  return (
    <ReactModal
      className={classNames(
        { notification_popup: !innerClassName },
        innerClassName
      )}
      contentLabel={title || "Dialog"}
      isOpen={showDialog}
      onRequestClose={handleCloseDialog}
      overlayClassName={classNames(
        { "notification_popup_outer popup": !outerClassName },
        outerClassName
      )}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      parentSelector={parentSelector && parentSelectorFunc}
      appElement={document.querySelector(appElement)}
    >
      <div
        className={closeButtonClassName || "popup_close_button"}
        onClick={handleCloseDialog}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          viewBox="0 0 100 100"
          className="svg replaced-svg"
        >
          <line
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            fill="none"
            stroke="#fff"
            strokeMiterlimit="10"
            strokeWidth="2"
          ></line>
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="0"
            fill="none"
            stroke="#fff"
            strokeMiterlimit="10"
            strokeWidth="2"
          ></line>
        </svg>
      </div>
      <div>
        {title && <div className="notification_heading">{title}</div>}
        {children && children}
      </div>
    </ReactModal>
  );
};

NotificationPopUp.propTypes = {
  children: PropTypes.node,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  unSetModal: PropTypes.any,
  innerClassName: PropTypes.string,
  outerClassName: PropTypes.string,
  appElement: PropTypes.string,
  parentSelector: PropTypes.string,
  closeButtonClassName: PropTypes.string,
};

export default NotificationPopUp;

const NotificationPopUpProvider = (props) => {
  const [popUp, setPopUp] = useState();

  const unsetPopUp = useCallback(() => {
    setPopUp(undefined);
  }, [setPopUp]);

  return (
    <NotificationPopUpContext.Provider
      value={{
        unsetPopUp,
        setPopUp,
      }}
      {...props}
    >
      {props.children}
      {popUp && <NotificationPopUp unSetModal={unsetPopUp} {...popUp} />}
    </NotificationPopUpContext.Provider>
  );
};

const useNotificationPopUp = () => {
  const context = React.useContext(NotificationPopUpContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a UserProvider");
  }

  return context;
};

NotificationPopUpProvider.propTypes = {
  children: PropTypes.node,
};

export { NotificationPopUpProvider, useNotificationPopUp };
