import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";

import { useSelector } from "react-redux";

import CmsLayout from "@components/cms-layout/cms-layout.component";
import ForgotPassword from "@components/forgot-password/forgot-password.component";
import Landing from "@components/landing/landing.component";
import Login from "@components/login/login.component";
import NotFound from "@components/not-found/not-found.component";
import Privacy from "@components/privacy/privacy.component";
import Register from "@components/register/register.component";
import ResetPassword from "@components/reset-password/reset-password.component";
import TermsOfService from "@components/terms-of-service/terms-of-service.component";

const RouteWithSubRoutes = ({
  component: RouteComponent,
  exact,
  path,
  routes,
}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => <RouteComponent {...props} routes={routes} />}
    />
  );
};

RouteWithSubRoutes.propTypes = {
  component: PropTypes.any,
  exact: PropTypes.bool,
  path: PropTypes.string,
  routes: PropTypes.array,
};

export const RenderRoutes = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={NotFound} />
    </Switch>
  );
};

RenderRoutes.propTypes = {
  routes: PropTypes.array,
};

const AuthenticatedRoute = (props) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Redirect to={"/login"} />;
  }

  return <RenderRoutes {...props} />;
};

const ROUTES = [
  { path: "/", key: "ROOT", exact: true, component: Landing },
  {
    path: "/forgot-password",
    key: "FORGOT_PASSWORD",
    exact: true,
    component: ForgotPassword,
  },
  { path: "/login", key: "LOGIN", exact: true, component: Login },
  { path: "/register", key: "REGISTER", exact: true, component: Register },
  {
    path: "/password-reset/:otp",
    key: "RESET_PASSWORD",
    exact: true,
    component: ResetPassword,
  },
  {
    path: "/privacy",
    key: "PRIVACY",
    exact: true,
    component: Privacy,
  },
  {
    path: "/terms",
    key: "TOS",
    exact: true,
    component: TermsOfService,
  },
  {
    path: "/cms",
    key: "CMS",
    component: AuthenticatedRoute,
    routes: [
      {
        path: "/cms",
        key: "CMS_LAYOUT",
        component: CmsLayout,
      },
    ],
  },
];

export default ROUTES;
