import React from "react";
import CHECKICON from "@assets/images/icon-check.svg";
import { ReactSVG } from "react-svg";
import PropTypes from "prop-types";

import { blockDataSelector } from "@helpers/blockData";

const TextWithSidebarBlock = ({ block }) => {
  const { data } = block;

  const blockData = blockDataSelector({ data });

  return (
    <section className="basic_text_with_sidebar_block white_block">
      <div className="section_gradient_overlay"></div>

      <div className="basic_text_with_sidebar_inner main_text column">
        <div
          className="quill_editor_custom_style"
          dangerouslySetInnerHTML={{ __html: blockData.description }}
        />
      </div>

      <div className="basic_text_sidebar column">
        <h3 dangerouslySetInnerHTML={{ __html: blockData.sidebarTitle }} />

        <ul>
          {blockData?.sidebarListItems?.map((val) => (
            <li key={val.id}>
              <ReactSVG className="svg" src={CHECKICON} />
              <div
                className="quill_editor_custom_style"
                dangerouslySetInnerHTML={{ __html: val.value }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

TextWithSidebarBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default TextWithSidebarBlock;
