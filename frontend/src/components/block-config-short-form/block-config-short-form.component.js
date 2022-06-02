import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import UploadButtonIcon from "@assets/images/cms/upload_button.svg";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

import { useImageUploadPopUp } from "@components/image-upload-modal/image-upload-modal.component";
import CustomBlockFilter from "@components/custom-block-filter/custom-block-filter.component";
import { DATA_TYPE } from "@constants";
import FormFieldEditor, {
  FIELD_TYPES,
} from "@components/form-field-editor/form-field-editor.component";
import CopyIcon from "@assets/images/cms/copy.svg";
import { v4 as uuidv4 } from "uuid";

const BlockConfigShortForm = ({ block }) => {
  const dispatch = useDispatch();
  const setPopUp = useImageUploadPopUp();
  const { itemId } = useParams();

  // const blockData = useSelector((state) =>
  //   blockDataSelector({ state, data: block.data })
  // );

  const { sharedData: sharedDataId } = block;

  const sharedBlockData = useSelector((state) =>
    blockDataSelector({ state, data: sharedDataId })
  );
  const defaultFormProvider = useSelector((state) => ({
    formProvider: state.site.settings.formProvider,
    formApiKey: state.site.settings.formProviderformApiKey,
  }));

  useEffect(() => {
    if (!sharedBlockData.formProvider && sharedBlockData.formApiKey) {
      setValue({
        formProvider: defaultFormProvider.formProvider,
        formApiKey: defaultFormProvider.formApiKey,
      });
    }
  }, [defaultFormProvider]);

  const handleOnCopy = () => {
    toast.success("Copied to clipboard");
  };

  const setValue = (value) => {
    const updatedData = {
      ...sharedBlockData,
      ...value,
    };
    dispatch(setDataItem(updatedData));
  };

  const handleOnUploadSuccess = ({ mediaUrl, originalImageUrl }) => {
    setValue({
      image: mediaUrl,
      originalImage: originalImageUrl || sharedBlockData.originalImage,
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

    invokeImageUploadPopup({
      src: URL.createObjectURL(files[0]),
      file: files[0],
    });
  };

  const handleOnClickUpload = (e) => {
    if (sharedBlockData.originalImage) {
      e.preventDefault();
      invokeImageUploadPopup({
        src: sharedBlockData.originalImage,
      });
    }
  };

  const notEditModeContent = () => {
    return (
      <>
        <h2>Short Form</h2>
        <p>
          Please make sure to configure form provider settings in site settings.
        </p>
        <hr className="big" />
        <div className="option_wrapper icon_row two">
          <div className="img_select_wrapper">
            <div className="option_side_label">Image</div>
            <div>
              <input
                type="checkbox"
                className="toggle_button"
                checked={!!sharedBlockData?.imageOn}
                onChange={() =>
                  setValue({
                    imageOn: !sharedBlockData?.imageOn,
                  })
                }
              ></input>
              <div className="toggle_label"></div>
            </div>
            <div className="img_preview">
              <label htmlFor="file-input">
                <ReactSVG
                  src={UploadButtonIcon}
                  beforeInjection={(svg) => {
                    svg.classList.add("svg", "upload_icon");
                  }}
                  onClick={handleOnClickUpload}
                />
              </label>
              <input
                id="file-input"
                onChange={(e) => handleOnChangeFileUpload(e, "hero")}
                style={{ display: "none" }}
                type="file"
              />
            </div>
          </div>
        </div>
        <hr className="big" />
        <div className="option_wrapper">
          <input
            type="checkbox"
            className="toggle_button"
            checked={!!sharedBlockData?.flipContent}
            onChange={() =>
              setValue({
                flipContent: !sharedBlockData?.flipContent,
              })
            }
          ></input>
          <div className="toggle_label">Flip content</div>
        </div>
        <div className="option_wrapper left">
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "0.6em",
            }}
          >
            Form Provider
          </label>
          <select
            name="formProvider"
            value={sharedBlockData.formProvider}
            onChange={(e) => {
              setValue({ formProvider: e.target.value, fields: [] });
            }}
          >
            <option value="" disabled>
              Please select form provider
            </option>
            <option value="mailchimp">Mailchimp</option>
            <option value="action_network">Action Network</option>
            <option value="google_forms">Google Sheet</option>
            <option value="ngpvan">NGPVan</option>
          </select>
        </div>
        {sharedBlockData.formProvider !== "google_forms" && (
          <div className="option_wrapper left">
            <label
              style={{
                fontWeight: "bold",
                marginBottom: "0.6em",
              }}
              htmlFor="formApiKey"
            >
              Api Key
            </label>
            <input
              type="text"
              name="formApiKey"
              id="formApiKey"
              value={sharedBlockData.formApiKey || ""}
              onChange={(e) => {
                setValue({ formApiKey: e.target.value });
              }}
            />
          </div>
        )}
        {sharedBlockData.formProvider === "ngpvan" && (
          <div className="option_wrapper left">
            <label
              style={{
                fontWeight: "bold",
                marginBottom: "0.6em",
              }}
              htmlFor="ngpvanEmail"
            >
              NGPVan Account Email
            </label>
            <input
              type="email"
              name="ngpvanEmail"
              id="ngpvanEmail"
              value={sharedBlockData.ngpvanEmail || ""}
              onChange={(e) => {
                setValue({ ngpvanEmail: e.target.value });
              }}
            />
          </div>
        )}
        <div>
          {sharedBlockData.formProvider !== "ngpvan" && (
            <>
              <p>
                Please get{" "}
                {sharedBlockData.formProvider === "google_forms"
                  ? "sheet URL"
                  : "Form ID / Audience ID"}{" "}
                from your form provider
              </p>

              <div className="option_wrapper left">
                <label
                  style={{
                    fontWeight: "bold",
                    marginBottom: "0.6em",
                  }}
                >
                  {sharedBlockData.formProvider === "google_forms"
                    ? "Google Sheet URL"
                    : "Form ID / Audience ID"}
                </label>
                <input
                  type="text"
                  value={sharedBlockData.formId || ""}
                  onChange={(e) => {
                    setValue({ formId: e.target.value });
                  }}
                />
              </div>
            </>
          )}
          <div className="option_wrapper left">
            <label
              style={{
                fontWeight: "bold",
                marginBottom: "0.6em",
              }}
            >
              Submit Button Label
            </label>
            <input
              type="text"
              value={sharedBlockData.submitBtnText ?? "Submit"}
              onChange={(e) => {
                setValue({ submitBtnText: e.target.value });
              }}
            />
          </div>
        </div>
        {sharedBlockData.formProvider === "google_forms" && (
          <div>
            <p>Allow google sheet access to the follwing email:</p>
            <div style={{ fontWeight: 600 }}>
              puneet2chopda@mytem-project.iam.gserviceaccount.com{" "}
              <CopyToClipboard
                text={"puneet2chopda@mytem-project.iam.gserviceaccount.com"}
                onCopy={handleOnCopy}
              >
                <ReactSVG
                  src={CopyIcon}
                  className="copy-icon small-icon svg replaced-svg"
                />
              </CopyToClipboard>
            </div>
          </div>
        )}
        <hr className="big" />
        <CustomBlockFilter
          block={{
            ...block,
            addItem:
              sharedBlockData.formProvider === "ngpvan"
                ? () => ({
                    title: "First Name",
                    type: "input",
                    inputType: "text",
                    name: `firstName`,
                    placeholder: "First Name",
                    maxLength: 20,
                    id: uuidv4(),
                  })
                : null,
          }}
          dataKeyPath={["fields"]}
          dataType={DATA_TYPE.SHARED}
        />
      </>
    );
  };
  const editModeContent = () => {
    return (
      <>
        <FormFieldEditor
          block={block}
          dataKeyPath={["fields"]}
          dataType={DATA_TYPE.SHARED}
          itemId={itemId}
          fieldsTypes={[FIELD_TYPES.INPUT, FIELD_TYPES.SELECT]}
        />
      </>
    );
  };
  return (
    <>
      {!itemId && notEditModeContent()}
      {itemId && editModeContent()}
    </>
  );
};

BlockConfigShortForm.propTypes = {
  block: PropTypes.object.isRequired,
};

export default BlockConfigShortForm;
