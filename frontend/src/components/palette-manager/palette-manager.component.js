import React from "react";

import ColorPalletteCategory from "@components/color-pallette-category/color-pallette-category.component";

import { useSelector } from "react-redux";

const PaletteManager = () => {
  const { categories } = useSelector((state) => state.colorPallets);

  return (
    <div className="full_screen_control_bar">
      <h1>Palette Manager</h1>

      <div className="full_row_wrapper sixths">
        {categories.map((item) => (
          <ColorPalletteCategory category={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default PaletteManager;
