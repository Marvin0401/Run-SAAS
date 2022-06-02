import React from "react";

import { Route, Switch } from "react-router-dom";

import { useSelector } from "react-redux";
import { isSuperAdminSelector } from "@redux/selectors/auth";

import AccountSettings from "@components/account-settings/account-settings.component";
import ActiveSubscription from "@components/active-subscription/active-subscription.component";
import EditorLayout from "@components/editor-layout/editor-layout.component";
import Initialize from "@components/initialize/initialize.component";
import MobileWarning from "@components/mobile-warning/mobile-warning.component";
import PaletteManager from "@components/palette-manager/palette-manager.component";
import SiteSettings from "../site-settings/site-settings.component";
import TopNav from "@components/top-nav/top-nav.component";
import Unauthorized from "@components/unauthorized/unauthorized.component";
import FontSettings from "@components/font-settings/font-settings.component";

import CmsRouteWrapper from "../cms-route-wrapper/cms-route-wrapper.component";
import HelpSupport from "@components/help-support/help-support.component";

const CmsLayout = () => {
  const isSuperAdmin = useSelector(isSuperAdminSelector);

  return (
    <div className="cms cms_wrapper">
      <Unauthorized />
      <Initialize>
        <MobileWarning>
          <TopNav />
          <Switch>
            {/* Any full page screens in the cms should have an entry in this switch */}
            <Route exact path="/cms/account-settings">
              <CmsRouteWrapper>
                <AccountSettings />
              </CmsRouteWrapper>
            </Route>
            <Route exact path="/cms/site-settings">
              <CmsRouteWrapper>
                <SiteSettings />
              </CmsRouteWrapper>
            </Route>
            <Route exact path="/cms/support">
              <CmsRouteWrapper>
                <HelpSupport />
              </CmsRouteWrapper>
            </Route>
            <Route exact path="/cms/active-subscription">
              <CmsRouteWrapper>
                <ActiveSubscription />
              </CmsRouteWrapper>
            </Route>
            {isSuperAdmin && (
              <Route exact path="/cms/font-settings">
                <CmsRouteWrapper>
                  <FontSettings />
                </CmsRouteWrapper>
              </Route>
            )}
            {isSuperAdmin && (
              <Route exact path="/cms/palette-editor">
                <CmsRouteWrapper>
                  <PaletteManager />
                </CmsRouteWrapper>
              </Route>
            )}
            {/* Any screens that have a left column and the site preview should be inside the EditorLayout */}
            <EditorLayout />
          </Switch>
        </MobileWarning>
      </Initialize>
    </div>
  );
};

export default CmsLayout;
