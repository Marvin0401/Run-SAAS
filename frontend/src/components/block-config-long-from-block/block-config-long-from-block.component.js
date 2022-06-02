import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

import CustomBlockFilter from "@components/custom-block-filter/custom-block-filter.component";
import { DATA_TYPE } from "@constants";
import FormFieldEditor, {
  FIELD_TYPES,
} from "@components/form-field-editor/form-field-editor.component";
import Slider from "@components/slider/slider.component";
import TextButtonColor from "@assets/images/cms/text_button-color.svg";
import TextButtonWhite from "@assets/images/cms/text_button-white.svg";
import CopyIcon from "@assets/images/cms/copy.svg";
import { v4 as uuidv4 } from "uuid";

const BlockConfigLongFromBlock = ({ block }) => {
  const dispatch = useDispatch();
  const { itemId } = useParams();

  const { data } = block;

  const blockData = useSelector((state) => blockDataSelector({ state, data }));
  const defaultFormProvider = useSelector((state) => ({
    formProvider: state.site.settings.formProvider,
    formApiKey: state.site.settings.formProviderformApiKey,
  }));

  const setValue = (value) => {
    const updatedData = {
      ...blockData,
      ...value,
    };
    dispatch(setDataItem(updatedData));
  };

  const handleOnCopy = () => {
    toast.success("Copied to clipboard");
  };

  useEffect(() => {
    if (!blockData.formProvider && blockData.formApiKey) {
      setValue({
        formProvider: defaultFormProvider.formProvider,
        formApiKey: defaultFormProvider.formApiKey,
      });
    }
  }, [defaultFormProvider]);

  const svgInjector = (svg, savedValue, value) => {
    const classes = ["svg"];
    if (savedValue === value) classes.push("selected");
    svg.style.maxWidth = "none";
    svg.classList.add(...classes);
  };

  const notEditModeContent = () => {
    return (
      <>
        <h2>Long Form</h2>
        <p>
          Please make sure to configure form provider settings in site settings.
        </p>
        <hr className="big" />
        <div className="option_wrapper">
          <input
            type="checkbox"
            className="toggle_button"
            checked={!!blockData?.eyebrowOn}
            onChange={() =>
              setValue({
                eyebrowOn: !blockData?.eyebrowOn,
              })
            }
          ></input>
          <div className="toggle_label">Show headline “eyebrow”</div>
        </div>
        <div className="option_wrapper">
          <input
            type="checkbox"
            className="toggle_button"
            checked={!!blockData?.wrapForm}
            onChange={() =>
              setValue({
                wrapForm: !blockData?.wrapForm,
              })
            }
          ></input>
          <div className="toggle_label">Wrap form in block</div>
        </div>
        <hr className="spacer" />
        <div>
          <div className="slider_label">Form width</div>
          <Slider
            min={40}
            max={60}
            values={[blockData.formWidth]}
            onChange={(values) => setValue({ formWidth: values[0] })}
          />
        </div>
        <hr className="spacer_small" />
        <div className="option_wrapper icon_row short_icons two">
          <ReactSVG
            src={TextButtonWhite}
            beforeInjection={(svg) => {
              svgInjector(svg, blockData.blockStyle, "white_block");
            }}
            onClick={() => {
              setValue({
                blockStyle: "white_block",
              });
            }}
          />
          <ReactSVG
            src={TextButtonColor}
            beforeInjection={(svg) => {
              svgInjector(svg, blockData.blockStyle, "color_block");
            }}
            onClick={() => {
              setValue({
                blockStyle: "color_block",
              });
            }}
          />
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
            value={blockData.formProvider}
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
        {blockData.formProvider !== "google_forms" && (
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
              value={blockData.formApiKey || ""}
              onChange={(e) => {
                setValue({ formApiKey: e.target.value });
              }}
            />
          </div>
        )}
        {blockData.formProvider === "ngpvan" && (
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
              value={blockData.ngpvanEmail || ""}
              onChange={(e) => {
                setValue({ ngpvanEmail: e.target.value });
              }}
            />
          </div>
        )}
        <div>
          {blockData.formProvider !== "ngpvan" && (
            <>
              <p>
                Please get{" "}
                {blockData.formProvider === "google_forms"
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
                  {blockData.formProvider === "google_forms"
                    ? "Google Sheet URL"
                    : "Form ID / Audience ID"}
                </label>
                <input
                  type="text"
                  value={blockData.formId || ""}
                  onChange={(e) => {
                    setValue({ formId: e.target.value });
                  }}
                />
              </div>
            </>
          )}
        </div>
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
            value={blockData.submitBtnText ?? "Submit"}
            onChange={(e) => {
              setValue({ submitBtnText: e.target.value });
            }}
          />
        </div>
        {blockData.formProvider === "google_forms" && (
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
              blockData.formProvider === "ngpvan"
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
          dataType={DATA_TYPE.UNIQUE}
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
          dataType={DATA_TYPE.UNIQUE}
          itemId={itemId}
          fieldsTypes={[
            FIELD_TYPES.INPUT,
            FIELD_TYPES.SELECT,
            FIELD_TYPES.TEXTAREA,
            FIELD_TYPES.RADIO,
            FIELD_TYPES.CHECKBOX,
            FIELD_TYPES.HEADING,
          ]}
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

BlockConfigLongFromBlock.propTypes = {
  block: PropTypes.object.isRequired,
};
export default BlockConfigLongFromBlock;
