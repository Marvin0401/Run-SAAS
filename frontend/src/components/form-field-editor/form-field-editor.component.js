import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { DATA_TYPE } from "@constants/";
import CustomBlockFilter from "@components/custom-block-filter/custom-block-filter.component";
import { setDataItem } from "@redux/slices/blockData";
import cloneDeep from "lodash/cloneDeep";
import { v4 as uuidv4 } from "uuid";

export const FIELD_TYPES = {
  INPUT: "input",
  SELECT: "select",
  RADIO: "radio",
  CHECKBOX: "checkbox",
  TEXTAREA: "textarea",
  HEADING: "heading",
};

const fields = [
  {
    title: "INPUT",
    type: FIELD_TYPES.INPUT,
  },
  {
    title: "SELECT",
    type: FIELD_TYPES.SELECT,
  },
  {
    title: "RADIO",
    type: FIELD_TYPES.RADIO,
  },
  {
    title: "CHECKBOX",
    type: FIELD_TYPES.CHECKBOX,
  },
  {
    title: "TEXTAREA",
    type: FIELD_TYPES.TEXTAREA,
  },
  {
    title: "HEADING",
    type: FIELD_TYPES.HEADING,
  },
];

const inputTypes = [
  {
    title: "TEXT",
    type: "text",
  },
  {
    title: "EMAIL",
    type: "email",
  },
  {
    title: "NUMBER",
    type: "number",
  },
];

const ngpVanFields = [
  {
    title: "First Name",
    type: "input",
    inputType: "text",
    name: `firstName`,
    placeholder: "First Name",
    maxLength: 20,
  },
  {
    title: "Middle Name",
    type: "input",
    inputType: "text",
    name: `middleName`,
    placeholder: "Middle Name",
    maxLength: 20,
  },
  {
    title: "Last Name",
    type: "input",
    inputType: "text",
    name: `lastName`,
    placeholder: "Last Name",
    maxLength: 25,
  },
  {
    title: "Phone Number",
    type: "input",
    inputType: "text",
    pattern: "1-[0-9]{3}-[0-9]{3}-[0-9]{4}",
    placeholderSuffix: "1-555-555-0000",
    name: `phoneNumber`,
    placeholder: "Phone Number",
  },
  {
    title: "Email",
    type: "input",
    inputType: "email",
    name: `email`,
    placeholder: "Email",
  },
  {
    title: "Date of Birth",
    type: "input",
    inputType: "date",
    name: `dateOfBirth`,
    placeholder: "Date of Birth",
  },
  {
    title: "Gender",
    type: "select",
    options: [
      {
        id: uuidv4(),
        title: "Male",
        value: "M",
      },
      {
        id: uuidv4(),
        title: "Female",
        value: "F",
      },
    ],
    // inputType: "",
    name: `sex`,
    placeholder: "Gender",
  },
  {
    title: "Salutation",
    type: "input",
    inputType: "text",
    name: `salutation`,
    placeholder: "Salutation",
    maxLength: 20,
  },
  {
    title: "Envelope Name",
    type: "input",
    inputType: "text",
    name: `envelopeName`,
    placeholder: "Envelope Name",
    maxLength: 60,
  },
  {
    title: "Title",
    type: "input",
    inputType: "text",
    name: `title`,
    placeholder: "Title",
    maxLength: 10,
  },
  {
    title: "Suffix",
    type: "input",
    inputType: "text",
    name: `suffix`,
    placeholder: "Suffix",
    maxLength: 50,
  },
  {
    title: "Nickname",
    type: "input",
    inputType: "text",
    name: `nickname`,
    placeholder: "Nickname",
    maxLength: 50,
  },
  {
    title: "Website",
    type: "input",
    inputType: "text",
    name: `website`,
    placeholder: "Website",
    maxLength: 50,
  },
  {
    title: "Employer",
    type: "input",
    inputType: "text",
    name: `employer`,
    placeholder: "Employer",
    maxLength: 50,
  },
  {
    title: "Occupation",
    type: "input",
    inputType: "text",
    name: `occupation`,
    placeholder: "Occupation",
    maxLength: 50,
  },
  {
    title: "Job Title",
    type: "input",
    inputType: "text",
    name: `jobTitle`,
    placeholder: "Job Title",
    maxLength: 150,
  },
  {
    title: "Address Line 1",
    type: "input",
    inputType: "text",
    name: `addressLine1`,
    placeholder: "Address Line 1",
  },
  {
    title: "Address Line 2",
    type: "input",
    inputType: "text",
    name: `addressLine2`,
    placeholder: "Address Line 2",
  },
  {
    title: "Address Line 3",
    type: "input",
    inputType: "text",
    name: `addressLine3`,
    placeholder: "Address Line 3",
  },
  {
    title: "City",
    type: "input",
    inputType: "text",
    name: `city`,
    placeholder: "City",
  },
  {
    title: "State",
    type: "input",
    inputType: "text",
    name: `stateOrProvince`,
    placeholder: "State",
  },
  {
    title: "Zip Code",
    type: "input",
    inputType: "text",
    name: `zipOrPostalCode`,
    placeholder: "Zip Code",
  },
  {
    title: "Country Code",
    type: "input",
    inputType: "text",
    name: `countryCode`,
    placeholder: "Country Code",
  },
];

