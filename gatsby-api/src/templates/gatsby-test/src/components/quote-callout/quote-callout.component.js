import React from "react";
import PropTypes from "prop-types";
import { blockDataSelector } from "@helpers/blockData";

const QuoteCallout = ({ block }) => {
  const { data } = block.callout;

  const blockData = blockDataSelector({ data });

  return (
    <section className="pull_quote_block">
      <div className="pinstripes_top"></div>
      <div className="quote editor quill_editor_custom_style" dangerouslySetInnerHTML={{__html: blockData?.text}} />
    </section>
  );
};

QuoteCallout.propTypes = {
  block: PropTypes.object,
};

export default QuoteCallout;
