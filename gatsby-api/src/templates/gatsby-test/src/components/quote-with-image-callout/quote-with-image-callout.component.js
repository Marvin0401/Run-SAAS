import React from "react";
import PropTypes from "prop-types";
import { blockDataSelector } from "@helpers/blockData";

import classnames from "classnames";

const QuoteWithImageCallout = ({ block }) => {
  const { data } = block.callout;

  const blockData = blockDataSelector({ data });

  return (
    <section
      className={classnames("pull_quote_with_photo_block", {
        flip_content: blockData.isFlipped,
      })}
    >
      <div className="quote_section column">
        <div className="pinstripes_top"></div>
        <div className="quote editor quill_editor_custom_style" dangerouslySetInnerHTML={{__html: blockData?.text}} />
      </div>

      <div className="photo_section column">
        <img src={blockData?.img} />
      </div>
    </section>
  );
};

QuoteWithImageCallout.propTypes = {
  block: PropTypes.object,
};

export default QuoteWithImageCallout;
