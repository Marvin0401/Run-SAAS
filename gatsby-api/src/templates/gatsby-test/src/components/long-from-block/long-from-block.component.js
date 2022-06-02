import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import PropTypes from "prop-types";

import { blockDataSelector } from "@helpers/blockData";

import StyleInjector from "@components/style-injector/style-injector.component";
import Pinstripes from "@components/pinstripes/pinstripes.component";

import SelectArrow from "@assets/images/select_arrow.svg";
import CheckMark from "@assets/images/checkmark.svg";
import RadioButton from "@assets/images/radio_button.svg";
import IconArrow from "@assets/images/icon_arrow-1.svg";

import classnames from "classnames";
import { submitForm } from "@helpers/form";
import { siteSelector } from "@helpers/site";
import { toast } from "react-toastify";

const LongFromBlock = ({ block }) => {
  const { data } = block;
  const [isLoading, setIsLoading] = useState(false);
  const [checkBoxesCount, setCheckBoxesCount] = useState({});

  const blockData = blockDataSelector({ data });
  const settings = siteSelector();

  const generateFields = () => {
    function getCheckedCount(field) {
      return field.checkboxes.filter((ch) =>
        checkBoxesCount[field.name]?.has(ch.id)
      ).length;
    }
    return blockData.fields.map((field) => {
      switch (field.type) {
        case "input":
          return (
            <input
              className="form-control"
              type={field.inputType}
              name={field.name}
              placeholder={`${
                field.placeholder ? field.placeholder + " " : ""
              }${
                field.placeholderSuffix
                  ? "(" + field.placeholderSuffix + ")"
                  : ""
              }`}
              key={field.id}
              defaultValue=""
              required={!!field.isRequired}
              disabled={isLoading}
              pattern={field.pattern}
              maxLength={field.maxLength}
            />
          );
        case "select":
          return (
            <div className="select_wrapper" key={field.id}>
              <img src={SelectArrow} className="dropdown_arrow svg" />
              <select
                name={field.name}
                defaultValue=""
                required={!!field.isRequired}
                disabled={isLoading}
              >
                <option value="" disabled>
                  {field.placeholder}
                </option>
                {field.options?.map((option) => (
                  <option value={option.value || option.title} key={option.id}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          );
        case "radio":
          return (
            <div key={field.id}>
              {field.radios?.map((radio) => (
                <div className="radio_wrapper" key={radio.id}>
                  <input
                    type="radio"
                    id={radio.id}
                    name={field.name}
                    value={radio.title}
                    required={!!field.isRequired}
                    disabled={isLoading}
                  />
                  <ReactSVG src={RadioButton} className="svg" />
                  <label htmlFor={radio.id}>{radio.title}</label>
                </div>
              ))}
            </div>
          );
        case "checkbox":
          return (
            <div key={field.id}>
              {field.checkboxes?.map((checkbox) => (
                <div className="checkbox_wrapper" key={checkbox.id}>
                  <input
                    type="checkbox"
                    id={checkbox.id}
                    name={field.name}
                    value={checkbox.title}
                    disabled={isLoading}
                    onChange={(ev) => {
                      const set = new Set(checkBoxesCount[field.name]);
                      if (ev.target.checked) {
                        set.add(checkbox.id);
                      } else {
                        set.delete(checkbox.id);
                      }
                      setCheckBoxesCount((prev) => ({
                        ...prev,
                        [field.name]: set,
                      }));
                    }}
                    required={!getCheckedCount(field)}
                  />
                  <ReactSVG src={CheckMark} className="svg" />
                  <label htmlFor={checkbox.id}>{checkbox.title}</label>
                </div>
              ))}
            </div>
          );
        case "heading":
          return <h4 key={field.id}>{field.title}</h4>;
        case "textarea":
          return (
            <textarea
              name={field.name}
              placeholder={field.placeholder}
              defaultValue=""
              key={field.id}
              required={!!field.isRequired}
              disabled={isLoading}
            ></textarea>
          );
      }
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!settings.formProvider || blockData.fields.length === 0) {
      return;
    }
    setIsLoading(true);
    try {
      await submitForm(e.target, blockData, settings);
      e.target.reset();
      toast.success("Form submitted successfully");
    } catch (err) {
      const errorMsg =
        settings.formProvider === "google_forms"
          ? "Form submit failed, make sure google sheet URL is correct. Contact admin if issue persists."
          : "Form submit failed. Contact admin if issue persists.";
      toast.error(errorMsg);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className={classnames("long_form_block", blockData.blockStyle, {
        column_background: blockData.wrapForm,
      })}
    >
      <Pinstripes type="top" />
      <div className="section_gradient_overlay"></div>

      <div className="first_column column">
        <h1>
          {blockData.eyebrowOn && (
            <span
              dangerouslySetInnerHTML={{ __html: blockData.eyebrow }}
              className="eyebrow"
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: blockData.title }} />
        </h1>

        <div
          className="long_form_description quill_editor_custom_style"
          dangerouslySetInnerHTML={{ __html: blockData.description }}
        />
      </div>

      <form
        className="second_column column"
        style={{
          width: blockData.formWidth + "%",
        }}
        onSubmit={submit}
      >
        {generateFields()}

        <button type="submit" className="btn_style-1" disabled={isLoading}>
          {blockData.submitBtnText ?? "Submit"}
          <ReactSVG src={IconArrow} className="svg arrow" wrapper="svg" />
        </button>
      </form>
    </section>
  );
};

LongFromBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default LongFromBlock;
