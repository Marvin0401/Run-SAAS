import React from "react";
import PropTypes from "prop-types";
import cloneDeep from "lodash.clonedeep";

const BlockConfigLandingPopupDonate = ({ buttonData, onChange }) => {
  return (
    <>
      {buttonData.map((data, idx) => (
        <div className="option_wrapper" key={idx}>
          <p>
            <b>BUTTON {idx + 1}</b>
          </p>
          <ul className="cms_controls_list" style={{ width: "100%" }}>
            <li>
              <div className="row_wrapper">
                {data.amount ? (
                  <>
                    <label htmlFor="amount">
                      <b>$</b>
                    </label>
                    <input
                      type="number"
                      value={data.amount}
                      id="amount"
                      className="no_spin"
                      onChange={(e) => {
                        let btnData = cloneDeep(buttonData);
                        btnData[idx].amount = e.target.value;
                        onChange({ buttonData: btnData });
                      }}
                    />
                  </>
                ) : (
                  <b>OTHERS</b>
                )}

                <input
                  type="url"
                  value={data.url}
                  onChange={(e) => {
                    let btnData = cloneDeep(buttonData);
                    btnData[idx].url = e.target.value;
                    onChange({ buttonData: btnData });
                  }}
                  style={{ width: "60%", maxWidth: "60%" }}
                />
              </div>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

BlockConfigLandingPopupDonate.propTypes = {
  buttonData: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BlockConfigLandingPopupDonate;
