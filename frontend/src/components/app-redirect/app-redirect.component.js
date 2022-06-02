import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setRedirect } from "@redux/slices/nav";
import { Redirect, useLocation } from "react-router-dom";

const AppRedirect = () => {
  const dispatch = useDispatch();

  const redirect = useSelector((state) => state.nav.redirect);

  const { pathname } = useLocation();

  const pathsMatch = pathname === redirect;

  useEffect(() => {
    if (pathsMatch) {
      dispatch(setRedirect(null));
    }
  }, [dispatch, pathsMatch]);

  return !pathsMatch && redirect ? <Redirect push to={redirect} /> : null;
};

export default AppRedirect;
