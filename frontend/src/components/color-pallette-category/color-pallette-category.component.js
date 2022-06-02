/* eslint-disable no-unused-vars */
import React, { useCallback } from "react";

import ColorPalletteItem from "@components/color-pallette-item/color-pallette-item.component";
import PropTypes from "prop-types";
import { categoryColorPalletsSelector } from "@redux/selectors/colorPallets";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  updateColorPallet,
  patchColorPalette,
  createColorPalette,
  getColorPalettes,
} from "@redux/slices/colorPallets";

const ColorPalletteCategory = ({ category }) => {
  const { categories } = useSelector((state) => state.colorPallets);

  const dispatch = useDispatch();

  const { title, id: categoryId } = category;

  const palletList = useSelector((state) =>
    categoryColorPalletsSelector({ state, categoryId })
  );

  const apiUpdateName = useCallback(
    debounce(
      (name, id) =>
        dispatch(
          patchColorPalette({
            data: {
              title: name,
            },
            id,
          })
        ),
      500
    ),
    [title]
  );

  const handleUpdatePalletName = (item, val) => {
    dispatch(
      updateColorPallet({
        ...item,
        title: val,
      })
    );

    apiUpdateName(val.trim(), item.id);
  };

  const handleToggleVisibility = (item) => {
    dispatch(
      updateColorPallet({
        ...item,
        is_active: !item.is_active,
      })
    );

    dispatch(
      patchColorPalette({
        data: {
          is_active: !item.is_active,
        },
        id: item.id,
      })
    );
  };

  const handleRemoveItem = (item) => {
    handleToggleCategory(item, categoryId);
  };

  const getItemVisibility = (item) => {
    return item.is_active;
  };

  const getItemRemovable = (item) => {
    return item?.categories.length > 1;
  };

  const handleDuplicate = async (colorPallet) => {
    const data = {
      color_category_title: title,
      ...colorPallet,
      title: colorPallet.title + " Copy",
      categories: [categoryId],
    };

    await dispatch(
      createColorPalette({
        data,
      })
    );

    await dispatch(getColorPalettes());
  };

  const handleToggleCategory = (item, catId) => {
    let newCategories = item.categories;

    if (newCategories.includes(catId)) {
      if (!getItemRemovable(item)) {
        return;
      }

      newCategories = newCategories.filter((i) => i !== catId);
    } else {
      newCategories = [...newCategories, catId];
    }

    dispatch(
      updateColorPallet({
        ...item,
        categories: newCategories,
      })
    );

    dispatch(
      patchColorPalette({
        data: {
          categories: newCategories,
        },
        id: item.id,
      })
    );
  };

  return (
    <div className="full_option_wrapper">
      <h2 className="full">{title}</h2>

      <ul className="cms_controls_list">
        {palletList.map((item) => (
          <li key={item.id}>
            <ColorPalletteItem
              item={item}
              onUpdateName={handleUpdatePalletName}
              onToggleVisibility={() => handleToggleVisibility(item)}
              isVisible={getItemVisibility(item)}
              isRemovable={getItemRemovable(item)}
              onRemove={() => handleRemoveItem(item)}
              onDuplicate={() => handleDuplicate(item)}
              categories={categories}
              onToggleCategory={handleToggleCategory}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

ColorPalletteCategory.propTypes = {
  category: PropTypes.object,
};

export default ColorPalletteCategory;
