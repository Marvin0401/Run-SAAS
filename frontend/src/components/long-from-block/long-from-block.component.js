import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import PropTypes from "prop-types";

import SelectArrow from "@assets/images/select_arrow.svg";
import CheckMark from "@assets/images/checkmark.svg";
import RadioButton from "@assets/images/radio_button.svg";
import IconArrow from "@assets/images/icon_arrow-1.svg";

import { blockDataSelector } from "@redux/selectors/site";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "@components/text-editor/text-editor.component";
import { setDataItem } from "@redux/slices/blockData";
import classnames from "classnames";
import { submitForm } from "@helpers/form";
import { toast } from "react-toastify";
import ButtonEditor from "@components/button-editor/button-editor.component";

const LongFromBlock = ({ block }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { data } = block;
  const [checkBoxesCount, setCheckBoxesCount] = useState({});

  const blockData = useSelector((state) =>
    blockDataSelector({
      state,
      data,
    })
  );
  const setValue = (value) => {
    const updatedData = {
      ...blockData,
      ...value,
    };
    dispatch(setDataItem(updatedData));
  };

  const settings = useSelector((state) => state.site.settings);

  const generateFields = () => {
    function getCheckedCount(field) {
      return field.checkboxes.filter((ch) =>
        checkBoxesCount[field.name]?.has(ch.id)
      ).length;
    }
    return blockData.fields.map((field) => {
      // let checkedCount = 0;
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
    setIsLoading(true);
    try {
      await submitForm(e.target, blockData, settings);
      e.target.reset();
      toast.success("Form submitted successfully");
    } catch (err) {
      toast.error(err.message);
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
      <div className="pinstripes_top"></div>
      <div className="section_gradient_overlay"></div>

      <div className="first_column column">
        <h1>
          {blockData.eyebrowOn && (
            <TextEditor
              value={blockData.eyebrow || ""}
              onChange={(text) =>
                setValue({
                  eyebrow: text,
                })
              }
              charLimit={45}
              element="span"
              isSimple={true}
              className="eyebrow"
            />
          )}
          <TextEditor
            value={blockData.title || ""}
            onChange={(text) =>
              setValue({
                title: text,
              })
            }
            charLimit={45}
            element="div"
            isSimple={true}
          />
        </h1>

        <div className="long_form_description">
          <TextEditor
            value={blockData.description || ""}
            onChange={(text) =>
              setValue({
                description: text,
              })
            }
            charLimit={350}
            toolbarOptions={["bold", "italic", "link"]}
          />
        </div>
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
          <ButtonEditor
            value={blockData.submitBtnText ?? "Submit"}
            onChange={(text) => {
              setValue({ submitBtnText: text });
            }}
          />
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
