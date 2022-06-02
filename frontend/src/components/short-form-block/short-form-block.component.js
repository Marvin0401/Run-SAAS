import React, { useState } from "react";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";

import TextEditor from "@components/text-editor/text-editor.component";

import ARROWICON from "@assets/images/icon_arrow-1.svg";
import SelectArrow from "@assets/images/select_arrow.svg";
import { blockDataSelector } from "@redux/selectors/site";
import { useDispatch, useSelector } from "react-redux";

import { setDataItem } from "@redux/slices/blockData";

import classnames from "classnames";
import { submitForm } from "@helpers/form";
import { toast } from "react-toastify";
import ButtonEditor from "@components/button-editor/button-editor.component";

const ShortFormBlock = ({ block }) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.site.settings);
  const [isLoading, setIsLoading] = useState(false);

  const { sharedData } = block;
  const blockData = useSelector((state) =>
    blockDataSelector({
      state,
      data: sharedData,
    })
  );

  const setValue = (value) => {
    const updatedData = {
      ...blockData,
      ...value,
    };
    dispatch(setDataItem(updatedData));
  };

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
    setIsLoading(true);
    try {
      await submitForm(e.target, blockData, settings);
      e.target.reset();
      toast.success("Form submitted successfully");
    } catch (error) {
      toast.error(error.message);
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
        <div className="pinstripes_top"></div>

        <div className="vol_sec_header">
          <TextEditor
            value={blockData.smallHeader || ""}
            onChange={(text) =>
              setValue({
                smallHeader: text,
              })
            }
            charLimit={20}
            element="span"
            isSimple={true}
            className="small_header"
          />
          <TextEditor
            value={blockData.bigHeader || ""}
            onChange={(text) =>
              setValue({
                bigHeader: text,
              })
            }
            charLimit={15}
            element="span"
            isSimple={true}
            className="big_header"
          />
        </div>

        <form onSubmit={submit}>
          {generateFields()}
          <button type="submit" className="btn_style-1" disabled={isLoading}>
            <ButtonEditor
              value={blockData.submitBtnText ?? "Sign Up"}
              onChange={(text) => {
                setValue({
                  submitBtnText: text,
                });
              }}
            />
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
