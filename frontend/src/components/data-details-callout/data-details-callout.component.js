import React from "react";
import PropTypes from "prop-types";
import TextEditor from "@components/text-editor/text-editor.component";
import Pinstripes from "@components/pinstripes/pinstripes.component";
import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";
import cloneDeep from "lodash.clonedeep";
import { Link } from "react-router-dom";

const DataDetailsCallout = ({ block, pageID }) => {
  const { data } = block.callout;

  const dispatch = useDispatch();

  const blockData = useSelector((state) => blockDataSelector({ state, data }));
  let col1 = [];
  let col2 = [];

  const isEven = blockData.data.length % 2 == 0;

  blockData.data.forEach((item, idx) => {
    if (!isEven && idx == blockData.data.length - 1) return;
    const jsx = (
      <React.Fragment key={item.id}>
        <TextEditor
          value={item.label}
          toolbarOptions={["bold", "italic"]}
          charLimit={100}
          className="detail_label mw-0"
          onChange={(val) => {
            let data = cloneDeep(blockData.data);
            data[idx].label = val;
            handleOnChange({ data });
          }}
        />
        <TextEditor
          value={item.value}
          toolbarOptions={["bold", "italic"]}
          charLimit={100}
          className="detail_info"
          onChange={(val) => {
            let data = cloneDeep(blockData.data);
            data[idx].value = val;
            handleOnChange({ data });
          }}
        />
      </React.Fragment>
    );
    if (idx % 2 == 0) {
      col1.push(jsx);
    } else {
      col2.push(jsx);
    }
  });

  const handleOnChange = (updatedData) =>
    dispatch(setDataItem({ ...blockData, ...updatedData }));

  return (
    <Link to={`/cms/page/${pageID}/block/${block.id}/callout`}>
      <section className="data_details_block">
        <Pinstripes type="top" />

        <div className="data_details_columns_wrapper">
          <div className="data_details_inner">{col1}</div>
          <div className="data_details_inner">{col2}</div>
        </div>
      </section>
    </Link>
  );
};

DataDetailsCallout.propTypes = {
  block: PropTypes.object,
  pageID: PropTypes.string.isRequired,
};

export default DataDetailsCallout;
