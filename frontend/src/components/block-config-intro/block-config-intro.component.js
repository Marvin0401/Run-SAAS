import React from "react";
import { ReactSVG } from "react-svg";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { setDataItem } from "@redux/slices/blockData";
import { blockDataSelector } from "@redux/selectors/site";
import classnames from "classnames";

import { useImageUploadPopUp } from "@components/image-upload-modal/image-upload-modal.component";

import { INTRO_LAYOUT_TYPE } from "@constants";

import IntroOneColumn from "@assets/images/cms/intro-one-column.svg";
import IntroTwoColumn from "@assets/images/cms/intro-two-column.svg";
import IntroVideo from "@assets/images/cms/intro-video.svg";
import UploadIcon from "@assets/images/cms/upload_button.svg";
// import RadioBtn from "@assets/images/radio_button.svg";

const BlockConfigIntro = ({ block }) => {
  const dispatch = useDispatch();

  const { data } = block;
  const blockData = useSelector((state) => blockDataSelector({ state, data }));
  const setPopUp = useImageUploadPopUp();

  const handleOnChange = (data) =>
    dispatch(setDataItem({ ...blockData, ...data }));

  const type = blockData?.layoutType;

  const handleOnUploadSuccess = ({ mediaUrl, originalImageUrl }, caller) => {
    if (caller === "SIGNATURE") {
      handleOnChange({
        signatureImage: mediaUrl,
        originalSignatureImage:
          originalImageUrl || blockData.originalSignatureImage,
      });
    } else if (type === INTRO_LAYOUT_TYPE.TWO) {
      handleOnChange({
        vertImage: mediaUrl,
        originalVertImage: originalImageUrl || blockData.originalVertImage,
      });
    } else {
      handleOnChange({
        horizImage: mediaUrl,
        originalHorizImage: originalImageUrl || blockData.originalHorizImage,
      });
    }

    setPopUp({ close: true });
  };

  const invokeImageUploadPopup = ({ src, caller, file }) => {
    let options = {
      enableCrop: true,
      onUploadSuccess: (data) => handleOnUploadSuccess(data, caller, src),
      src,
      orignalFile: file,
    };

    if (caller === "SIGNATURE") {
      // Signature image
      options = {
        ...options,
        imgDimensions: {
          left: 0,
          top: 0,
          width: 500,
          height: 200,
        },
        minCropBoxWidth: 500,
        title: "Signature Image",
      };
    } else if (type === INTRO_LAYOUT_TYPE.TWO) {
      // Vert image
      options = {
        ...options,
        imgDimensions: {
          left: 0,
          top: 0,
          width: 715,
          height: 1250,
        },
        title: "Vertical Image",
        cropBoxResizable: false,
        dragMode: "move",
      };
    } else {
      // horizontal image
      options = {
        ...options,
        imgDimensions: {
          left: 0,
          top: 0,
          width: 1000,
          height: 800,
        },
        title: "Horizontal Image",
        cropBoxResizable: false,
        dragMode: "move",
      };
    }
    setPopUp(options);
  };

  const handleOnChangeFileUpload = (e, caller) => {
    const { files } = e.target;

    if (files && files.length === 0) {
      return;
    }

    invokeImageUploadPopup({
      src: URL.createObjectURL(files[0]),
      caller,
      file: files[0],
    });
  };

  const handleOnClickSignature = (e) => {
    if (blockData.originalSignatureImage) {
      e.preventDefault();
      invokeImageUploadPopup({
        src: blockData.originalSignatureImage,
        caller: "SIGNATURE",
      });
    }
  };

  return (
    <div id="blocks">
      <h1 className="big">{block.title}</h1>
      <div className="home_intro_layout_wrapper three">
        <ReactSVG
          src={IntroOneColumn}
          wrapper="svg"
          className={classnames("svg", {
            selected: blockData?.layoutType === INTRO_LAYOUT_TYPE.SINGLE,
          })}
          onClick={() =>
            handleOnChange({ layoutType: INTRO_LAYOUT_TYPE.SINGLE })
          }
        />
        <ReactSVG
          src={IntroTwoColumn}
          wrapper="svg"
          className={classnames("svg", {
            selected: blockData?.layoutType === INTRO_LAYOUT_TYPE.TWO,
          })}
          onClick={() => handleOnChange({ layoutType: INTRO_LAYOUT_TYPE.TWO })}
        />
        <ReactSVG
          src={IntroVideo}
          wrapper="svg"
          className={classnames("svg", {
            selected: blockData?.layoutType === INTRO_LAYOUT_TYPE.VIDEO,
          })}
          onClick={() =>
            handleOnChange({ layoutType: INTRO_LAYOUT_TYPE.VIDEO })
          }
        />
      </div>

      <hr className="big" />

      <h4>Image</h4>
      <div className="full_row_wrapper" style={{ justifyContent: "center" }}>
        <div className="img_preview">
          <label htmlFor="file-input">
            <ReactSVG
              src={UploadIcon}
              className="upload_icon svg replaced-svg"
            />
          </label>

          <input
            id="file-input"
            onClick={(e) => (e.target.value = "")}
            onChange={(e) => handleOnChangeFileUpload(e)}
            style={{ display: "none" }}
            type="file"
          />
        </div>
      </div>
      {blockData?.layoutType === INTRO_LAYOUT_TYPE.VIDEO && (
        <>
          <h4>Embeded video</h4>
          <div className="option_wrapper">
            {/* <div className="radio_wrapper">
              <input
                type="radio"
                id="vimeo"
                name="embed_video"
                checked={blockData.embedType === EMBED_VIDEO_TYPE.VIMEO}
                onChange={() =>
                  handleOnChange({ embedType: EMBED_VIDEO_TYPE.VIMEO })
                }
              />
              <ReactSVG src={RadioBtn} className="svg replaced-svg" />
              <label htmlFor="vimeo">Vimeo</label>
            </div>

            <div className="radio_wrapper">
              <input
                type="radio"
                id="youtube"
                name="embed_video"
                value="youtube"
                checked={blockData.embedType === EMBED_VIDEO_TYPE.YOUTUBE}
                onChange={() =>
                  handleOnChange({ embedType: EMBED_VIDEO_TYPE.YOUTUBE })
                }
              />
              <ReactSVG src={RadioBtn} className="svg replaced-svg" />
              <label htmlFor="youtube">Youtube</label>
            </div> */}
            <hr className="spacer_small" style={{ width: "100%" }} />

            <div className="input_wrapper">
              <label>Embed code</label>
              <input
                type="text"
                value={blockData.embedCode}
                onChange={(e) => handleOnChange({ embedCode: e.target.value })}
              />
            </div>
          </div>
        </>
      )}
      <hr className="big" />

      <div className="option_group">
        <div className="option_wrapper">
          <input
            type="checkbox"
            className="toggle_button"
            checked={blockData.showSignature}
            onChange={() =>
              handleOnChange({ showSignature: !blockData.showSignature })
            }
          />
          <div className="toggle_label">Candidate signature image</div>
          <hr className="spacer" style={{ width: "100%" }} />
        </div>
        <div className="option_wrapper">
          {blockData.showSignature && (
            <>
              <label
                className="signature_wrap"
                htmlFor="signature-input"
                onClick={handleOnClickSignature}
              >
                <img src={blockData.signatureImage} className="signature" />
              </label>
              <input
                id="signature-input"
                onChange={(e) => handleOnChangeFileUpload(e, "SIGNATURE")}
                style={{ display: "none" }}
                type="file"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

BlockConfigIntro.propTypes = {
  block: PropTypes.object.isRequired,
};

export default BlockConfigIntro;
