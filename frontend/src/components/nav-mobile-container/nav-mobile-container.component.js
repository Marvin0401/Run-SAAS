import React from "react";
import PropTypes from "prop-types";
import NavMobileTemplate from "../nav-mobile-template/nav-mobile-template.component";

// import { useDispatch, useSelector } from 'react-redux'

const NavMobileContainer = ({
  data = [],
  featuredPage,
  handleNavigateToItem,
}) => {
  // const dispatch = useDispatch()

  // const state = useSelector(state => state)

  return (
    <>
      <NavMobileTemplate
        data={data}
        featuredPage={featuredPage}
        handleNavigateToItem={handleNavigateToItem}
      />
    </>
  );
};

NavMobileContainer.propTypes = {
  data: PropTypes.array,
  featuredPage: PropTypes.object,
  handleNavigateToItem: PropTypes.func.isRequired,
};

export default NavMobileContainer;
