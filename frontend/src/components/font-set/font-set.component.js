import React, { useState } from "react";
import PropTypes from "prop-types";
import IconSave from "@assets/images/cms/save-icon.svg";
import EditIcon from "@assets/images/cms/list_icon-edit.svg";
import CLOSE_BUTTON from "@assets/images/close_button.svg";
import IconTrash from "@assets/images/cms/list_icon-trash.svg";
import RunAutocompleteMultiple from "@components/run-autocomplete-multiple/run-autocomplete-multiple.component";

import { ReactSVG } from "react-svg";
import { useDispatch } from "react-redux";
import { addFontSet, updateFontSet, deleteFontSet } from "@redux/slices/design";

const FontSet = ({ selectedData: currentData, fontsData, isNew, hideNew }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(isNew);

  const addFamily = (data) => {
    let updatedData = {};

    Object.entries(data).map(([propName, value]) => {
      if (Array.isArray(value)) {
        updatedData[propName] = value.map((item) => {
          return { family: item };
        });
      } else {
        updatedData[propName] = value;
      }
    });

    return updatedData;
  };

  const [selectedData, setSelectedData] = useState(addFamily(currentData));

  const validate = () => {
    return !!(
      selectedData?.title &&
      selectedData?.headline &&
      selectedData?.headline.length > 0 &&
      selectedData?.body &&
      selectedData?.body.length > 0 &&
      selectedData?.button &&
      selectedData?.button.length > 0
    );
  };

  const extractFamily = (data) => {
    return data.map((item) => item.family);
  };

  const handleOnSubmit = () => {
    if (validate()) {
      const data = {
        title: selectedData.title,
        headline: extractFamily(selectedData.headline),
        body: extractFamily(selectedData.body),
        button: extractFamily(selectedData.button),
      };

      if (isNew) {
        dispatch(addFontSet({ data }));
        hideNew();
      } else {
        data.id = selectedData.id;
        dispatch(updateFontSet({ data }));
      }
      setEdit(false);
    }
  };

  const handleOnChange = (propName, value) => {
    setSelectedData((currentData) => {
      return { ...currentData, [propName]: value };
    });
  };

  const handleDelete = () => {
    if (isNew) {
      hideNew();
    } else {
      dispatch(deleteFontSet({ id: selectedData.id }));
    }
  };

  return (
    <div className="fontset">
      <input
        type="text"
        name="title"
        onChange={(e) => handleOnChange("title", e.target.value)}
        value={selectedData?.title || ""}
        disabled={!edit}
      />
      <RunAutocompleteMultiple
        options={fontsData}
        valueKey="family"
        labelKey="family"
        defaultValues={selectedData?.headline}
        onChange={(val) => handleOnChange("headline", val)}
        disabled={!edit}
        isSingle={true}
      />
      {/* <Select
        values={selectedData?.headline}
        options={fontsData}
        onChange={(val) => handleOnChange("headline", val)}
        labelField="family"
        valueField="family"
        className="formset"
        disabled={!edit}
      /> */}
      <RunAutocompleteMultiple
        options={fontsData}
        valueKey="family"
        labelKey="family"
        defaultValues={selectedData?.body}
        onChange={(val) => handleOnChange("body", val)}
        disabled={!edit}
      />
      {/* <Select
        values={selectedData?.body}
        options={fontsData}
        labelField="family"
        valueField="family"
        multi
        className="formset"
        onChange={(val) => handleOnChange("body", val)}
        disabled={!edit}
      /> */}
      <RunAutocompleteMultiple
        options={fontsData}
        valueKey="family"
        labelKey="family"
        defaultValues={selectedData?.button}
        onChange={(val) => handleOnChange("button", val)}
        disabled={!edit}
      />
      {/* <Select
        values={selectedData?.button}
        options={fontsData}
        labelField="family"
        valueField="family"
        multi
        className="formset"
        onChange={(val) => handleOnChange("button", val)}
        disabled={!edit}
      /> */}
      {edit || isNew ? (
        <ReactSVG
          src={IconSave}
          className="svg"
          wrapper="span"
          onClick={handleOnSubmit}
        />
      ) : (
        <ReactSVG
          src={EditIcon}
          className="svg"
          wrapper="span"
          onClick={() => setEdit(true)}
        />
      )}
      {edit && !isNew ? (
        <ReactSVG
          src={CLOSE_BUTTON}
          className="svg black-stroke"
          wrapper="span"
          onClick={() => setEdit(false)}
        />
      ) : (
        <ReactSVG
          src={IconTrash}
          className="svg black-stroke"
          wrapper="span"
          onClick={handleDelete}
        />
      )}
    </div>
  );
};

FontSet.propTypes = {
  selectedData: PropTypes.object,
  fontsData: PropTypes.array,
  isNew: PropTypes.bool,
  hideNew: PropTypes.func,
};

export default FontSet;
