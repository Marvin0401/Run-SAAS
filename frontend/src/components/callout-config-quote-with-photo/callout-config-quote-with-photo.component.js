import React from "react";
import { ReactSVG } from "react-svg";

import PropTypes from "prop-types";
import UploadIcon from "@assets/images/cms/upload_button.svg";
import { useDispatch, useSelector } from "react-redux";
import { setDataItem } from "@redux/slices/blockData";
import { blockDataSelector } from "@redux/selectors/site";

import { useImageUploadPopUp } from "@components/image-upload-modal/image-upload-modal.component";

const CalloutConfigQuoteWithPhoto = ({ block }) => {
  const dispatch = useDispatch();

  const { data } = block.callout;
  const blockData = useSelector((state) => blockDataSelector({ state, data }));
  const setPopUp = useImageUploadPopUp();

  const handleOnChange = (data) =>
    dispatch(setDataItem({ ...blockData, ...data }));

  const handleOnUploadSuccess = ({ mediaUrl, originalImageUrl }) => {
    handleOnChange({
      img: mediaUrl,
      orignalImg: originalImageUrl || blockData.orignalImg,
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
        width: 750,
        height: 500,
      },
      title: "Section Image",
      cropBoxResizable: false,
      dragMode: "move",
    };

    setPopUp(options);
  };

  const handleOnChangeFileUpload = (e) => {
    const { files } = e.target;

    if (files && files.length === 0) {
      return;
    }

    invokeImageUploadPopup({
      src: URL.createObjectURL(files[0]),
      file: files[0],
    });
  };

  const handleOnClickUpload = (e) => {
    if (blockData.orignalImg) {
      e.preventDefault();
      invokeImageUploadPopup({
        src: blockData.orignalImg,
      });
    }
  };

  return (
    <div id="blocks">
      <h1 className="big">Quote callout with image</h1>

      <div className="option_wrapper">
        <input
          type="checkbox"
          className="toggle_button"
          checked={blockData.isFlipped}
          onChange={() => handleOnChange({ isFlipped: !blockData.isFlipped })}
        />
        <div className="toggle_label">Flip content</div>
        <hr className="spacer" style={{ width: "100%" }} />
      </div>

      <div className="option_wrapper">
        <div className="option_side_label">Section Image</div>
        <div className="img_preview">
          <label
            htmlFor="file-input"
            onClick={handleOnClickUpload}
            style={{ textAlign: "center" }}
          >
            <ReactSVG
              src={UploadIcon}
              beforeInjection={(svg) => {
                svg.classList.add("svg", "upload_icon");
              }}
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
    </div>
  );
};

CalloutConfigQuoteWithPhoto.propTypes = {
  block: PropTypes.object.isRequired,
};

export default CalloutConfigQuoteWithPhoto;
