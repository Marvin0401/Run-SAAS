import React, { useEffect, useState } from "react";
import { getAccountDetails } from "@redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

const ActiveSubscription = () => {
  const dispatch = useDispatch();
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const isPaying = useSelector((state) => state.auth.user?.is_paying);

  useEffect(() => {
    setFetchingDetails(true);
    const id = setInterval(() => {
      if (isPaying) {
        clearInterval(id);
        setFetchingDetails(false);
        return;
      }
      dispatch(getAccountDetails());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [dispatch, isPaying]);

  return (
    <>
      <div className="full_screen_control_bar">
        <div className="full_screen_control_bar-inner_wrapper">
          {fetchingDetails ? (
            <>
              <h2>Loading Zoho Response...</h2>
            </>
          ) : (
            <>
              <h2>Thank you!</h2>
              <p>
                Your subscription is now active. You can now hook up your custom
                domain and publish your site.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ActiveSubscription;
