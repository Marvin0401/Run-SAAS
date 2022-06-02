import React, { useCallback } from "react";

import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setDataItem } from "@redux/slices/blockData";
import { blockDataSelector } from "@redux/selectors/site";

import Drag from "@components/drag/drag.component";
import Drop from "@components/drop/drop.component";

import AddButton from "@components/add-button/add-button.component";

import { DATA_TYPE, ENDORSER_BLOCK } from "@constants";

import { v4 as uuidv4 } from "uuid";
import cloneDeep from "lodash.clonedeep";
import EndorserItem from "@components/endorser-item/endorser-item.component";
import SelectArrow from "@assets/images/select_arrow.svg";

const hash = {
  [ENDORSER_BLOCK.FEATURED_INDIVIDUALS]: "featuredIndividuals",
  [ENDORSER_BLOCK.FEATURED_ORGANIZATIONS]: "featuredOrganizations",
  [ENDORSER_BLOCK.INDIVIDUAL_ENDORSERS]: "individualEndorsers",
  [ENDORSER_BLOCK.ORGANIZATIONAL_ENDORSERS]: "organizationalEndorsers",
};

const itemIdHash = {
  [ENDORSER_BLOCK.FEATURED_INDIVIDUALS]: "featured-individuals",
  [ENDORSER_BLOCK.FEATURED_ORGANIZATIONS]: "featured-organizations",
  [ENDORSER_BLOCK.INDIVIDUAL_ENDORSERS]: "individual-endorsers",
  [ENDORSER_BLOCK.ORGANIZATIONAL_ENDORSERS]: "organizational-endorsers",
};

const VISIBILITY_CONTROLS = [
  { id: uuidv4(), key: "showEyebrow", title: "Show headline 'eyebrow'" },
  {
    id: uuidv4(),
    key: "showDescription",
    title: "Show description",
  },
  {
    id: uuidv4(),
    key: "showFeatureIndividuals",
    title: "Show feature individuals",
  },
  {
    id: uuidv4(),
    key: "showFeatureOrganizations",
    title: "Show feature organizations",
  },
  {
    id: uuidv4(),
    key: "showEndorserList",
    title: "Show endorser list",
  },
];

const NEW_ITEM = {
  title: "New Item",
};

