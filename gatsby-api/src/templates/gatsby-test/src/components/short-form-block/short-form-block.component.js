import React, { useState } from "react";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";

import ARROWICON from "@assets/images/icon_arrow-1.svg";
import SelectArrow from "@assets/images/select_arrow.svg";

import classnames from "classnames";

import { blockDataSelector } from "@helpers/blockData";

import Pinstripes from "@components/pinstripes/pinstripes.component";

import { submitForm } from "@helpers/form";
import { siteSelector } from "@helpers/site";
import { toast } from "react-toastify";

const ShortFormBlock = ({ block }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { sharedData } = block;
  const blockData = blockDataSelector({ data: sharedData });
  const settings = siteSelector();

  const generateFields = () => {
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
                className="form-control"
                required={!!field.isRequired}
                disabled={isLoading}
                defaultValue=""
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
      className={classnames("short_form_block", {
        flip_content: blockData.flipContent,
        no_image: !blockData.imageOn,
      })}
    >
      <div className="form_section">
        <Pinstripes type="top" />

        <div className="vol_sec_header">
          <span
            dangerouslySetInnerHTML={{ __html: blockData.smallHeader }}
            className="small_header"
          />
          <span
            dangerouslySetInnerHTML={{ __html: blockData.bigHeader }}
            className="big_header"
          />
        </div>

        <form onSubmit={submit}>
          {generateFields()}
          <button type="submit" className="btn_style-1" disabled={isLoading}>
            {blockData.submitBtnText ?? "Sign Up"}
            <ReactSVG className="arrow svg" src={ARROWICON} wrapper="svg" />
          </button>
        </form>
      </div>

      <div
        className="photo_section"
        style={{ backgroundImage: `url(${blockData.image})` }}
      ></div>
    </section>
  );
};

ShortFormBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default ShortFormBlock;
