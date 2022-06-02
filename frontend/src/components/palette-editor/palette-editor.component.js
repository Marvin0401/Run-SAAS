/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blockSelector } from "@redux/selectors/site";
import { activePageThemeSelector } from "@redux/selectors/design";

import SimplePopUp from "@components/simple-pop-up/simple-pop-up.component";
import Drag from "@components/drag/drag.component";
import Drop from "@components/drop/drop.component";
import ColorList from "@components/color-list/color-list.component";

import AddButton from "@components/add-button/add-button.component";
import { v4 as uuidv4 } from "uuid";
import Loader from "@components/loader/loader.component";
import IconTrash from "@assets/images/cms/list_icon-trash.svg";
import IconOpenButton from "@assets/images/open_button.svg";
import { ReactSVG } from "react-svg";
import { cloneDeep } from "lodash";
import classnames from "classnames";
import {
  closeResetPalletSidebar,
  updateColorPallet,
  setActivePallet,
  mergePalletCssTheme,
  updateSelectedBlockTheme,
  patchColorPalette,
  setIsShowPalletSidebar,
  updateColor,
  createColorPalette,
  updateColorOrder,
} from "@redux/slices/colorPallets";
import root from "react-shadow";

import generalStyles from "@styles/general.scss";
import cmsStyles from "@styles/cms_shadow.scss";
import formsStyles from "@styles/forms.scss";
import buttonsStyles from "@styles/buttons.scss";

const NEW_COLOR_ID = "new_color_id";

