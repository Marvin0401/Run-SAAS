import React from "react";

import { ReactSVG } from "react-svg";

import IconTrash from "@assets/images/cms/list_icon-trash.svg";
import IconOpenButton from "@assets/images/open_button.svg";
import IconUpload from "@assets/images/cms/upload_button.svg";

import PropTypes from "prop-types";

import { useImageUploadPopUp } from "@components/image-upload-modal/image-upload-modal.component";

const EndorserItem = ({
  dataType,
  item,
  listItemPropHandler,
  deleteContentItem,
  collectionName,
  type,
}) => {
  const setPopUp = useImageUploadPopUp();

  const handleOnUploadSuccess = ({ mediaUrl, originalImageUrl }) => {
    const updatedPropObj = {
      image: mediaUrl,
      originalImage: originalImageUrl || item.originalImage,
    };

    listItemPropHandler({
      dataType,
      updatedPropObj,
      item,
      key: type,
    });

    setPopUp({ close: true });
  };

  const invokeImageUploadPopup = ({ src, file }) => {
    const imgDimensions =
      type === "featuredIndividuals"
        ? {
            left: 0,
            top: 0,
            width: 500,
            height: 500,
          }
        : {
            left: 0,
            top: 0,
          };

    let options = {
      enableCrop: true,
      onUploadSuccess: (data) => handleOnUploadSuccess(data, src),
      src,
      orignalFile: file,
      imgDimensions,
      title: "Image",
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
    if (item.originalImage) {
      e.preventDefault();
      invokeImageUploadPopup({
        src: item.originalImage,
      });
    }
  };

  return (
    <li key={item.id}>
      <div className="row_wrapper">
        <input
          maxLength={40}
          onChange={(e) =>
            listItemPropHandler({
              dataType,
              updatedPropObj: {
                title: e.target.value,
              },
              item,
              key: type,
            })
          }
          type="text"
          value={item.title}
        />
        {(type === "featuredIndividuals" || type === "featuredOrganizations") &&
          item?.image && (
            //   <ReactSVG
            //     src={IconUpload}
            //     className={"svg"}
            //     wrapper="span"
            //     onClick={handleOnClickUpload}
            //   />
            // ) : (
            <>
              <label htmlFor="file-input">
                <ReactSVG
                  src={IconUpload}
                  className={"svg"}
                  wrapper="span"
                  onClick={handleOnClickUpload}
                />
              </label>
              <input
                id="file-input"
                onChange={handleOnChangeFileUpload}
                style={{ display: "none" }}
                type="file"
              />
            </>
          )}
        {type !== "featuredIndividuals" && (
          <ReactSVG
            src={IconTrash}
            className="svg"
            wrapper="span"
            onClick={() =>
              deleteContentItem({
                dataType,
                id: item.id,
                key: collectionName,
              })
            }
          />
        )}
        <ReactSVG
          src={IconOpenButton}
          className="svg drag_icon"
          wrapper="span"
        />
      </div>
    </li>
  );
};

EndorserItem.propTypes = {
  collectionName: PropTypes.string,
  dataType: PropTypes.string,
  item: PropTypes.object.isRequired,
  listItemPropHandler: PropTypes.func.isRequired,
  deleteContentItem: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default EndorserItem;
