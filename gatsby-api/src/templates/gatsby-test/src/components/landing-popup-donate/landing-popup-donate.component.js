import React from "react";
import PropTypes from "prop-types";

const LandingPopupDonate = ({ blockData, sharedBlockData }) => {
  const data = blockData.donateData;
  return (
    <div className="donate_popup">
      <h1>{data.heading}</h1>
      <p className="popup_description">{data.description}</p>

      <div className="donate_buttons">
        {sharedBlockData.buttonData.map((data, idx) => (
          <a href={data.url} key={idx} className="donation_amount">
            {data.amount ? `$${data.amount}` : "Other"}
          </a>
        ))}
      </div>
    </div>
  );
};

LandingPopupDonate.propTypes = {
  blockData: PropTypes.object.isRequired,
  sharedBlockData: PropTypes.object.isRequired,
};

export default LandingPopupDonate;
