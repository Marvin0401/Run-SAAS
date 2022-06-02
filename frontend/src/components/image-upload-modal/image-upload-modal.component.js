import React, { useRef, useState, useEffect } from "react";
import Cropper from "react-cropper";
// import "cropperjs/dist/cropper.css";

import classnames from "classnames";

import { v4 as uuidv4 } from "uuid";
import Loader from "@components/loader/loader.component";

import useStyles from "./image-upload-modal.style";
import { useNotificationPopUp } from "@components/notification-pop-up/notification-pop-up.component";
import PropTypes from "prop-types";

import clients from "@services/api";
import axios from "axios";

const ImageUploadModal = ({
  aspectRatio = null,
  enableCrop = false,
  imgDimensions,
  onUploadSuccess,
  src,
  orignalFile,
  minCropBoxWidth,
  minCropBoxHeight,
  cropBoxResizable,
  dragMode,
}) => {
  const classes = useStyles();
  const cropperRef = useRef(null);
  const [cropper, setCropper] = useState();
  const [showLoader, setShowLoader] = useState(false);

  const [originalImageBlob, setOriginalImageBlob] = useState(orignalFile);

  useEffect(() => {
    setOriginalImageBlob(orignalFile);
  }, [orignalFile]);

  useEffect(() => {
    uploadOriginalImage();
  }, [originalImageBlob]);

  useEffect(() => {
    if (!cropper) return;
    cropper.setCropBoxData(imgDimensions);
  }, [cropper]);

  const handleOnClick = async () => {
    // cropper.getImageData().toBlob();
    setShowLoader(true);

    const data = {
      filename: uuidv4(),
      filetype: "png",
    };

    try {
      const response = await clients.default.client({
        method: "post",
        url: "api/media/upload/",
        data,
      });

      const {
        signedUrl: { key, url },
      } = response.data;

      const mediaUrl = `${process.env.REACT_APP_MEDIA_URL}${key}`;

      cropper.getCroppedCanvas().toBlob(async (blob) => {
        await axios.put(url, blob);
        let originalImageUrl;
        if (originalImageBlob) {
          originalImageUrl = await new Promise((resolve) => {
            setTimeout(async () => {
              resolve(await uploadOriginalImage());
            }, 300);
          });
        }

        onUploadSuccess({ mediaUrl, originalImageUrl });
      });
    } catch (err) {
      console.log({ err });
    }
  };

  const uploadOriginalImage = async () => {
    const data = {
      filename: uuidv4(),
      filetype: "png",
    };
    const response = await clients.default.client({
      method: "post",
      url: "api/media/upload/",
      data,
    });
    const {
      signedUrl: { key, url },
    } = response.data;

    const mediaUrl = `${process.env.REACT_APP_MEDIA_URL}${key}`;
    await axios.put(url, originalImageBlob);
    return mediaUrl;
  };

  const handleOnChangeNew = (e) => {
    const { files } = e.target;
    const blob = URL.createObjectURL(files[0]);
    cropper.replace(blob);
    setOriginalImageBlob(files[0]);
  };

  return (
    <>
      <div className={classnames(classes.container, "image-upload-modal")}>
        {enableCrop ? (
          <Cropper
            aspectRatio={
              aspectRatio || imgDimensions.width / imgDimensions.height
            }
            background={false}
            movable={false}
            onInitialized={(instance) => setCropper(instance)}
            ref={cropperRef}
            responsive
            rotatable={false}
            scalable={false}
            src={src}
            style={{ height: 300 }}
            viewMode={2}
            zoomable={false}
            minCropBoxWidth={minCropBoxWidth}
            minCropBoxHeight={minCropBoxHeight}
            cropBoxResizable={cropBoxResizable || true}
            dragMode={dragMode}
            // checkCrossOrigin={false}
            // crossOrigin="anonymous"
          />
        ) : (
          <div>test</div>
        )}
        {!showLoader && (
          <>
            <button disabled={false} onClick={handleOnClick}>
              SAVE
            </button>
            <div>
              <label htmlFor="file-input">Upload New Image</label>
              <input
                id="file-input"
                onClick={(e) => (e.target.value = "")}
                onChange={handleOnChangeNew}
                style={{ display: "none" }}
                type="file"
              />
            </div>
          </>
        )}
      </div>
      {showLoader && <Loader className="small" />}
    </>
  );
};

ImageUploadModal.propTypes = {
  aspectRatio: PropTypes.number,
  enableCrop: PropTypes.bool,
  imgDimensions: PropTypes.exact({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  onUploadSuccess: PropTypes.func,
  src: PropTypes.any,
  minCropBoxWidth: PropTypes.number,
  minCropBoxHeight: PropTypes.number,
  cropBoxResizable: PropTypes.bool,
  dragMode: PropTypes.string,
  orignalFile: PropTypes.object,
};

export default ImageUploadModal;

const useImageUploadPopUp = () => {
  const { setPopUp } = useNotificationPopUp();

  const setImageUploadPopUp = ({ close, title, ...props }) => {
    if (close) {
      setPopUp(undefined);
    } else {
      setPopUp({
        children: <ImageUploadModal {...props} />,
        title: title || "Image",
        innerClassName: "white-bg-popup",
      });
    }
  };
  return setImageUploadPopUp;
};

export { useImageUploadPopUp };
