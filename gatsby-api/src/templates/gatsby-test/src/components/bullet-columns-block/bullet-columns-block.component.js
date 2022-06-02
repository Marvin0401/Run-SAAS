import React from "react";
import CHECKICON from "@assets/images/icon-check.svg";
import { ReactSVG } from "react-svg";
import { blockDataSelector } from "@helpers/blockData";

import PropTypes from "prop-types";
import { addLineBreaks } from "../../services/editor";

const BulletColumnsBlock = ({ block }) => {
  const { data } = block;

  const blockData = blockDataSelector({ data });

  console.log("blockdata html", blockData.data[0].value);

  return (
    <section className="bullet_columns_block white_block">
      <div className="section_gradient_overlay"></div>

      <ul className="bullet_columns_inner main_text">
        {blockData?.data?.map((val) => (
          <li key={val.id}>
            <ReactSVG className="svg" src={CHECKICON} />
            <div
              className="quill_editor_custom_style"
              dangerouslySetInnerHTML={{ __html: addLineBreaks(val.value) }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

BulletColumnsBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default BulletColumnsBlock;