const FormFieldEditor = ({
  block,
  dataKeyPath,
  dataType,
  itemId,
  fieldsTypes,
}) => {
  const dispatch = useDispatch();

  const { data, sharedData } = block;
  const blockData = useSelector((state) =>
    blockDataSelector({
      state,
      data: dataType === DATA_TYPE.SHARED ? sharedData : data,
    })
  );

  let dataList = blockData;
  dataKeyPath.forEach((key) => (dataList = (dataList || {})[key]));
  const field = dataList.find((d) => d.id === itemId);

  const listItemPropHandler = ({ updatedPropObj, item: changedItem }) => {
    const baseData = cloneDeep(blockData);

    let updatedDataTraversed = baseData;
    dataKeyPath
      .slice(0, dataKeyPath.length - 1)
      .forEach(
        (key) => (updatedDataTraversed = (updatedDataTraversed || {})[key])
      );
    const arr = updatedDataTraversed[dataKeyPath[dataKeyPath.length - 1]];
    const updatedArr = arr.map((item) => {
      return item.id === changedItem.id
        ? {
            ...item,
            ...updatedPropObj,
          }
        : item;
    });
    updatedDataTraversed[dataKeyPath[dataKeyPath.length - 1]] = updatedArr;

    dispatch(setDataItem(baseData));
  };

  const optionsKeyName = (type) => {
    switch (type) {
      case FIELD_TYPES.SELECT:
        return "options";
      case FIELD_TYPES.RADIO:
        return "radios";
      case FIELD_TYPES.CHECKBOX:
        return "checkboxes";
    }
  };

  const placeholderField = (field) => {
    return (
      <div className="option_wrapper">
        <div className="field">
          <label>Placeholder: </label>
          <input
            onChange={(e) =>
              listItemPropHandler({
                updatedPropObj: {
                  placeholder: e.target.value,
                },
                item: field,
              })
            }
            type="text"
            value={field.placeholder}
          />
        </div>
      </div>
    );
  };

  const requiredField = (field) => {
    return (
      <div className="option_wrapper">
        <input
          type="checkbox"
          className="toggle_button"
          checked={!!field.isRequired}
          onChange={() =>
            listItemPropHandler({
              updatedPropObj: {
                isRequired: !field.isRequired,
              },
              item: field,
            })
          }
        ></input>
        <div className="toggle_label">Required</div>
      </div>
    );
  };

  const selectNgpVanField = (e, field) => {
    const selectedField = ngpVanFields.find((f) => f.name === e.target.value);
    listItemPropHandler({
      updatedPropObj: {
        ...selectedField,
        id: field.id,
      },
      item: field,
    });
  };

  const editorView = () => {
    switch (field.type) {
      case FIELD_TYPES.TEXTAREA:
      case FIELD_TYPES.INPUT:
        return (
          <>
            {placeholderField(field)}
            {requiredField(field)}
            {field.type === FIELD_TYPES.INPUT &&
              blockData.formProvider !== "ngpvan" && (
                <>
                  <hr className="big_grey" />
                  <div className="option_wrapper">
                    <div className="field">
                      <label>Input Type: </label>
                      <select
                        value={field.inputType}
                        onChange={(e) =>
                          listItemPropHandler({
                            updatedPropObj: {
                              inputType: e.target.value,
                            },
                            item: field,
                          })
                        }
                      >
                        {inputTypes.map((inputType) => {
                          return (
                            <option value={inputType.type} key={inputType.type}>
                              {inputType.title}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </>
              )}
          </>
        );
      case FIELD_TYPES.CHECKBOX:
      case FIELD_TYPES.RADIO:
      case FIELD_TYPES.SELECT:
        return (
          <>
            {field.type === FIELD_TYPES.SELECT && placeholderField(field)}
            {requiredField(field)}
            <hr className="big_grey" />
            <CustomBlockFilter
              block={{
                ...block,
                type: "SHORT_FORM_OPTION",
                title: optionsKeyName(field.type).toUpperCase(),
                isStaticData: blockData.formProvider === "ngpvan",
              }}
              dataKeyPath={[
                ...dataKeyPath,
                dataList.indexOf(field),
                optionsKeyName(field.type),
              ]}
              dataType={dataType}
            />
          </>
        );
      default:
        return;
    }
  };
  return (
    <>
      <h2>{field.title}</h2>
      <div className="option_wrapper">
        <div className="field">
          {(blockData.formProvider === "ngpvan" && (
            <>
              <label>Field Context: </label>
              <select
                value={field.name}
                onChange={(e) => selectNgpVanField(e, field)}
              >
                {ngpVanFields.map((f) => {
                  return (
                    <option value={f.name} key={f.name}>
                      {f.title}
                    </option>
                  );
                })}
              </select>
            </>
          )) || (
            <>
              <label>Field Type: </label>
              <select
                value={field.type}
                onChange={(e) =>
                  listItemPropHandler({
                    updatedPropObj: {
                      type: e.target.value,
                    },
                    item: field,
                  })
                }
              >
                {fields
                  .filter((field) => fieldsTypes.includes(field.type))
                  .map((f) => {
                    return (
                      <option value={f.type} key={f.type}>
                        {f.title}
                      </option>
                    );
                  })}
              </select>
            </>
          )}
        </div>
      </div>
      {field.type === FIELD_TYPES.HEADING && (
        <div className="option_wrapper">
          <div className="field">
            <label>Text:</label>
            <input
              onChange={(e) =>
                listItemPropHandler({
                  updatedPropObj: {
                    title: e.target.value,
                  },
                  item: field,
                })
              }
              type="text"
              value={field.title}
            />
          </div>
        </div>
      )}

      {field.type !== FIELD_TYPES.HEADING && (
        <div className="option_wrapper">
          <div className="field">
            <label>Field Name: </label>
            <input
              disabled={blockData.formProvider === "ngpvan"}
              onChange={(e) =>
                listItemPropHandler({
                  updatedPropObj: {
                    name: e.target.value,
                  },
                  item: field,
                })
              }
              type="text"
              value={field.name}
            />
          </div>
        </div>
      )}

      <div>{editorView()}</div>
    </>
  );
};
FormFieldEditor.propTypes = {
  block: PropTypes.shape(),
  dataKeyPath: PropTypes.array.isRequired,
  dataType: PropTypes.string,
  itemId: PropTypes.string,
  fieldsTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default FormFieldEditor;
