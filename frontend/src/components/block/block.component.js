import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import IconTrash from "@assets/images/cms/list_icon-trash.svg";
import IconOpenButton from "@assets/images/open_button.svg";
import IconEdit from "@assets/images/cms/list_icon-edit.svg";

// import useStyles from './block.style'
import { ReactSVG } from "react-svg";
import { useDispatch } from "react-redux";
import { deleteBlock, setBlock } from "@redux/slices/site";
import { BLOCK_VARIANT, BLOCK_TYPES } from "@constants";

const Block = ({ pageId, data }) => {
  const dispatch = useDispatch();

  const handleOnClickDelete = () => dispatch(deleteBlock(data.id));
  const handleOnChangeTitle = (e) => {
    data.variant !== BLOCK_VARIANT.DEFAULT &&
      dispatch(setBlock({ ...data, title: e.target.value }));
  };

  return (
    <li>
      <div className="row_wrapper">
        <input type="text" value={data.title} onChange={handleOnChangeTitle} />
        {data.type !== BLOCK_TYPES.FOOTER && (
          <Link
            to={`/cms/page/${pageId}/block/${data.id}`}
            className="edit_Icon"
          >
            <ReactSVG src={IconEdit} className="svg" wrapper="span" />
          </Link>
        )}
        {!(
          data.variant === BLOCK_VARIANT.DEFAULT ||
          data.variant === BLOCK_VARIANT.LOCKED
        ) && (
          <ReactSVG
            src={IconTrash}
            className="svg bin_Icon"
            wrapper="span"
            onClick={handleOnClickDelete}
          />
        )}
        {data.variant !== BLOCK_VARIANT.LOCKED &&
          data.variant !== BLOCK_VARIANT.DEFAULT && (
            <ReactSVG
              src={IconOpenButton}
              className="svg drag_icon"
              wrapper="span"
            />
          )}
      </div>
      {data.callout && (
        <div className="add_on_field row_wrapper">
          {data.callout.title}
          <Link to={`/cms/page/${pageId}/block/${data.id}/callout`}>
            <ReactSVG src={IconEdit} className="svg" wrapper="span" />
          </Link>
        </div>
      )}
    </li>
  );
};

Block.propTypes = {
  pageId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default Block;
