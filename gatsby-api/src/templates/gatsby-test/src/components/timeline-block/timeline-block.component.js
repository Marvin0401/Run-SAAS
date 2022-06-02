import React from "react";
import PropTypes from "prop-types";

import { blockDataSelector } from "@helpers/blockData";

const TimelineBlock = ({ block }) => {

  const { data } = block;

  const blockData = blockDataSelector({ data });

  return (
      <section className="timeline_block white_block">
        <div className="section_gradient_overlay"></div>

        <h2 dangerouslySetInnerHTML={{__html:blockData.title}}/>

        <div className="timeline">
          <div className="timeline_line"></div>

          {blockData?.data?.map((val) => (
            <div className="timeline_element" key={val.id}>
              <h6 className="timeline_date" dangerouslySetInnerHTML={{__html:val.title}}/>

              <div className="timeline_text quill_editor_custom_style" dangerouslySetInnerHTML={{__html:val.value}}/>

            </div>
          ))}
        </div>
      </section>
  );
};

TimelineBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default TimelineBlock;
