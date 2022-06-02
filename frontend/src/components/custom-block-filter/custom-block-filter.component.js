import React, { useCallback } from "react";
import Drag from "@components/drag/drag.component";
import Drop from "@components/drop/drop.component";
import AddButton from "@components/add-button/add-button.component";
import CustomBlockFilterItem from "@components/custom-block-filter-Item/custom-block-filter-Item.component";
import CalloutBlock from "@components/callout-block/callout-block.component";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { setDataItem, deleteBlock } from "@redux/slices/blockData";
import { addBlock, setBlock } from "@redux/slices/site";
import { blockDataSelector } from "@redux/selectors/site";
import { DATA_TYPE } from "@constants";
import cloneDeep from "lodash.clonedeep";

import {
  CustomBlockFilterConfigConstants,
  DEFAULT_NEW_ITEM,
} from "./custom-block-filter-config.constants";

const CustomBlockFilter = ({
  block,
  dataKeyPath,
  dataType = DATA_TYPE.UNIQUE,
}) => {
  const currentBlockConfig = CustomBlockFilterConfigConstants[block.type];
  const dispatch = useDispatch();

  const { data, sharedData } = block;
  const blockData = useSelector((state) =>
    blockDataSelector({
      state,
      data: dataType === DATA_TYPE.SHARED ? sharedData : data,
    })
  );

  const handleOnChange = (data, isNone) => {
    // remove the existing callout block data
    if (block.callout) {
      dispatch(deleteBlock(block.callout.data));
    }
    return isNone
      ? dispatch(setBlock({ ...block, callout: null }))
      : dispatch(
          addBlock({
            block:
              block.callout && data.type === block.callout.type
                ? block.callout
                : data,
            comparisonId: block.id,
          })
        );
  };

  let dataList = blockData;
  dataKeyPath.forEach((key) => (dataList = (dataList || {})[key]));

  const handleAddItemPress = ({ event }) => {
    event.preventDefault();
    let updatedItem;
    if (block.addItem) {
      updatedItem = block.addItem();
    } else {
      updatedItem =
        (currentBlockConfig.newItem &&
          currentBlockConfig.newItem(dataList?.length ?? 0)) ||
        DEFAULT_NEW_ITEM();
    }

    let updatedItems = [...(dataList || [])];
    if (currentBlockConfig?.shouldItemAddToStart) {
      updatedItems.unshift(updatedItem);
    } else {
      updatedItems.push(updatedItem);
    }

    const updatedData = cloneDeep(blockData);
    let updatedDataTraversed = updatedData;
    dataKeyPath
      .slice(0, dataKeyPath.length - 1)
      .forEach(
        (key) => (updatedDataTraversed = (updatedDataTraversed || {})[key])
      );
    updatedDataTraversed[dataKeyPath[dataKeyPath.length - 1]] = updatedItems;
    dispatch(setDataItem(updatedData));
  };

  const deleteContentItem = ({ id }) => {
    const baseData = cloneDeep(blockData);
    let updatedDataTraversed = baseData;
    dataKeyPath
      .slice(0, dataKeyPath.length - 1)
      .forEach(
        (key) => (updatedDataTraversed = (updatedDataTraversed || {})[key])
      );
    const itemIndex = updatedDataTraversed[
      dataKeyPath[dataKeyPath.length - 1]
    ].findIndex(({ id: idToCheck }) => idToCheck === id);

    updatedDataTraversed[dataKeyPath[dataKeyPath.length - 1]].splice(
      itemIndex,
      1
    );

    dispatch(setDataItem(baseData));
  };

  const handleDrop = useCallback(
    ({ item, dragTargetIndex }) => {
      const dragSourceIndex = item.index;

      if (dragTargetIndex === dragSourceIndex) {
        return;
      }

      const baseData = blockData;

      let temp = cloneDeep(baseData);
      let updatedDataTraversed = temp;
      dataKeyPath
        .slice(0, dataKeyPath.length - 1)
        .forEach(
          (key) => (updatedDataTraversed = (updatedDataTraversed || {})[key])
        );
      // updatedDataTraversed[dataKeyPath[dataKeyPath.length -1]] = updatedItems;
      const arr = updatedDataTraversed[dataKeyPath[dataKeyPath.length - 1]];
      let sourceData = { ...arr[dragSourceIndex] };

      arr.splice(dragSourceIndex, 1);

      if (dragTargetIndex > dragSourceIndex) {
        // decrementing because the child array length decreases by 1 when the item is removed.
        // Adding it at the unchanged targetIndex would result in it being inserted at 1 place forward.
        dragTargetIndex--;
      }

      arr.splice(dragTargetIndex, 0, sourceData);

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

  const listItemPropHandler = ({ updatedPropObj, item: changedItem }) => {
    const baseData = cloneDeep(blockData);

    let updatedDataTraversed = baseData;
    dataKeyPath
      .slice(0, dataKeyPath.length - 1)
      .forEach(
        (key) => (updatedDataTraversed = (updatedDataTraversed || {})[key])
      );
    // updatedDataTraversed[dataKeyPath[dataKeyPath.length -1]] = updatedItems;
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

  const getJSX = (item, idx, type, dataType) => {
    return (
      <div key={item.id}>
        {idx === 0 && (
          <Drop
            acceptableTypes={[type]}
            handleDrop={(item, _targetListType, dragTargetIndex) =>
              handleDrop({
                item,
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
          handleDrop={(item, _targetListType, dragTargetIndex) =>
            handleDrop({
              item,
              dragTargetIndex,
              dataType,
            })
          }
          handleCanDrop={handleCanDrop}
          isNestingAllowed={false}
          id={item.id}
          isSameListAllowed={true}
        >
          <CustomBlockFilterItem
            item={item}
            listItemPropHandler={listItemPropHandler}
            deleteContentItem={deleteContentItem}
            type={block.type}
            dataKey={dataKeyPath}
            actions={block.isStaticData ? [] : currentBlockConfig?.actions}
            blockId={block.id}
          />
        </Drag>
        <Drop
          acceptableTypes={[type]}
          handleDrop={(item, _targetListType, dragTargetIndex) =>
            handleDrop({
              item,
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

  return (
    <>
      {currentBlockConfig?.shouldShowTitle && <h2>{block.title}</h2>}
      {currentBlockConfig?.instruction && (
        <p>{currentBlockConfig.instruction}</p>
      )}
      <Drop
        handleDrop={(item, _targetListType, dragTargetIndex) =>
          handleDrop({
            item,
            dragTargetIndex,
            dataType: DATA_TYPE.UNIQUE,
          })
        }
        index={dataList?.length || 0}
        acceptableTypes={[block.type]}
        handleCanDrop={handleCanDrop}
        type={block.type}
        className="cms_controls_list"
        isList={true}
        allowDrops={true}
      >
        {dataList?.map((item, idx) =>
          getJSX(item, idx, block.type, DATA_TYPE.UNIQUE)
        )}
      </Drop>

      <hr className="spacer_small" />
      {!block.isStaticData &&
        (dataList?.length < currentBlockConfig?.itemsLimit ||
          currentBlockConfig?.itemsLimit == -1) && (
          <AddButton
            label="New item"
            onClick={(e) =>
              handleAddItemPress({
                event: e,
              })
            }
          />
        )}

      <hr className="big_grey" />

      {currentBlockConfig?.shouldShowCallout && (
        <CalloutBlock onChange={handleOnChange} calloutData={block.callout} />
      )}
    </>
  );
};

CustomBlockFilter.propTypes = {
  block: PropTypes.shape(),
  dataKeyPath: PropTypes.array.isRequired,
  dataType: PropTypes.string,
};
export default CustomBlockFilter;
