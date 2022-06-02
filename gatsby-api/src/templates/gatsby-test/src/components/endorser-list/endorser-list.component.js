import React from "react";
import PropTypes from "prop-types";

const EndorserList = ({
  individualEndorsers,
  organizationalEndorsers,
}) => {
  return (
    <div className="endorser_list">
      <div className="pinstripes_top"></div>

      <div className="first_column column">
        <h3 className="title">Individuals</h3>

        <ul>
          {individualEndorsers.map((item) => (
            <li dangerouslySetInnerHTML={{__html: item.title}} key={item.id}></li>
          ))}
        </ul>
      </div>

      <div className="second_column column">
        <h3 className="title">Organizations</h3>

        <ul>
          {organizationalEndorsers.map((item) => (
            <li dangerouslySetInnerHTML={{__html: item.title}} key={item.id}></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

EndorserList.propTypes = {
  individualEndorsers: PropTypes.array.isRequired,
  organizationalEndorsers: PropTypes.array.isRequired,
};

export default EndorserList;
