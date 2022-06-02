import React from "react";
import TextEditor from "@components/text-editor/text-editor.component";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";
import classnames from "classnames";

import { INTRO_LAYOUT_TYPE } from "@constants";
import VideoPreviewContainer from "@components/video-preview-container/video-preview-container.component";

const IntroBlock = ({ block }) => {
  const dispatch = useDispatch();

  const { data } = block;
  const blockData = useSelector((state) => blockDataSelector({ state, data }));
  const handleOnChange = (data) =>
    dispatch(setDataItem({ ...blockData, ...data }));

  return (
    <section
      className={classnames("intro_home_block main_text white_block", {
        single_col_layout: blockData.layoutType !== INTRO_LAYOUT_TYPE.TWO,
        two_col_layout: blockData.layoutType === INTRO_LAYOUT_TYPE.TWO,
      })}
    >
      <div className="section_gradient_overlay"></div>

      {blockData.layoutType === INTRO_LAYOUT_TYPE.VIDEO ? (
        <VideoPreviewContainer
          embedCode={blockData.embedCode}
          previewImage={blockData.horizImage}
        />
      ) : (
        <div className="curvedshadow intro_img_wrapper rotate-left">
          <img
            src={
              blockData.layoutType === INTRO_LAYOUT_TYPE.SINGLE
                ? blockData.horizImage
                : blockData.vertImage
            }
            className="vert_image"
          />
        </div>
      )}

      <div className="written_content">
        <TextEditor
          value={blockData.heading}
          onChange={(val) => handleOnChange({ heading: val })}
          charLimit={100}
          element="h1"
          isSimple
        />

        <div className="home_intro_text">
          <TextEditor
            value={blockData.text}
            onChange={(val) => handleOnChange({ text: val })}
            charLimit={750}
            toolbarOptions={["bold", "italic", "link"]}
          />
        </div>

        {blockData.showSignature && (
          <div className="signature_wrap">
            <img src={blockData.signatureImage} className="signature" />
          </div>
        )}
      </div>
    </section>
  );
};

IntroBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default IntroBlock;
