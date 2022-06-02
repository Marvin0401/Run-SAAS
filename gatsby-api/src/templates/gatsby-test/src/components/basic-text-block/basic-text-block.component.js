import React from "react";
import PropTypes from "prop-types";

import { blockDataSelector } from "@helpers/blockData";

const BasicTextBlock = ({ block }) => {
  const { data } = block;
  const blockData = blockDataSelector({ data });

  return (
    <section className="basic_text_block">
      <div
        className="basic_text_inner editor quill_editor_custom_style"
        dangerouslySetInnerHTML={{ __html: blockData.text }}
      ></div>
    </section>
  );
};

BasicTextBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default BasicTextBlock;
