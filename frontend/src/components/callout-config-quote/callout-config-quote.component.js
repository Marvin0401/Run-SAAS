import React from "react";
import PropTypes from "prop-types";

const CalloutConfigQuote = ({ block }) => {
  return (
    <div key={block.id}>
      <h1 className="big">Quote Callout</h1>
    </div>
  );
};

CalloutConfigQuote.propTypes = {
  block: PropTypes.object,
};

export default CalloutConfigQuote;
