import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addBlock, setPageBlocks } from "@redux/slices/site";

import { ReactSVG } from "react-svg";
import cloneDeep from "lodash.clonedeep";

import { useParams } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import {
  pageBlocksSelector,
  isDefaultPageSelector,
} from "@redux/selectors/site";

import IconAdd from "@assets/images/cms/add_icon.svg";

import SimplePopUp from "@components/simple-pop-up/simple-pop-up.component";
import Block from "@components/block/block.component";
import Drag from "@components/drag/drag.component";
import Drop from "@components/drop/drop.component";
import LockedBlocks from "@components/locked-blocks/locked-blocks.component";
import BlockList from "@components/block-list/block-list.component";

import BlocksIcon from "@assets/images/cms/nav_icon-blocks.svg";

import { BLOCK_CATEGORIES, BLOCK_VARIANT } from "@constants";

const ACCEPTABLE_TYPES = Object.keys(BLOCK_VARIANT);

const Blocks = () => {
  const dispatch = useDispatch();

  const { pageId } = useParams();

  const activePage = useSelector((state) => state.site.activePage);

  const data = useSelector((state) => pageBlocksSelector({ state, pageId }));
  const isDefaultPage = useSelector((state) =>
    isDefaultPageSelector({ state, pageId })
  );

  const [dataHash, setDataHash] = useState(null);

  const [addModalData, setAddModalData] = useState({
    category: "category1",
    id: null,
    isVisible: false,
  });

  useEffect(() => {
    // generate hash for data
    let hash = {};
    data.forEach((item, idx) => {
      hash[item.type] = { index: idx, children: {} };
      item.children.forEach((child, idx) => {
        hash[item.type].children[child.id] = { index: idx, children: {} };
      });
    });
    setDataHash(hash);
  }, [data]);

  const handleCanDrop = useCallback(
    (item, type) => {
      /**
       * Returns true if a drag source should be dropped on the current drop target.
       *
       * Called by the current drop target.
       */

      let itemData;

      const listIndex = dataHash[item.listType].index;
      let itemHash = dataHash[item.listType].children[item.id];
      let childIndex = itemHash.index;

      if (!data[listIndex].children[childIndex]) {
        return false;
      }

      itemData = data[listIndex].children[childIndex];

      // conditions on which to prevent dropping
      return !(
        typeof itemData === "undefined" ||
        (type !== item.listType &&
          !isDefaultPage &&
          item.type !== BLOCK_VARIANT.MULTI)
      );
    },
    [dataHash]
  );

  const handleDrop = useCallback(
    (
      item,
      targetListType,
      dragTargetIndex,
      isNestingAllowed,
      targetNestedParentID
    ) => {
      let sourceListIndex = dataHash[item.listType].index;
      let sourceListData = data[sourceListIndex];
      let targetListIndex = dataHash[targetListType].index;

      if (
        item.listType === targetListType &&
        dragTargetIndex === item.index &&
        item.nestedParentID === targetNestedParentID
      ) {
        return;
      }

      const dragSourceIndex = item.index;
      // targetListType = hoverData.current.list;
      let dragCard;
      let temp = cloneDeep(data);

      dragCard = { ...sourceListData.children[dragSourceIndex] };
      temp[sourceListIndex].children.splice(dragSourceIndex, 1);

      if (dragTargetIndex > dragSourceIndex) {
        // decrementing because the child array length decreases by 1 when the item is removed.
        // Adding it at the unchanged targetIndex would result in it being inserted at 1 place forward.
        dragTargetIndex--;
      }

      temp[targetListIndex].children.splice(dragTargetIndex, 0, dragCard);

      dispatch(setPageBlocks({ blocks: temp, pageId }));
    },
    [dataHash]
  );

  const handleAddBlockPress = (e, list) => {
    e.preventDefault();

    setAddModalData({ category: list.type, id: list.id, isVisible: true });
  };

  const handleAddNewBlock = (e, block) => {
    e.preventDefault();

    dispatch(
      addBlock({
        block: {
          id: uuidv4(),
          data: uuidv4(),
          ...block,
        },
        comparisonId: addModalData.id /** @TODO: change pageId prop name */,
      })
    );

    setAddModalData({ category: null, id: null, isVisible: false });
  };

  const getAcceptableTypes = (list) => {
    if (isDefaultPage) {
      if (list.type === BLOCK_CATEGORIES.MAIN) {
        return [];
      }
    } else {
      // custom page cannot have default blocks
      if (list.type === BLOCK_CATEGORIES.MAIN) {
        return [BLOCK_VARIANT.CUSTOM, BLOCK_VARIANT.MULTI, BLOCK_VARIANT.EXTRA];
      }
    }
    if (list.type === BLOCK_CATEGORIES.EXTRA) {
      return [BLOCK_VARIANT.EXTRA, BLOCK_VARIANT.MULTI, BLOCK_VARIANT.CUSTOM];
    }
    return ACCEPTABLE_TYPES;
  };

  const getJSX = (item, idx, list) => {
    return (
      <div key={item.id}>
        {idx === 0 && (
          <Drop
            acceptableTypes={getAcceptableTypes(list)}
            handleDrop={handleDrop}
            handleCanDrop={handleCanDrop}
            type={list.type}
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
          listType={list.type}
          key={idx}
          type={item.variant}
          handleDrop={handleDrop}
          handleCanDrop={handleCanDrop}
          isNestingAllowed={false}
          id={item.id}
        >
          <Block pageId={pageId} data={item} />
        </Drag>
        <Drop
          acceptableTypes={getAcceptableTypes(list)}
          handleDrop={handleDrop}
          handleCanDrop={handleCanDrop}
          type={list.type}
          index={idx + 1}
          allowDrops={false}
          className={"empty-drop-container"}
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <SimplePopUp
        label="Select block"
        isVisible={addModalData.isVisible}
        onClose={() =>
          setAddModalData({ category: null, id: null, isVisible: false })
        }
      >
        {
          <BlockList
            handleAddNewBlock={handleAddNewBlock}
            category={addModalData.category}
            isDefaultPage={isDefaultPage}
          />
        }
      </SimplePopUp>
      <div id="blocks">
        <div className="block-img">
          <ReactSVG
            src={BlocksIcon}
            className="nav_icon svg replaced-svg"
            wrapper="span"
          />
        </div>
        <h1>Blocks</h1>
        <h3 className="block-page-name">{activePage?.name}</h3>
        {data.map((list) =>
          list.type === BLOCK_CATEGORIES.HERO ||
          list.type === BLOCK_CATEGORIES.FOOTER ||
          list.type === BLOCK_CATEGORIES.POPUP ? (
            <LockedBlocks key={list.id} list={list} pageId={pageId} />
          ) : (
            <div key={list.id}>
              <div>
                <h2>{list.title}</h2>
                <Drop
                  handleDrop={handleDrop}
                  acceptableTypes={getAcceptableTypes(list)}
                  handleCanDrop={handleCanDrop}
                  key={list.id}
                  type={list.type}
                  className="cms_controls_list"
                  index={list.children.length}
                  isList={true}
                  allowDrops={true}
                >
                  {list.children.map((item, idx) => {
                    return getJSX(item, idx, list);
                  })}
                </Drop>
              </div>
              <hr className="spacer_small" />
              {!(
                (isDefaultPage && list.type === BLOCK_CATEGORIES.MAIN) ||
                list.type === BLOCK_CATEGORIES.HERO ||
                list.type === BLOCK_CATEGORIES.FOOTER
              ) && (
                <>
                  <a
                    className="add_button_wrapper"
                    onClick={(e) => handleAddBlockPress(e, list)}
                  >
                    Add Block
                    <ReactSVG
                      src={IconAdd}
                      className="svg add_button"
                      wrapper="span"
                    />
                  </a>

                  <hr className="spacer" />
                </>
              )}
            </div>
          )
        )}
      </div>
    </React.Fragment>
  );
};

export default Blocks;
