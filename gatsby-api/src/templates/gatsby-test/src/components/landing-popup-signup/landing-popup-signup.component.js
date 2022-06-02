import React from "react";
import { ReactSVG } from "react-svg";
import IconArrow from "@assets/images/icon_arrow-1.svg";

const LandingPopupSignup = () => {
  return (
    <div className="signup_popup">
      <h1>Volunteers</h1>
      <p className="popup_description">We rely on supporters like you!</p>

      <form>
        <input type="email" value="Email" />
        <input type="text" value="Phone" />
        <input type="text" value="Zip" />
        <button type="button" className="btn_style-1">
          Sign Up
          <ReactSVG
            src={IconArrow}
            className="svg arrow replaced-svg"
            wrapper="svg"
          />
        </button>
      </form>
    </div>
  );
};

export default LandingPopupSignup;
