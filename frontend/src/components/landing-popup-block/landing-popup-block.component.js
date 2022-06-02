import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";
import { useRouteMatch } from "react-router-dom";

import { useNotificationPopUp } from "@components/notification-pop-up/notification-pop-up.component";
import LandingPopupGeneral from "@components/landing-popup-general/landing-popup-general.component";
import LandingPopupDonate from "@components/landing-popup-donate/landing-popup-donate.component";
import LandingPopupSignup from "@components/landing-popup-signup/landing-popup-signup.component";

import { LANDING_POPUP_TYPES } from "@constants";

const LandingPopupBlock = ({ block }) => {
  const dispatch = useDispatch();
  const match = useRouteMatch("/cms/page/:pageId/block/:blockId");
  const blockId = match?.params?.blockId;
  const { setPopUp } = useNotificationPopUp();

  const { data, sharedData } = block;

  const blockData = useSelector((state) => blockDataSelector({ state, data }));
  const sharedBlockData = useSelector((state) =>
    blockDataSelector({ state, data: sharedData })
  );
  const handleOnChange = (updatedDataProp) =>
    dispatch(setDataItem({ ...blockData, ...updatedDataProp }));

  useEffect(() => {
    if (!(blockId === block.id)) return;

    let children;

    switch (blockData.popupType) {
      case LANDING_POPUP_TYPES.GENERAL:
        children = (
          <LandingPopupGeneral
            blockData={blockData}
            onChange={handleOnChange}
          />
        );
        break;
      case LANDING_POPUP_TYPES.DONATE:
        children = (
          <LandingPopupDonate
            blockData={blockData}
            sharedBlockData={sharedBlockData}
            onChange={handleOnChange}
          />
        );
        break;
      case LANDING_POPUP_TYPES.SIGNUP:
        children = (
          <LandingPopupSignup blockData={blockData} onChange={handleOnChange} />
        );
        break;
    }
    const timeout = setTimeout(() => {
      // pass the props to the setPopUp
      setPopUp({
        outerClassName: "popup",
        innerClassName: "popup_inner",
        children,
        onClose: () => console.log("dialog closed"),
        appElement: "#block_container",
        parentSelector: "#preview_area",
      });
    }, blockData.timeToTrigger * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [blockData, sharedBlockData, blockId]);

  const unsetPopup = useCallback(() => {
    if (!match?.params?.blockId) {
      setPopUp(undefined);
    }
  }, [match]);

  useEffect(() => {
    unsetPopup();
  }, [unsetPopup]);

  return <></>;
};

LandingPopupBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default LandingPopupBlock;
