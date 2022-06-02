import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { useNotificationPopUp } from "@components/notification-pop-up/notification-pop-up.component";
import LandingPopupGeneral from "@components/landing-popup-general/landing-popup-general.component";
import LandingPopupDonate from "@components/landing-popup-donate/landing-popup-donate.component";
import LandingPopupSignup from "@components/landing-popup-signup/landing-popup-signup.component";

import { LANDING_POPUP_TYPES } from "@constants/constants";

import { blockDataSelector } from "@helpers/blockData";

const LandingPopupBlock = ({ block }) => {

  const { setPopUp } = useNotificationPopUp();

  const { data, sharedData } = block;

  const blockData = blockDataSelector({ data });
  const sharedBlockData = blockDataSelector({ data: sharedData });

  useEffect(() => {
    let children;

    switch (blockData.popupType) {
      case LANDING_POPUP_TYPES.GENERAL:
        children = <LandingPopupGeneral />;
        break;
      case LANDING_POPUP_TYPES.DONATE:
        children = (
          <LandingPopupDonate
            blockData={blockData}
            sharedBlockData={sharedBlockData}
          />
        );
        break;
      case LANDING_POPUP_TYPES.SIGNUP:
        children = <LandingPopupSignup />;
        break;
    }

    // pass the props to the setPopUp
    setPopUp({
      outerClassName: "popup",
      innerClassName: "popup_inner",
      children,
      onClose: () => console.log("dialog closed"),
      appElement: "#___gatsby",
      parentSelector: "body",
    });
  }, [blockData, sharedBlockData]);

  return <></>;
};

LandingPopupBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default LandingPopupBlock;
