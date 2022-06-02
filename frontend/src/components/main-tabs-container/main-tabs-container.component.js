import React from "react";
import PropTypes from "prop-types";

import MainTabsTemplate from "@components/main-tabs-template/main-tabs-template.component";

const MainTabsContainer = ({ data, isOpen, handleNavigateToItem }) => {
  return (
    <>
      <MainTabsTemplate
        data={data}
        isOpen={isOpen}
        handleNavigateToItem={handleNavigateToItem}
      />
    </>
  );
};

MainTabsContainer.propTypes = {
  data: PropTypes.array,
  isOpen: PropTypes.bool,
  handleNavigateToItem: PropTypes.func.isRequired,
};

export default MainTabsContainer;