const BlockConfigEndorsementsDefault = ({ block }) => {
  const dispatch = useDispatch();
  const { itemId } = useParams();

  const { data, sharedData } = block;
  const blockData = useSelector((state) => blockDataSelector({ state, data }));
  const sharedBlockData = useSelector((state) =>
    blockDataSelector({ state, data: sharedData })
  );

  const handleAddItemPress = ({ event, includeImage, key, dataType }) => {
    event.preventDefault();

    const updatedItem = {
      ...NEW_ITEM,
      id: uuidv4(),
    };

    if (includeImage) {
      updatedItem.image = null;
    }

    const baseData =
      dataType === DATA_TYPE.UNIQUE ? blockData : sharedBlockData;

    const updatedItems = [...baseData?.[key], updatedItem];

    const updatedData = {
      ...baseData,
      [key]: updatedItems,
    };

    dispatch(setDataItem(updatedData));
  };

  const onChangeVisibility = (visibilityItem) => {
    let baseData =
      visibilityItem.dataType === DATA_TYPE.UNIQUE
        ? { ...blockData }
        : { ...sharedBlockData };
    const updatedData = {
      ...baseData,
      [visibilityItem.key]: !baseData[visibilityItem.key],
    };

    dispatch(setDataItem(updatedData));
  };

  const deleteContentItem = ({ id, key, dataType }) => {
    const baseData =
      dataType === DATA_TYPE.UNIQUE ? blockData : sharedBlockData;
    const updatedItems = baseData?.[key].filter(
      ({ id: idToCheck }) => idToCheck !== id
    );

    const updatedData = {
      ...baseData,
      [key]: updatedItems,
    };

    dispatch(setDataItem(updatedData));
  };

  const itemPropHandler = ({
    updatedPropObj,
    item: changedItem,
    key,
    dataType,
    isList = true,
  }) => {
    const baseData =
      dataType === DATA_TYPE.UNIQUE ? blockData : sharedBlockData;

    let updatedItems;

    if (isList) {
      updatedItems = baseData?.[key].map((item) => {
        return item.id === changedItem.id
          ? {
              ...item,
              ...updatedPropObj,
            }
          : item;
      });
    } else {
      updatedItems = updatedPropObj[key];
    }

    const updatedData = {
      ...baseData,
      [key]: updatedItems,
    };

    dispatch(setDataItem(updatedData));
  };

  const getJSX = (item, idx, type, dataType, collectionName) => {
    return (
      <div key={item.id}>
        {idx === 0 && (
          <Drop
            acceptableTypes={[type]}
            handleDrop={(item, targetListType, dragTargetIndex) =>
              handleDrop({
                item,
                targetListType,
                dragTargetIndex,
                dataType,
              })
            }
            handleCanDrop={handleCanDrop}
            type={type}
            index={0}
            allowDrops={false} // passed back to handleCanDrop
            className={"empty-drop-container"}
          />
        )}
        <Drag
          onHover={() => {
            /** */
          }}
          index={idx}
          listType={type}
          key={idx}
          type={type}
          handleDrop={(item, targetListType, dragTargetIndex) =>
            handleDrop({
              item,
              targetListType,
              dragTargetIndex,
              dataType,
            })
          }
          handleCanDrop={handleCanDrop}
          isNestingAllowed={false}
          id={item.id}
          isSameListAllowed={true}
        >
          <EndorserItem
            collectionName={collectionName}
            dataType={dataType}
            item={item}
            listItemPropHandler={itemPropHandler}
            deleteContentItem={deleteContentItem}
            type={hash[type]}
          />
        </Drag>
        <Drop
          acceptableTypes={[type]}
          handleDrop={(item, targetListType, dragTargetIndex) =>
            handleDrop({
              item,
              targetListType,
              dragTargetIndex,
              dataType,
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

  const handleDrop = useCallback(
    ({ item, targetListType, dragTargetIndex, dataType }) => {
      let childPropName = hash[targetListType]; // target list type and item list type would be same
      const dragSourceIndex = item.index;

      if (dragTargetIndex === dragSourceIndex) {
        return;
      }

      const baseData =
        dataType === DATA_TYPE.UNIQUE ? blockData : sharedBlockData;

      let sourceData = { ...baseData[childPropName][dragSourceIndex] };

      let temp = cloneDeep(baseData);

      temp[childPropName].splice(dragSourceIndex, 1);

      if (dragTargetIndex > dragSourceIndex) {
        // decrementing because the child array length decreases by 1 when the item is removed.
        // Adding it at the unchanged targetIndex would result in it being inserted at 1 place forward.
        dragTargetIndex--;
      }

      temp[childPropName].splice(dragTargetIndex, 0, sourceData);

      dispatch(setDataItem(temp));
    },
    [blockData]
  );

  const handleCanDrop = (item, type) => {
    /**
     * Returns true if a drag source should be dropped on the current drop target.
     *
     * Called by the current drop target.
     */
    return item.type === type;
  };

  return (
    <React.Fragment>
      <div id="blocks" className="endorsement">
        <h1 className="big">Endorsers section</h1>
        <div className="option_group">
          {VISIBILITY_CONTROLS.map((item) => (
            <div className="option_wrapper left" key={item.id}>
              <input
                type="checkbox"
                className="toggle_button"
                checked={blockData[item.key]}
                onChange={() =>
                  onChangeVisibility({
                    ...item,
                    dataType: DATA_TYPE.UNIQUE,
                  })
                }
              ></input>
              <div className="toggle_label">{item.title}</div>
            </div>
          ))}
        </div>
        {itemIdHash[ENDORSER_BLOCK.FEATURED_INDIVIDUALS] === itemId && (
          <>
            <hr className="big_grey" />
            <h2>Featured individuals</h2>

            <Drop
              handleDrop={(item, targetListType, dragTargetIndex) =>
                handleDrop({
                  item,
                  targetListType,
                  dragTargetIndex,
                  dataType: DATA_TYPE.SHARED,
                })
              }
              index={sharedBlockData?.featuredIndividuals.length}
              acceptableTypes={[ENDORSER_BLOCK.FEATURED_INDIVIDUALS]}
              handleCanDrop={handleCanDrop}
              type={ENDORSER_BLOCK.FEATURED_INDIVIDUALS}
              className="cms_controls_list"
              isList={true}
              allowDrops={true}
            >
              {sharedBlockData?.featuredIndividuals.map((item, idx) =>
                getJSX(
                  item,
                  idx,
                  ENDORSER_BLOCK.FEATURED_INDIVIDUALS,
                  DATA_TYPE.SHARED,
                  "featuredIndividuals"
                )
              )}
            </Drop>
          </>
        )}
        {itemIdHash[ENDORSER_BLOCK.FEATURED_ORGANIZATIONS] === itemId && (
          <>
            <hr className="big_grey" />
            <h2>Featured organizations</h2>

            <div className="option_wrapper row_select_wrapper">
              <label htmlFor="rows">
                Number of endorser logo rows to show:
              </label>
              <img src={SelectArrow} className="dropdown_arrow svg" />

              <select
                name="rows"
                id="logo_rows"
                onChange={(e) =>
                  itemPropHandler({
                    updatedPropObj: { numRows: e.target.value },
                    item: {},
                    key: "numRows",
                    dataType: DATA_TYPE.UNIQUE,
                    isList: false,
                  })
                }
                value={blockData.numRows}
              >
                {new Array(10).fill(0).map((v, idx) => {
                  return (
                    <option value={idx + 1} key={idx + 1}>
                      {idx + 1}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="option_wrapper">
              <input
                type="checkbox"
                className="toggle_button"
                checked={blockData?.monochrome}
                onChange={() =>
                  onChangeVisibility({
                    key: "isMonochrome",
                    dataType: DATA_TYPE.SHARED,
                  })
                }
              ></input>
              <div className="toggle_label">Monochrome</div>
            </div>
            <hr className="spacer" />

            <Drop
              handleDrop={(item, targetListType, dragTargetIndex) =>
                handleDrop({
                  item,
                  targetListType,
                  dragTargetIndex,
                  dataType: DATA_TYPE.SHARED,
                })
              }
              index={sharedBlockData?.featuredOrganizations.length}
              acceptableTypes={[ENDORSER_BLOCK.FEATURED_ORGANIZATIONS]}
              handleCanDrop={handleCanDrop}
              type={ENDORSER_BLOCK.FEATURED_ORGANIZATIONS}
              className="cms_controls_list"
              isList={true}
              allowDrops={true}
            >
              {sharedBlockData?.featuredOrganizations.map((item, idx) =>
                getJSX(
                  item,
                  idx,
                  ENDORSER_BLOCK.FEATURED_ORGANIZATIONS,
                  DATA_TYPE.SHARED,
                  "featuredOrganizations"
                )
              )}
            </Drop>

            <hr className="spacer_small" />

            <AddButton
              onClick={(e) =>
                handleAddItemPress({
                  event: e,
                  includeImage: true,
                  key: "featuredOrganizations",
                  dataType: DATA_TYPE.SHARED,
                })
              }
            />
          </>
        )}
        {itemIdHash[ENDORSER_BLOCK.INDIVIDUAL_ENDORSERS] === itemId && (
          <>
            <hr className="big_grey" />
            <h1 className="big">Endorsers list</h1>
            <h2>Individual endorsers</h2>

            <Drop
              handleDrop={(item, targetListType, dragTargetIndex) =>
                handleDrop({
                  item,
                  targetListType,
                  dragTargetIndex,
                  dataType: DATA_TYPE.UNIQUE,
                })
              }
              index={blockData?.individualEndorsers.length}
              acceptableTypes={[ENDORSER_BLOCK.INDIVIDUAL_ENDORSERS]}
              handleCanDrop={handleCanDrop}
              type={ENDORSER_BLOCK.INDIVIDUAL_ENDORSERS}
              className="cms_controls_list"
              isList={true}
              allowDrops={true}
            >
              {blockData?.individualEndorsers.map((item, idx) =>
                getJSX(
                  item,
                  idx,
                  ENDORSER_BLOCK.INDIVIDUAL_ENDORSERS,
                  DATA_TYPE.UNIQUE,
                  "individualEndorsers"
                )
              )}
            </Drop>

            <hr className="spacer_small" />

            <AddButton
              onClick={(e) =>
                handleAddItemPress({
                  event: e,
                  includeImage: false,
                  key: "individualEndorsers",
                  dataType: DATA_TYPE.UNIQUE,
                })
              }
            />
          </>
        )}

        {itemIdHash[ENDORSER_BLOCK.ORGANIZATIONAL_ENDORSERS] === itemId && (
          <>
            <hr className="big_grey" />
            <h1 className="big">Endorsers list</h1>
            <h2>Organizational endorsers</h2>

            <Drop
              handleDrop={(item, targetListType, dragTargetIndex) =>
                handleDrop({
                  item,
                  targetListType,
                  dragTargetIndex,
                  dataType: DATA_TYPE.SHARED,
                })
              }
              index={blockData.organizationalEndorsers.length}
              acceptableTypes={[ENDORSER_BLOCK.ORGANIZATIONAL_ENDORSERS]}
              handleCanDrop={handleCanDrop}
              type={ENDORSER_BLOCK.ORGANIZATIONAL_ENDORSERS}
              className="cms_controls_list"
              isList={true}
              allowDrops={true}
            >
              {blockData?.organizationalEndorsers.map((item, idx) =>
                getJSX(
                  item,
                  idx,
                  ENDORSER_BLOCK.ORGANIZATIONAL_ENDORSERS,
                  DATA_TYPE.UNIQUE,
                  "organizationalEndorsers"
                )
              )}
            </Drop>

            <hr className="spacer_small" />
            <AddButton
              onClick={(e) =>
                handleAddItemPress({
                  event: e,
                  includeImage: false,
                  key: "organizationalEndorsers",
                  dataType: DATA_TYPE.UNIQUE,
                })
              }
            />
          </>
        )}
      </div>
    </React.Fragment>
  );
};

BlockConfigEndorsementsDefault.propTypes = {
  block: PropTypes.shape(),
};

export default BlockConfigEndorsementsDefault;
