import React from "react";
import { ReactSVG } from "react-svg";
// import RadioIcon from "@assets/images/radio_button.svg";
import UploadIcon from "@assets/images/cms/upload_button.svg";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";
import { useImageUploadPopUp } from "@components/image-upload-modal/image-upload-modal.component";
import { BLOCK_TYPES } from "@constants";

const BlockConfigFullWidthVideoImage = ({ block }) => {
  const dispatch = useDispatch();

  const { data } = block;
  const blockData = useSelector((state) => blockDataSelector({ state, data }));
  const setPopUp = useImageUploadPopUp();

  const isVideoBlock = block.type === BLOCK_TYPES.FULL_WIDTH_VIDEO;
  const setValue = (value) => {
    const updatedData = {
      ...blockData,
      ...value,
    };
    dispatch(setDataItem(updatedData));
  };
  const handleOnUploadSuccess = ({ mediaUrl, originalImageUrl }) => {
    setValue({
      thumbnail: mediaUrl,
      originalImage: originalImageUrl || blockData.originalImage,
    });

    setPopUp({ close: true });
  };
  const invokeImageUploadPopup = ({ src, file }) => {
    let options = {
      enableCrop: true,
      onUploadSuccess: (data) => handleOnUploadSuccess(data, src),
      src,
      orignalFile: file,
      imgDimensions: {
        left: 0,
        top: 0,
        width: 1500,
        height: 750,
      },
      title: "Image",
    };
    setPopUp(options);
  };
  const handleOnChangeFileUpload = (e) => {
    const { files } = e.target;

    if (files && files.length === 0) {
      return;
    }

    const blob = URL.createObjectURL(files[0]);
    invokeImageUploadPopup({
      src: blob,
      file: files[0],
    });
  };

  const handleOnClickUpload = (e) => {
    if (blockData.originalImage) {
      e.preventDefault();
      invokeImageUploadPopup({
        src: blockData.originalImage,
      });
    }
  };

  return (
    <>
      <h2>{(isVideoBlock && "Video Section") || "Full Width Image"}</h2>
      {isVideoBlock && (
        <div className="option_wrapper">
          {/* <div className="radio_wrapper">
            <input type="radio" id="vimeo" name="same" value="" checked />
            <ReactSVG src={RadioIcon} className="svg" />
            <label htmlFor="vimeo">Vimeo</label>
          </div>

          <div className="radio_wrapper">
            <input type="radio" id="youtube" name="same" value="" checked />
            <ReactSVG src={RadioIcon} className="svg" />
            <label htmlFor="youtube">YouTube</label>
          </div> */}

          <div className="input_wrapper">
            <label>Video embed code</label>
            <textarea
              value={blockData.embedCode}
              onChange={(e) =>
                setValue({
                  embedCode: e.target.value,
                })
              }
            />
          </div>
        </div>
      )}
      <hr className="big" />
      <div className="option_wrapper">
        <div className="img_select_wrapper">
          <div>Preview image</div>
          <label htmlFor="file-input">
            <ReactSVG
              src={UploadIcon}
              className="img_preview"
              wrapper="div"
              beforeInjection={(svg) => {
                svg.classList.add("svg", "upload_icon");
              }}
              onClick={handleOnClickUpload}
            />
          </label>
          <input
            id="file-input"
            onChange={(e) => handleOnChangeFileUpload(e)}
            style={{ display: "none" }}
            type="file"
          />
        </div>
      </div>
      <hr className="big" />
      <div className="option_wrapper">
        <input
          type="checkbox"
          className="toggle_button"
          checked={blockData.headlineOn}
          onChange={() =>
            setValue({
              headlineOn: !blockData.headlineOn,
            })
          }
        ></input>
        <div className="toggle_label">Headline</div>
      </div>
      <hr className="big" />
      <div className="option_wrapper">
        <input
          type="checkbox"
          className="toggle_button"
          checked={blockData.captionOn}
          onChange={() =>
            setValue({
              captionOn: !blockData.captionOn,
            })
          }
        ></input>
        <div className="toggle_label">Caption</div>
      </div>
    </>
  );
};

BlockConfigFullWidthVideoImage.propTypes = {
  block: PropTypes.object.isRequired,
};

export default BlockConfigFullWidthVideoImage;
