import React from "react";
import { ReactSVG } from "react-svg";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setDataItem } from "@redux/slices/blockData";
import { blockDataSelector } from "@redux/selectors/site";

import { LANDING_POPUP_TYPES } from "@constants";

import IntroDonation from "@assets/images/cms/text_button-donation.svg";
import IntroGeneral from "@assets/images/cms/text_button-general.svg";
import IntroSignup from "@assets/images/cms/text_button-signup_form.svg";
import BlockConfigLandingPopupDonate from "@components/block-config-landing-popup-donate/block-config-landing-popup-donate.component";
import BlockConfigLandingPopupGeneral from "@components/block-config-landing-popup-general/block-config-landing-popup-general.component";
import CustomBlockFilter from "@components/custom-block-filter/custom-block-filter.component";
import Slider from "@components/slider/slider.component";

const BlockConfigLandingPopup = ({ block }) => {
  const dispatch = useDispatch();

  const { data, sharedData } = block;

  const uniqueBlockData = useSelector((state) =>
    blockDataSelector({ state, data })
  );
  const sharedBlockData = useSelector((state) =>
    blockDataSelector({ state, data: sharedData })
  );

  const handleOnChange = (updatedDataProp, blockData = uniqueBlockData) =>
    dispatch(setDataItem({ ...blockData, ...updatedDataProp }));

  const getChildConfig = (type) => {
    switch (type) {
      case LANDING_POPUP_TYPES.DONATE:
        return (
          <BlockConfigLandingPopupDonate
            buttonData={sharedBlockData.buttonData}
            onChange={(data) => handleOnChange(data, sharedBlockData)}
          />
        );
      case LANDING_POPUP_TYPES.SIGNUP:
        return (
          <CustomBlockFilter
            block={block}
            dataKeyPath={["signupData", "data"]}
          />
        );
      case LANDING_POPUP_TYPES.GENERAL:
        return (
          <BlockConfigLandingPopupGeneral
            data={uniqueBlockData.generalData}
            onChange={(data) => handleOnChange(data, uniqueBlockData)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div id="blocks">
      <h1 className="big">{block.title}</h1>

      <div className="option_wrapper three icon_row short_icons">
        <ReactSVG
          src={IntroDonation}
          wrapper="span"
          beforeInjection={(svg) => {
            svg.classList.add("svg");
            svg.style.maxWidth = "none";
            svg.style.cursor = "pointer";
            if (uniqueBlockData?.popupType === LANDING_POPUP_TYPES.DONATE)
              svg.classList.add("selected");
          }}
          onClick={() =>
            handleOnChange({ popupType: LANDING_POPUP_TYPES.DONATE })
          }
        />
        <ReactSVG
          src={IntroSignup}
          wrapper="span"
          beforeInjection={(svg) => {
            svg.classList.add("svg");
            svg.style.maxWidth = "none";
            svg.style.cursor = "pointer";
            if (uniqueBlockData?.popupType === LANDING_POPUP_TYPES.SIGNUP)
              svg.classList.add("selected");
          }}
          onClick={() =>
            handleOnChange({ popupType: LANDING_POPUP_TYPES.SIGNUP })
          }
        />
        <ReactSVG
          src={IntroGeneral}
          wrapper="span"
          beforeInjection={(svg) => {
            svg.classList.add("svg");
            svg.style.maxWidth = "none";
            svg.style.cursor = "pointer";
            if (uniqueBlockData?.popupType === LANDING_POPUP_TYPES.GENERAL)
              svg.classList.add("selected");
          }}
          onClick={() =>
            handleOnChange({ popupType: LANDING_POPUP_TYPES.GENERAL })
          }
        />
      </div>

      <div className="option_wrapper" style={{ flexDirection: "column" }}>
        <div className="slider_label">Time to trigger</div>
        <Slider
          values={[uniqueBlockData.timeToTrigger]}
          onChange={(values) => handleOnChange({ timeToTrigger: values[0] })}
          min={15}
          max={60}
        />{" "}
        <h3>{uniqueBlockData.timeToTrigger} seconds</h3>
      </div>

      <hr className="big" />

      {getChildConfig(uniqueBlockData.popupType)}
    </div>
  );
};

BlockConfigLandingPopup.propTypes = {
  block: PropTypes.object.isRequired,
};

export default BlockConfigLandingPopup;
