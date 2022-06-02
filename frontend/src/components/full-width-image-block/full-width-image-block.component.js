import React from "react";
import TextEditor from "@components/text-editor/text-editor.component";
import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";
import PropTypes from "prop-types";

const FullWidthImageBlock = ({ block }) => {
  const dispatch = useDispatch();

  const { data } = block;

  const blockData = useSelector((state) => blockDataSelector({ state, data }));

  const setValue = (value) => {
    const updatedData = {
      ...blockData,
      ...value,
    };
    dispatch(setDataItem(updatedData));
  };
  return (
    <>
      {blockData.headlineOn && (
        <div className="video_image_header white_block">
          <h3>
            <TextEditor
              value={blockData.title || ""}
              onChange={(text) => {
                setValue({
                  title: text,
                });
              }}
              charLimit={100}
            />
          </h3>
        </div>
      )}

      <section className="full_width_image">
        <img src={blockData.thumbnail} />
      </section>

      {blockData.captionOn && (
        <div className="video_image_caption white_block">
          <small>
            <TextEditor
              value={blockData.description || ""}
              onChange={(text) =>
                setValue({
                  description: text,
                })
              }
              charLimit={350}
              toolbarOptions={["bold", "italic", "link"]}
            />
          </small>
        </div>
      )}
    </>
  );
};

FullWidthImageBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default FullWidthImageBlock;