const PaletteEditor = () => {
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const savedColors = useRef(null);
  const savedBlockThemes = useRef(null);

  const matchParams = useRouteMatch("/cms/page/:pageId/block/:blockId");

  const activePallet = useSelector((state) => state.colorPallets.activePallet);

  const activePageBlocks = useSelector((state) => state.site.activePage.blocks);

  const [colors, setColors] = useState([]);

  const [alterColorModalData, setAlterColorModalData] = useState({
    category: "alternateColor",
    id: null,
    isVisible: false,
    deletedColor: null,
    candidateColor: null,
  });

  const { selectedBlockTheme, scrapingStatus } = useSelector(
    (state) => state.colorPallets
  );

  const blockId = matchParams?.params?.blockId;

  const activeBlockId = useMemo(() => {
    if (blockId) {
      return blockId;
    }

    return activePageBlocks[0].id;
  }, [activePageBlocks, blockId]);

  const block = useSelector((state) =>
    blockSelector({ state, blockId: activeBlockId })
  );

  const activeBlockThemes = useSelector((state) => state.design.blockThemes);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!savedColors.current) {
      savedColors.current = activePallet?.colors || [];
    }

    if (!savedBlockThemes.current) {
      savedBlockThemes.current = activeBlockThemes;
    }
  }, [activePallet, activeBlockThemes]);

  const handleAddColor = () => {
    const newColorItem = {
      id: NEW_COLOR_ID + (activePallet?.colors?.length || 0),
      name: "new_color",
      hex: "#fff",
    };

    const updatedColorPallet = cloneDeep(activePallet);
    updatedColorPallet.colors.push(newColorItem);
    dispatch(setActivePallet(updatedColorPallet));
  };

  /*
   * Replace the deleted color with selected alternate color
   */
  const handleUseAlternateColor = (deletedColor, alternateColor) => {
    if (!deletedColor || !alternateColor) {
      return;
    }

    const updatedBlockTheme = cloneDeep(selectedBlockTheme);
    const newColor = getCssColor(alternateColor);

    let themeChanged = false;
    if (updatedBlockTheme) {
      Object.keys(updatedBlockTheme.theme).map((cssAttribute, idx) => {
        Object.keys(updatedBlockTheme.theme[cssAttribute]).map(
          (cssTag, cssTagIdx) => {
            if (
              updatedBlockTheme.theme[cssAttribute][cssTag] === deletedColor
            ) {
              updatedBlockTheme.theme[cssAttribute][cssTag] = newColor;
              themeChanged = true;
            }
          }
        );
      });

      // if theme is changed, dispatch it
      if (themeChanged) {
        dispatch(
          updateSelectedBlockTheme({
            blockType: selectedBlockTheme.blockType,
            theme: updatedBlockTheme.theme,
          })
        );

        dispatch(mergePalletCssTheme(updatedBlockTheme.theme));
      }
    }
  };

  const handleSelectAlterColor = (e, color) => {
    e.preventDefault();

    handleUseAlternateColor(alterColorModalData.deletedColor, color);

    setAlterColorModalData({
      category: null,
      id: null,
      isVisible: false,
      deletedColor: null,
      candidateColor: null,
    });
  };

  const handleOnClickDelete = (colorItem) => {
    const handleOnSelectAlterColor = (color) => {
      const updatedColorPallet = cloneDeep(activePallet);

      const colorItemIdx = updatedColorPallet.colors?.findIndex(
        (item) => item.id === color.id
      );

      if (colorItemIdx == undefined || colorItemIdx < 0) {
        return;
      }

      setAlterColorModalData({
        category: null,
        id: colorItemIdx,
        isVisible: true,
        deletedColor: color.hex,
        candidateColor: null,
      });
    };

    handleOnSelectAlterColor(colorItem);

    const newColorItem = {
      ...colorItem,
      name: "new_color",
      hex: "#fff",
    };

    const updatedColorPallet = cloneDeep(activePallet);

    updatedColorPallet.colors = updatedColorPallet.colors.filter(
      (item) => item.id !== colorItem.id
    );

    const isNewItem = colorItem.id.includes(NEW_COLOR_ID);

    if (!isNewItem) {
      updatedColorPallet.colors.push(newColorItem);
    }

    dispatch(setActivePallet(updatedColorPallet));
  };

  const handleChangeColor = (blockTheme, cssAttribute, cssTag, color) => {
    const updatedBlockTheme = cloneDeep(blockTheme);

    updatedBlockTheme[cssAttribute][cssTag] = getCssColor(color);

    dispatch(
      updateSelectedBlockTheme({
        blockType: selectedBlockTheme.blockType,
        theme: updatedBlockTheme,
      })
    );

    dispatch(mergePalletCssTheme(updatedBlockTheme));
  };

  const handleChangePalletItem = (colorItem, payload) => {
    const updatedItem = {
      ...colorItem,
      ...payload,
    };

    const updatedColorPallet = cloneDeep(activePallet);

    const colorItemIdx = updatedColorPallet.colors?.findIndex(
      (item) => item.id === updatedItem.id
    );

    if (colorItemIdx == undefined || colorItemIdx < 0) {
      return;
    }

    if (updatedColorPallet?.colors[colorItemIdx]) {
      updatedColorPallet.colors[colorItemIdx] = updatedItem;
      dispatch(setActivePallet(updatedColorPallet));
    }
  };

  const handleSave = () => {
    const updatedColorPallet = cloneDeep(activePallet);

    if (updatedColorPallet.id) {
      dispatch(
        patchColorPalette({
          data: {
            blockTheme: activePallet.blockTheme,
          },
          id: updatedColorPallet.id,
        })
      );
    }

    activePallet?.colors.forEach((color) => {
      const updatedColor = cloneDeep(color);
      delete updatedColor.order;
      delete updatedColor.id;
      delete updatedColor.created_on;
      delete updatedColor.updated_on;
      delete updatedColor.is_active;

      updateColor.palette_id = updatedColorPallet.id;

      const isNewItem = color.id.includes(NEW_COLOR_ID);

      if (isNewItem) {
        dispatch(
          createColorPalette({
            data: {
              title: updatedColorPallet.title,
              color_category_title: updatedColorPallet.color_category_title,
              colors: [
                {
                  name: updatedColor.name,
                  hex: updatedColor.hex,
                  css_var: updateColor.css_var,
                },
              ],
            },
          })
        );
      } else {
        dispatch(
          updateColor({
            data: { ...updatedColor, palette_id: updatedColorPallet.id },
            id: color.id,
          })
        );
        dispatch(
          updateColorOrder({
            data: {
              order: color.order,
            },
            id: color.id,
          })
        );
      }
    });

    dispatch(updateColorPallet(updatedColorPallet));
    dispatch(setIsShowPalletSidebar(false));
  };

  const getCssColor = (color) => {
    if (color.hex) {
      return color.hex;
    }

    if (color.css_var) {
      return `var(--${color.css_var})`;
    }

    return color;
  };

  const handleClose = () => {
    dispatch(closeResetPalletSidebar());
  };

  const isUnset = (cssTag) => {
    return cssTag == "unset_run";
  };

  const getActiveSwatchStyle = (cssTab) => {
    return {
      background: isUnset(cssTab) ? "transparent" : cssTab,
    };
  };

  const paletteColors = useMemo(() => {
    const colors = activePallet?.colors ? [...activePallet?.colors] : [];
    colors.sort((c) => c.order * -1);

    return activePallet?.colors;
  }, [activePallet]);

  const handleCanDrop = () => true;

  const handleDrop = ({ item, dragTargetIndex }) => {
    const colorItem = paletteColors.find((c) => c.id == item.id);

    const dragSourceIndex = item.index;

    if (dragTargetIndex === dragSourceIndex) {
      return;
    }

    let temp = cloneDeep(paletteColors);

    temp.splice(dragSourceIndex, 1);

    temp.splice(dragTargetIndex, 0, colorItem);

    const updatedColorPallet = cloneDeep(activePallet);
    updatedColorPallet.colors = temp.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));

    dispatch(setActivePallet(updatedColorPallet));
  };

  const getJSX = (item, idx, type) => {
    return (
      <div key={item.id}>
        {/* {idx === 0 && (
          <Drop
            acceptableTypes={[type]}
            handleDrop={(item, _, dragTargetIndex) =>
              handleDrop({
                item,
                dragTargetIndex,
              })
            }
            handleCanDrop={handleCanDrop}
            type={type}
            index={0}
            allowDrops={false} // passed back to handleCanDrop
            className={"empty-drop-container"}
          />
        )} */}
        <Drag
          onHover={() => {
            /** */
          }}
          index={idx}
          listType={type}
          key={idx}
          type={type}
          handleDrop={(item, _, dragTargetIndex) =>
            handleDrop({
              item,
              dragTargetIndex,
            })
          }
          handleCanDrop={handleCanDrop}
          isNestingAllowed={false}
          id={item.id}
          isSameListAllowed={true}
        >
          <li key={item.id}>
            <div className="row_wrapper">
              <a
                className="palette_list_preview"
                style={{ background: item.hex }}
              ></a>

              <input
                type="text"
                value={item.name}
                name="color"
                onChange={(e) => {
                  handleChangePalletItem(item, {
                    name: e.target.value,
                  });
                  e.preventDefault();
                }}
              />
              <input
                type="text"
                value={item.hex}
                name="hex_code"
                onChange={(e) => {
                  handleChangePalletItem(item, {
                    hex: e.target.value,
                  });
                  e.preventDefault();
                }}
              />
              <ReactSVG
                src={IconTrash}
                className="svg"
                wrapper="span"
                onClick={() => handleOnClickDelete(item)}
              />

              <ReactSVG
                src={IconOpenButton}
                className="svg drag_icon"
                wrapper="span"
              />
            </div>
          </li>
        </Drag>
        <Drop
          acceptableTypes={[type]}
          handleDrop={(item, _, dragTargetIndex) =>
            handleDrop({
              item,
              dragTargetIndex,
            })
          }
          handleCanDrop={handleCanDrop}
          type={type}
          index={idx + 1}
          allowDrops={false}
          className={"empty-drop-container"}
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <style>{cmsStyles}</style>
      <SimplePopUp
        label="Select Candidate Colors"
        cssName="block_popup_right"
        isVisible={alterColorModalData.isVisible}
        onClose={() =>
          setAlterColorModalData({
            category: null,
            id: null,
            isVisible: false,
          })
        }
      >
        {
          <ColorList
            handleSelectAlertNateColor={handleSelectAlterColor}
            idx={alterColorModalData.id}
          />
        }
      </SimplePopUp>
      <root.div className="main_control_bar">
        <style>{generalStyles}</style>
        <style>{buttonsStyles}</style>
        <style>{formsStyles}</style>
        <style>{cmsStyles}</style>
        <div className={"cms_sidebar"}>
          <div>
            <h1>Palette Editor</h1>
            <p>
              <b>{activePallet?.title}</b>
            </p>

            <ul className="cms_controls_list">
              <Drop
                handleDrop={(item, _, dragTargetIndex) => {
                  handleDrop({
                    item,
                    dragTargetIndex,
                  });
                }}
                index={paletteColors?.length}
                acceptableTypes={["color_item"]}
                handleCanDrop={handleCanDrop}
                type={"color_item"}
                className="cms_controls_list"
                isList={true}
                allowDrops={true}
              >
                {paletteColors?.map((item, idx) =>
                  getJSX(item, idx, "color_item")
                )}
              </Drop>
            </ul>

            <hr className="spacer_small" />

            <AddButton label="Add color" onClick={handleAddColor} />

            {/* <hr className="spacer" />

        <a href="" className="text_link">
          View all unset colors on palette
        </a>
        <br />
        <a href="" className="text_link">
          View all unset colors on block
        </a>
        <br />
        <a href="" className="text_link">
          Assign class colors to new class
        </a>
        <br />
        <a href="" className="text_link">
          Delete class
        </a>
        <br />
        <br />

        <div className="input_wrapper">
          <label>Find class:</label>
          <input type="text" onChange={() => {}} />
        </div>

        <div className="input_wrapper">
          <label>Assign color to:</label>
          <input type="text" onChange={() => {}} />
        </div>

        <button>Assign</button> */}

            <>
              <hr className="spacer" />
              <h2>{selectedBlockTheme?.blockType} BLOCK</h2>
              <hr className="spacer_small" />
              {scrapingStatus == "loading" && <Loader className="small" />}

              {!!selectedBlockTheme?.theme &&
                Object.keys(selectedBlockTheme.theme).map(
                  (cssAttribute, idx) => (
                    <div
                      className="class_color_edit_row"
                      key={cssAttribute + idx}
                    >
                      <div className="selected_class">{cssAttribute}</div>

                      {Object.keys(selectedBlockTheme.theme[cssAttribute]).map(
                        (cssTag, cssTagIdx) => (
                          <div className="style_row" key={cssTag}>
                            <div className="attribute_name">{cssTag}</div>
                            <div
                              className={classnames("active_swatch", {
                                "swatch unset": isUnset(
                                  selectedBlockTheme.theme[cssAttribute][cssTag]
                                ),
                              })}
                              style={getActiveSwatchStyle(
                                selectedBlockTheme.theme[cssAttribute][cssTag]
                              )}
                            ></div>

                            <div className="swatch_choices">
                              <div
                                className="swatch unset"
                                onClick={() =>
                                  handleChangeColor(
                                    selectedBlockTheme.theme,
                                    cssAttribute,
                                    cssTag,
                                    "unset_run"
                                  )
                                }
                              />
                              {activePallet?.colors?.map((color) => (
                                <div
                                  key={color.id + cssTagIdx}
                                  className="swatch"
                                  style={{ background: getCssColor(color) }}
                                  onClick={() =>
                                    handleChangeColor(
                                      selectedBlockTheme.theme,
                                      cssAttribute,
                                      cssTag,
                                      color
                                    )
                                  }
                                ></div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )
                )}
            </>
          </div>
        </div>
      </root.div>

      <root.div className="cms_bottom_nav_container palette_editor">
        <style>{generalStyles}</style>
        <style>{buttonsStyles}</style>
        <style>{cmsStyles}</style>

        <div className="cms_bottom_nav palette_editor">
          <div className="bottom_nav_right">
            <Link to="/cms/palette-editor">
              <button href="palette_manager_wrapper.php">Manage</button>
            </Link>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      </root.div>
    </React.Fragment>
  );
};

export default PaletteEditor;
