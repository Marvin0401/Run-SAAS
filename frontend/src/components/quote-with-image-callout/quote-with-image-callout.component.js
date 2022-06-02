import React from "react";
import TextEditor from "@components/text-editor/text-editor.component";
import PropTypes from "prop-types";
import Pinstripes from "@components/pinstripes/pinstripes.component";

import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";
import classnames from "classnames";
import { Link } from "react-router-dom";

const QuoteWithImageCallout = ({ block, pageID }) => {
  const { data } = block.callout;
  const dispatch = useDispatch();

  const blockData = useSelector((state) => blockDataSelector({ state, data }));

  const handleOnChangeText = (text) =>
    dispatch(setDataItem({ ...blockData, text }));

  return (
    <Link to={`/cms/page/${pageID}/block/${block.id}/callout`}>
      <section
        className={classnames("pull_quote_with_photo_block", {
          flip_content: blockData.isFlipped,
        })}
      >
        <div className="quote_section column">
          <Pinstripes type="top" />

          <div className="quote qoute_callout_textEditor">
            <TextEditor
              value={blockData?.text}
              onChange={handleOnChangeText}
              toolbarOptions={["bold", "italic", "link"]}
              charLimit={300}
            />
          </div>
        </div>

        <div className="photo_section column">
          <img src={blockData?.img} />
        </div>
      </section>
    </Link>
  );
};

QuoteWithImageCallout.propTypes = {
  block: PropTypes.object,
  pageID: PropTypes.string.isRequired,
};

export default QuoteWithImageCallout;
