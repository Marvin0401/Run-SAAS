import React, { useCallback } from "react";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { setDataItem } from "@redux/slices/blockData";
import { blockDataSelector } from "@redux/selectors/site";

import Drag from "@components/drag/drag.component";
import Drop from "@components/drop/drop.component";

import AddButton from "@components/add-button/add-button.component";

import { ReactSVG } from "react-svg";

import IconTrash from "@assets/images/cms/list_icon-trash.svg";
import IconOpenButton from "@assets/images/open_button.svg";

import { DATA_TYPE, ISSUE_TYPE } from "@constants";

import { v4 as uuidv4 } from "uuid";
import cloneDeep from "lodash.clonedeep";

const hash = {
  [ISSUE_TYPE.ITEM]: "items",
};

const VISIBILITY_CONTROLS = [
  { id: uuidv4(), key: "showEyebrow", title: "Show headline 'eyebrow'" },
  {
    id: uuidv4(),
    key: "showLinkToFullIssuePages",
    title: "Link to full issue pages",
  },
  {
    id: uuidv4(),
    key: "showPageDescription",
    title: "Show page description",
  },
];

const NEW_ITEM = {
  title: "New Item",
};

const BlockConfigIssueDefault = ({ block }) => {
  const dispatch = useDispatch();

  const { data, sharedData } = block;

  const blockData = useSelector((state) => blockDataSelector({ state, data }));

  const sharedBlockData = useSelector((state) =>
    blockDataSelector({ state, data: sharedData })
  );

  const handleAddItemPress = (event) => {
    event.preventDefault();

    const updatedItem = {
      ...NEW_ITEM,
      id: uuidv4(),
    };

    const updatedItems = [...blockData?.items, updatedItem];

    const updatedData = {
      ...blockData,
      items: updatedItems,
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

  const deleteContentItem = ({ id, dataType }) => {
    const baseData =
      dataType === DATA_TYPE.UNIQUE ? blockData : sharedBlockData;

    const updatedItems = baseData?.items.filter(
      ({ id: idToCheck }) => idToCheck !== id
    );

    const updatedData = {
      ...baseData,
      items: updatedItems,
    };

    dispatch(setDataItem(updatedData));
  };

  const getJSX = (item, idx, type, dataType) => {
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
          <li key={item.id}>
            <div className="row_wrapper">
              <input type="text" value={item.title} disabled />
              <ReactSVG
                src={IconTrash}
                className="svg"
                wrapper="span"
                onClick={() =>
                  deleteContentItem({ id: item.id, dataType: DATA_TYPE.UNIQUE })
                }
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
        <h1 className="big">Issues section</h1>
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
          <hr className="spacer" />
          <Drop
            handleDrop={(item, targetListType, dragTargetIndex) =>
              handleDrop({
                item,
                targetListType,
                dragTargetIndex,
                dataType: DATA_TYPE.UNIQUE,
              })
            }
            index={blockData?.items.length}
            acceptableTypes={[ISSUE_TYPE.ITEM]}
            handleCanDrop={handleCanDrop}
            type={ISSUE_TYPE.ITEM}
            className="cms_controls_list"
            isList={true}
            allowDrops={true}
          >
            {blockData?.items.map((item, idx) =>
              getJSX(item, idx, ISSUE_TYPE.ITEM, DATA_TYPE.UNIQUE)
            )}
          </Drop>
          <AddButton label="New item" onClick={handleAddItemPress} />
        </div>
      </div>
    </React.Fragment>
  );
};

BlockConfigIssueDefault.propTypes = {
  block: PropTypes.shape(),
};

export default BlockConfigIssueDefault;
