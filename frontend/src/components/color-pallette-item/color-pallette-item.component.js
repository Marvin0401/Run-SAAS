/* eslint-disable no-unused-vars */
import React from "react";

import PropTypes from "prop-types";

import { ReactSVG } from "react-svg";

import CheckMark from "@assets/images/checkmark.svg";
import IconDuplicate from "@assets/images/cms/list_icon-duplicate.svg";
import IconTrash from "@assets/images/cms/list_icon-trash.svg";
import IconOpenButton from "@assets/images/open_button.svg";
import IconHide from "@assets/images/cms/list_icon-hide.svg";
import IconShow from "@assets/images/cms/list_icon-show.svg";

import TextEditor from "@components/text-editor/text-editor.component";

const ColorPalletteItem = ({
  categories,
  item,
  onUpdateName,
  onToggleVisibility,
  onRemove,
  isRemovable,
  onDuplicate,
  isVisible,
  onToggleCategory,
}) => {
  return (
    <div>
      <div className="row_wrapper">
        <TextEditor
          value={item.title}
          onChange={(val) => onUpdateName(item, val)}
          isSimple
          charLimit={20}
          element="input"
        />

        <div className="color_category_selector_section">
          {categories.map((category) => (
            <div className="checkbox_wrapper" key={category.id}>
              <input
                type="checkbox"
                id="confirm"
                name="confirmation"
                value="Confirmed"
                checked={item.categories.includes(category.id)}
                onChange={() => onToggleCategory(item, category.id)}
              />
              <ReactSVG src={CheckMark} className="svg" />
            </div>
          ))}
        </div>
        {isVisible && (
          <ReactSVG
            src={IconHide}
            className="svg"
            onClick={onToggleVisibility}
          />
        )}
        {!isVisible && (
          <ReactSVG
            src={IconShow}
            className="svg"
            onClick={onToggleVisibility}
          />
        )}

        <ReactSVG src={IconDuplicate} className="svg" onClick={onDuplicate} />

        {isRemovable && (
          <ReactSVG src={IconTrash} className="svg" onClick={onRemove} />
        )}

        {/* <ReactSVG src={IconOpenButton} className="svg" /> */}
      </div>

      <div className="palette_manager_colors_preview">
        {item.colors.map((color) => (
          <div style={{ background: color.hex }} key={color.id}></div>
        ))}
      </div>
    </div>
  );
};

ColorPalletteItem.propTypes = {
  categories: PropTypes.array,
  item: PropTypes.object,
  onUpdateName: PropTypes.func,
  onToggleVisibility: PropTypes.func,
  onToggleCategory: PropTypes.func,
  onRemove: PropTypes.func,
  onDuplicate: PropTypes.func,
  isRemovable: PropTypes.bool,
  isVisible: PropTypes.bool,
};

export default ColorPalletteItem;
