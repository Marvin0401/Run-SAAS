import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setDataItem } from "@redux/slices/blockData";
import { blockDataSelector } from "@redux/selectors/site";
import BlockConfigLandingPopupDonate from "@components/block-config-landing-popup-donate/block-config-landing-popup-donate.component";

// import HeadlineIcon from "@assets/images/cms/text_button-headline.svg";
// import { ReactSVG } from "react-svg";

const BlockConfigDonate = ({ block }) => {
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

  // const svgInjector = (svg, savedValue, value) => {
  //   const classes = ["svg"];
  //   if (savedValue === value) classes.push("selected");
  //   svg.style.maxWidth = "none";
  //   svg.classList.add(...classes);
  // };
  return (
    <>
      <h1 className="big">Donate section</h1>

      <div className="option_wrapper">
        <input
          type="checkbox"
          className="toggle_button"
          checked={uniqueBlockData.headlineOn}
          onChange={() =>
            handleOnChange({ headlineOn: !uniqueBlockData.headlineOn })
          }
        ></input>
        <div className="toggle_label">Headline</div>
      </div>

      {/* <div className="option_wrapper two icon_row short_icons">
        <ReactSVG
          src={HeadlineIcon}
          wrapper="span"
          beforeInjection={(svg) =>
            svgInjector(svg, uniqueBlockData.headlineOn, false)
          }
          onClick={() => handleOnChange({ headlineOn: false })}
        />
        <ReactSVG
          src={HeadlineIcon}
          wrapper="span"
          beforeInjection={(svg) =>
            svgInjector(svg, uniqueBlockData.headlineOn, true)
          }
          onClick={() => handleOnChange({ headlineOn: true })}
        />
      </div> */}
      <hr className="big" />

      <BlockConfigLandingPopupDonate
        buttonData={sharedBlockData.buttonData}
        onChange={(data) => handleOnChange(data, sharedBlockData)}
      />
    </>
  );
};

BlockConfigDonate.propTypes = {
  block: PropTypes.object.isRequired,
};
export default BlockConfigDonate;
