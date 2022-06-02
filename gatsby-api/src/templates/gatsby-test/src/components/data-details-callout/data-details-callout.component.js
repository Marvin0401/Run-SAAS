import React from "react";
import PropTypes from "prop-types";
import { blockDataSelector } from "@helpers/blockData";

const DataDetailsCallout = ({ block }) => {
  const { data } = block.callout;
  const blockData = blockDataSelector({ data });

  let col1 = [];
  let col2 = [];

  const isEven = blockData.data.length % 2 == 0;

  blockData.data.forEach((item, idx) => {
    if (!isEven && idx == blockData.data.length - 1) return;
    const jsx = (
      <>
        <div className="detail_label" dangerouslySetInnerHTML={{__html: item.title}}/>
        <div className="detail_info editor quill_editor_custom_style" dangerouslySetInnerHTML={{__html: item.value}}/>
      </>
    );
    if (idx % 2 == 0) {
      col1.push(jsx);
    } else {
      col2.push(jsx);
    }
  });

  return (
    <section className="data_details_block">
      <div className="pinstripes_top"></div>

      <div className="data_details_columns_wrapper">
        <div className="data_details_inner">{col1}</div>
        <div className="data_details_inner">{col2}</div>
      </div>
    </section>
  );
};

DataDetailsCallout.propTypes = {
  block: PropTypes.object,
};

export default DataDetailsCallout;
