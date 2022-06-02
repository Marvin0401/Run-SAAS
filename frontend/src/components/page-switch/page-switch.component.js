import React from "react";
import { Redirect, Route, Switch, useParams } from "react-router-dom";

import BlockFilter from "@components/block-filter/block-filter.component";
import CalloutFilter from "@components/callout-filter/callout-filter.component";
import Blocks from "@components/blocks/blocks.component";
import PageSettings from "@components/page-settings/page-settings.component";

const PageSwitch = () => {
  const { pageId } = useParams();

  return (
    <Switch>
      <Route exact path="/cms/page/:pageId/block/:blockId/callout">
        <CalloutFilter />
      </Route>
      <Route exact path="/cms/page/:pageId/block/:blockId/:itemId?">
        <BlockFilter />
      </Route>
      <Route exact path="/cms/page/:pageId/settings">
        <PageSettings />
      </Route>
      <Route exact path="/cms/page/:pageId/blocks">
        <Blocks />
      </Route>
      <Route exact path="/cms/page/:pageId">
        <Redirect to={`/cms/page/${pageId}/blocks`} />
      </Route>
      <Redirect to="/404" />
    </Switch>
  );
};

export default PageSwitch;
