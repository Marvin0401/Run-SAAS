import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@redux/slices/auth";

const Unauthorized = () => {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.error.error);

  useEffect(() => {
    if (error && error?.status === 401) {
      dispatch(logout());
    }
  }, [dispatch, error]);

  return null;
};

export default Unauthorized;
