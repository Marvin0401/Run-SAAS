import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { SET_ERROR } from "@redux/actions/types";

import { useNotificationPopUp } from "@components/notification-pop-up/notification-pop-up.component";

const ErrorPopup = () => {
  const [isDisplaying, setIsDisplaying] = useState(false);

  const dispatch = useDispatch();

  const { setPopUp } = useNotificationPopUp();

  const error = useSelector((state) => state.error.error);

  const handleOnClose = () => {
    setIsDisplaying(false);
    dispatch({ type: SET_ERROR, payload: null });
  };

  const display = error && !isDisplaying && error?.status !== 401;

  useEffect(() => {
    if (display) {
      setIsDisplaying(true);

      setPopUp({
        title: "An Error Occurred",
        children: (
          <p>
            {error.data?.message ||
              error.data?.password?.[0] ||
              error.data?.detail ||
              error.data?.email?.[0]}
          </p>
        ),
        onClose: handleOnClose,
      });
    }
  }, [dispatch, display, handleOnClose]);

  return null;
};

export default ErrorPopup;
