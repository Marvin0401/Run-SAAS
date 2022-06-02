import React from "react";
import TextEditor from "@components/text-editor/text-editor.component";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";
import Pinstripes from "@components/pinstripes/pinstripes.component";
import { Link } from "react-router-dom";

const QuoteCallout = ({ block, pageID }) => {
  const { data } = block.callout;
  const dispatch = useDispatch();

  const blockData = useSelector((state) => blockDataSelector({ state, data }));

  const handleOnChangeText = (text) =>
    dispatch(setDataItem({ ...blockData, text }));

  return (
    <Link to={`/cms/page/${pageID}/block/${block.id}/callout`}>
      <section className="pull_quote_block" id="quote_callout">
        <Pinstripes type="top" />

        <div className="quote">
          <TextEditor
            value={blockData?.text}
            onChange={handleOnChangeText}
            toolbarOptions={["bold", "italic", "link"]}
            charLimit={300}
          />
        </div>
      </section>
    </Link>
  );
};

QuoteCallout.propTypes = {
  block: PropTypes.object,
  pageID: PropTypes.string.isRequired,
};

export default QuoteCallout;
