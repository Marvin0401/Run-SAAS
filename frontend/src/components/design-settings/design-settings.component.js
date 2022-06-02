import React, { useMemo } from "react";

import { ReactSVG } from "react-svg";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";

import CornerIconHalf from "@assets/images/cms/corners_icon-half.svg";
import CornerIconRound from "@assets/images/cms/corners_icon-round.svg";
import CornerIconSquare from "@assets/images/cms/corners_icon-square.svg";

import {
  setBodyFont,
  setButtonFont,
  setCorners,
  setHeadlineFont,
  setPinstripes,
} from "@redux/slices/design";

import ColorCategorySetting from "@components/color-category-setting/color-category-setting.component";
import cloneDeep from "lodash.clonedeep";

const DesignSettings = () => {
  const { activePallet, colorPallets, categories } = useSelector(
    (state) => state.colorPallets
  );

  const savedPallet = useMemo(() => {
    let clonedPallet;

    const originPallet = colorPallets.find((c) => c.id === activePallet?.id);

    if (originPallet) {
      clonedPallet = originPallet;
    } else {
      clonedPallet = cloneDeep(activePallet);
    }

    return clonedPallet;
  }, [activePallet]);

  const fontSetsData = useSelector((state) => state.design?.fontSets);

  const { headlineFont, bodyFont, buttonFont, fontSets, pinstripes, corners } =
    useSelector((store) => store.design);

  const selectedFontSet = useMemo(() => {
    return fontSets.find((fontset) => fontset.id === headlineFont.id);
  }, [fontSets, headlineFont]);

  const isFontSetModified = useMemo(() => {
    return (
      !selectedFontSet ||
      !fontSets.some((fontset) => {
        if (fontset.id === headlineFont.id) {
          return (
            fontset.headline.includes(headlineFont.headline[0]) &&
            fontset.body.includes(bodyFont) &&
            fontset.button.includes(buttonFont)
          );
        }
      })
    );
  }, [fontSets, headlineFont]);

  const dispatch = useDispatch();

  const handleChangeBodyFont = (font) => {
    dispatch(setBodyFont(font));
  };

  const handleChangeButtonFont = (font) => {
    dispatch(setButtonFont(font));
  };

  const handleChangeHeadlineFont = (font) => {
    dispatch(setHeadlineFont(font));
  };

  const handleChangePinstripes = () => {
    dispatch(setPinstripes(!pinstripes));
  };

  const handleChangeCorners = (corner) => {
    dispatch(setCorners(corner));
  };

  return (
    <>
      <h1>Design Settings</h1>

      <h2>Typography</h2>

      <p>
        We have curated a selection of fonts. Depending on which headline font
        you select, only certain body copy and button fonts will be available.
      </p>
      {(!selectedFontSet || isFontSetModified) && (
        <p style={{ color: "red" }}>
          The selected font set has been{" "}
          {!selectedFontSet ? "removed" : "modified"} by the superadmin. It
          won&apos;t break your site but you won&apos;t be able to use this font
          set again once you change it and save edits.
        </p>
      )}
      <div className="option_wrapper">
        <div className="option_top_label">
          <b>Headline font</b>
        </div>

        <div className="font_dropdown headline">
          <div
            className="selected"
            style={{ fontFamily: headlineFont.headline[0] }}
          >
            {headlineFont.headline[0]}
          </div>

          <div className="choices">
            {fontSetsData.map((fontSet) => (
              <div
                style={{ fontFamily: fontSet.headline[0] }}
                key={fontSet.id}
                onClick={() => handleChangeHeadlineFont(fontSet)}
              >
                {fontSet.headline[0]}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="option_wrapper">
        <div className="option_top_label">
          <b>Body copy font</b>
        </div>

        <div className="font_dropdown">
          <div className="selected" style={{ fontFamily: bodyFont }}>
            {bodyFont}
          </div>

          <div className="choices">
            {selectedFontSet?.body.map((font) => (
              <div
                style={{ fontFamily: font }}
                key={font}
                onClick={() => handleChangeBodyFont(font)}
              >
                {font}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="option_wrapper">
        <div className="option_top_label">
          <b>Button font</b>
        </div>

        <div className="font_dropdown">
          <div className="selected" style={{ fontFamily: buttonFont }}>
            {buttonFont}
          </div>

          <div className="choices">
            {selectedFontSet?.button.map((font) => (
              <div
                style={{ fontFamily: font }}
                key={font}
                onClick={() => handleChangeButtonFont(font)}
              >
                {font}
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="big" />

      <h2>Corners</h2>

      <div className="option_wrapper icon_row short_icons three corner">
        <ReactSVG
          src={CornerIconSquare}
          wrapper="svg"
          className={classnames("svg replaced-svg", {
            selected: corners === "no",
          })}
          onClick={() => {
            handleChangeCorners("no");
          }}
        />
        <ReactSVG
          src={CornerIconRound}
          wrapper="svg"
          className={classnames("svg replaced-svg", {
            selected: corners === "rounded",
          })}
          onClick={() => {
            handleChangeCorners("rounded");
          }}
        />
        <ReactSVG
          src={CornerIconHalf}
          wrapper="svg"
          className={classnames("svg replaced-svg", {
            selected: corners === "half_rounded",
          })}
          onClick={() => {
            handleChangeCorners("half_rounded");
          }}
        />
      </div>

      <hr className="big" />

      <div className="option_wrapper">
        <h2>Pinstripes</h2>
        <input
          type="checkbox"
          className="toggle_button"
          checked={pinstripes}
          onChange={handleChangePinstripes}
        ></input>
      </div>

      <hr className="big" />

      <h2>Palette</h2>

      <p>
        For each palette, the header background can be set to several of the
        palette colors, or white, by clicking on the header once the palette is
        selected, by clicking the Hero Block.
      </p>

      <hr className="spacer_small" />

      <div className="option_wrapper">
        <div className="option_top_label ">
          <b>Current Palette</b>
          <br />
          <p>{savedPallet?.title}</p>
        </div>

        <div className="palette_choice selected">
          {savedPallet?.colors?.map((color) => (
            <div style={{ backgroundColor: color.hex }} key={color.id}></div>
          ))}
        </div>
      </div>

      <hr className="spacer_small" />

      {categories.map((item) => (
        <ColorCategorySetting key={item.id} category={item} />
      ))}
    </>
  );
};

export default DesignSettings;
