import React from "react";
import root from "react-shadow";
import PropTypes from "prop-types";

// import createCache from "@emotion/cache";

import generalStyles from "@styles/general.scss";
import cmsStyles from "@styles/cms_shadow.scss";
import formsStyles from "@styles/forms.scss";
import buttonsStyles from "@styles/buttons.scss";
import autocompleteStyles from "@styles/autocomplete.scss";
import supportStyles from "@styles/support.scss";
import expansionPanelStyles from "@styles/expansion_panel.scss";

const CmsRouteWrapper = ({ children }) => {
  // const [options, setOption] = React.useState(null);

  // const callback = React.useCallback((ref) => {
  //   setOption(
  //     createCache({
  //       container: ref,
  //       key: "css",
  //       // speedy: true,
  //     })
  //   );
  // }, []);
  return (
    <root.div>
      {/* <div ref={callback} /> */}
      <style>{generalStyles}</style>
      <style>{buttonsStyles}</style>
      <style>{formsStyles}</style>
      <style>{cmsStyles}</style>
      <style>{autocompleteStyles}</style>
      <style>{supportStyles}</style>
      <style>{expansionPanelStyles}</style>

      <div>{children}</div>
      {/* {options && <CacheProvider value={options}>{children}</CacheProvider>} */}
    </root.div>
  );
};

CmsRouteWrapper.propTypes = {
  children: PropTypes.node,
};

export default CmsRouteWrapper;
