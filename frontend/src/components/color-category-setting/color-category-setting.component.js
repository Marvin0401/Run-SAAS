import React, { useState } from "react";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";
import LArrowThick from "@assets/images/cms/L_arrow_thick.svg";
import { useDispatch, useSelector } from "react-redux";
import { activeCategoryColorPalletsSelector } from "@redux/selectors/colorPallets";
import { setActivePallet } from "@redux/slices/colorPallets";

const ColorCategorySetting = ({ category }) => {
  const [isShow, setIsShow] = useState(false);

  const dispatch = useDispatch();

  const palletList = useSelector((state) =>
    activeCategoryColorPalletsSelector({ state, categoryId: category.id })
  );

  const handleOnToggle = (e) => {
    e.preventDefault();

    setIsShow(!isShow);
  };

  const handleClickPallet = (colorPallet) => {
    dispatch(setActivePallet(colorPallet));
  };

  return (
    <div className="dropdown_category">
      <div className="category_label" onClick={handleOnToggle}>
        {category.title}
        <ReactSVG
          src={LArrowThick}
          className="drop_arrow default_style"
          wrapper="div"
        />
      </div>

      <div
        className="category_list"
        style={{ display: isShow ? "block" : "none" }}
      >
        {palletList.map((item) => (
          <div
            className="palette_choice"
            key={item.id}
            onClick={() => handleClickPallet(item)}
          >
            {item.colors.map((color) => (
              <div style={{ backgroundColor: color.hex }} key={color.id}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

ColorCategorySetting.propTypes = {
  category: PropTypes.object.isRequired,
};

export default ColorCategorySetting;
