import React from "react";

import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import CMS from "@components/cms/cms.component";
import SitePreview from "@components/site-preview/site-preview.component";
import ThreeColLayout from "@components/three-col-layout/three-col-layout.component";
import PaletteEditor from "@components/palette-editor/palette-editor.component";
import { isSuperAdminSelector } from "@redux/selectors/auth";

const EditorLayout = () => {
  const isSuperAdmin = useSelector(isSuperAdminSelector);

  const isColorEditorActive = useSelector(
    (state) => state.colorPallets.isShowPalletSidebar
  );

  return (
    <ThreeColLayout>
      <Switch>
        <Route path="/cms">
          <CMS />
        </Route>
      </Switch>
      <SitePreview />
      {isColorEditorActive && isSuperAdmin && <PaletteEditor />}
    </ThreeColLayout>
  );
};

export default EditorLayout;
