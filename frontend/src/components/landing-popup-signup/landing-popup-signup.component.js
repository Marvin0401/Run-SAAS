import React from "react";
import { ReactSVG } from "react-svg";
import IconArrow from "@assets/images/icon_arrow-1.svg";
import TextEditor from "@components/text-editor/text-editor.component";
import PropTypes from "prop-types";

const LandingPopupSignup = ({ blockData, onChange }) => {
  const data = blockData?.signupData;

  return (
    <div className="signup_popup">
      <TextEditor
        onChange={(val) => onChange({ signupData: { ...data, heading: val } })}
        value={data?.heading}
        element="h1"
        charLimit={12}
        isSimple
      />
      <TextEditor
        onChange={(val) =>
          onChange({ signupData: { ...data, description: val } })
        }
        value={data?.description}
        element="p"
        charLimit={75}
        isSimple
        className="popup_description"
      />

      <form>
        {data.data.map((item) => {
          return (
            <input
              type="text"
              key={item.id}
              value={item.title}
              onChange={() => {}}
            />
          );
        })}
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

LandingPopupSignup.propTypes = {
  blockData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LandingPopupSignup;
