import React from "react";
import TextEditor from "@components/text-editor/text-editor.component";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";

const BasicTextBlock = ({ block }) => {
  const dispatch = useDispatch();

  const { data } = block;

  const blockData = useSelector((state) => blockDataSelector({ state, data }));

  const handleOnChangeText = (text) =>
    dispatch(setDataItem({ ...blockData, text }));

  return (
    <div className="basic_text_block">
      <div className="basic_text_inner main_text">
        <TextEditor
          value={blockData?.text}
          onChange={handleOnChangeText}
          toolbarOptions={[
            "bold",
            "italic",
            "h1",
            "h2",
            "h3",
            "h4",
            "link",
            "list",
            "image",
          ]}
          charLimit={-1}
        />
      </div>
    </div>
  );
};

BasicTextBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default BasicTextBlock;
