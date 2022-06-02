import { useSelector } from "react-redux";

import { Redirect, Route, Switch } from "react-router-dom";

import DesignSettings from "@components/design-settings/design-settings.component";
import Pages from "@components/pages/pages.component";
import PageSwitch from "@components/page-switch/page-switch.component";
import root from "react-shadow";

import generalStyles from "@styles/general.scss";
import cmsStyles from "@styles/cms_shadow.scss";
import formsStyles from "@styles/forms.scss";

const Cms = () => {
  const activePageId = useSelector((state) => state.site.activePage?.id);

  return (
    <root.div>
      <style>{generalStyles}</style>
      <style>{formsStyles}</style>
      <style>{cmsStyles}</style>
      <div className="cms_sidebar">
        <Switch>
          <Route exact path="/cms">
            {activePageId ? (
              <Redirect to={`/cms/page/${activePageId}/blocks`} />
            ) : null}
          </Route>
          <Route exact path="/cms/design-settings">
            <DesignSettings />
          </Route>
          <Route path="/cms/page/:pageId">
            <PageSwitch />
          </Route>
          <Route path="/cms/pages">
            <Pages />
          </Route>
          <Redirect to="/404" />
        </Switch>
      </div>
    </root.div>
  );
};

export default Cms;
