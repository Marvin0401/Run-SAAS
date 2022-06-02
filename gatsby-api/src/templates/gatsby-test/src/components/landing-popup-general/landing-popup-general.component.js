import React from "react";
import { ReactSVG } from "react-svg";
import IconArrow from "@assets/images/icon_arrow-1.svg";

const LandingPopupGeneral = () => {
  return (
    <div className="general_landing_popup">
      <h2>Voting Starts Friday!</h2>
      <p className="popup_description">Voting is starting this Friday and we need everyone who can to get out and vote early. Click below to find out how to vote.</p>

      <button className="btn_style-2">
        <span dangerouslySetInnerHTML={{__html: "How to Vote"}} />
        <ReactSVG
          src={IconArrow}
          className="svg arrow replaced-svg"
          wrapper="svg"
        />
      </button>
    </div>
  );
};

export default LandingPopupGeneral;
