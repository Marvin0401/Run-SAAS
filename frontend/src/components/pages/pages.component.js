import React, { useCallback, useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import { addPage, setPages } from "@redux/slices/site";

import { BLOCK_TYPES } from "@constants";

import { addBlockData } from "@redux/slices/blockData";

import classnames from "classnames";
import { ReactSVG } from "react-svg";
import cloneDeep from "lodash.clonedeep";

import useStyles from "./pages.style";

import Drag from "@components/drag/drag.component";
import Drop from "@components/drop/drop.component";
import Page from "@components/page/page.component";

import IconAdd from "@assets/images/cms/add_icon.svg";
import { PAGE_CATEGORIES, PAGE_TYPES } from "@constants";

const ACCEPTABLE_TYPES = [PAGE_TYPES.ITEM];

const Pages = (props) => {
  const classes = useStyles(props);

  const [dataHash, setDataHash] = useState(null);

  const dispatch = useDispatch();

  const data = useSelector((state) => state.site.pages);

  const hoverData = useRef({
    list: null,
    order: null,
    elemRef: null,
  });

  useEffect(() => {
    // generate hash for data
    let hash = {};
    data.forEach((item, idx) => {
      hash[item.type] = { index: idx, children: {} };
      item.children.forEach((child, idx) => {
        hash[item.type].children[child.id] = { index: idx, children: {} };
        child.children.forEach((nestedChild, idx) => {
          hash[item.type].children[child.id].children[nestedChild.id] = {
            index: idx,
            children: {},
          };
        });
      });
    });
    setDataHash(hash);
  }, [data]);

  const updateCurrenthoverData = (listType, order, elemRef) => {
    if (
      hoverData.current.list !== listType ||
      hoverData.current.order !== order
    ) {
      if (hoverData.current.elemRef !== null)
        hoverData.current.elemRef.current.className = "drag";
      hoverData.current = { list: listType, order, elemRef };
    }
  };

  const handleCanDrop = useCallback(
    (
      item,
      type,
      dragTargetIndex,
      targetNestedParentID,
      isList = false,
      hasNestedChildren,
      allowDrops = false
    ) => {
      /**
       * Returns true if a drag source should be dropped on the current drop target.
       *
       * Called by the current drop target.
       */

      let itemData;

      const listIndex = dataHash[item.listType].index;
      let itemHash = dataHash[item.listType].children[item.id];
      let childIndex;
      let nestedIndex; // use only if nested
      let isNested = false;

      if (typeof itemHash === "undefined") {
        isNested = true;

        Object.keys(dataHash[item.listType].children).some((childId) => {
          const child = dataHash[item.listType].children[childId];
          let itemHash = child.children[item.id];
          if (typeof itemHash !== "undefined") {
            childIndex = child.index;
            nestedIndex = itemHash.index;

            return true;
          }

          return false;
        });
      } else {
        childIndex = itemHash.index;
      }
      if (!data[listIndex].children[childIndex]) {
        return false;
      }
      if (isNested) {
        itemData = data[listIndex].children[childIndex].children[nestedIndex];
      } else {
        itemData = data[listIndex].children[childIndex];
      }

      return !(
        typeof itemData === "undefined" ||
        (type === PAGE_CATEGORIES.FEATURED_NAV && itemData.isDefault) ||
        (type === PAGE_CATEGORIES.FEATURED_NAV &&
          itemData.children.length > 0) ||
        (!isNested && itemData.children.length > 0 && !isList && !allowDrops) ||
        ((typeof targetNestedParentID !== "undefined" || hasNestedChildren) &&
          itemData.children.length > 0) ||
        (type === item.listType && isList)
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
      if (item.nestedParentID) {
        // the item is nested

        const parentIndex =
          dataHash[item.listType].children[item.nestedParentID].index;
        dragCard = {
          ...sourceListData.children[parentIndex].children[dragSourceIndex],
        };

        temp[sourceListIndex].children[parentIndex].children.splice(
          dragSourceIndex,
          1
        );
      } else {
        dragCard = { ...sourceListData.children[dragSourceIndex] };
        temp[sourceListIndex].children.splice(dragSourceIndex, 1);
      }

      if (
        targetListType === PAGE_CATEGORIES.FEATURED_NAV &&
        temp[dataHash[targetListType].index].children.length !== 0
      ) {
        // displace the existing Featured Page back to the Main Nav category
        const removedItem = {
          ...temp[dataHash[targetListType].index].children[0],
        };
        temp[dataHash[targetListType].index].children.splice(0, 1);
        temp[dataHash[PAGE_CATEGORIES.MAIN_NAV].index].children.push(
          removedItem
        );
      }

      if (!isNestingAllowed) {
        if (
          item.listType === targetListType &&
          dragTargetIndex > dragSourceIndex &&
          targetNestedParentID === item.nestedParentID
        ) {
          // decrementing because the child array length decreases by 1 when the item is removed.
          // Adding it at the unchanged targetIndex would result in it being inserted at 1 place forward.
          dragTargetIndex--;
        }
        if (targetNestedParentID) {
          let parentIndex =
            dataHash[targetListType].children[targetNestedParentID].index;
          if (
            item.listType === targetListType &&
            parentIndex > dragSourceIndex &&
            typeof item.nestedParentID === "undefined"
          ) {
            parentIndex--;
          }
          temp[targetListIndex].children[parentIndex].children.splice(
            dragTargetIndex,
            0,
            dragCard
          );
        } else {
          temp[targetListIndex].children.splice(dragTargetIndex, 0, dragCard);
        }
      } else {
        // add as a nested item
        if (
          item.listType === targetListType &&
          dragTargetIndex > dragSourceIndex &&
          typeof item.nestedParentID === "undefined"
        ) {
          // decrementing because the child array length decreases by 1 when the item is removed.
          // Adding it at the unchanged targetIndex would result in it being inserted at 1 place forward.
          dragTargetIndex--;
        }

        temp[targetListIndex].children[dragTargetIndex].children.push(dragCard);
      }

      dispatch(setPages(temp));
      hoverData.current = { list: null, order: null, elemRef: null };
    },
    [dataHash]
  );

  const getJSX = (item, idx, list, i = 0, nestedParentID) => {
    return (
      <div key={item.id}>
        {idx === 0 && (
          <Drop
            acceptableTypes={ACCEPTABLE_TYPES}
            handleDrop={handleDrop}
            handleCanDrop={handleCanDrop}
            type={list.type}
            index={0}
            nestedParentID={nestedParentID}
            allowDrops={i == 0} // passed back to handleCanDrop
            className={classnames("empty-drop-container", { subpage: i > 0 })}
          />
        )}
        <Drag
          onHover={updateCurrenthoverData}
          index={idx}
          listType={list.type}
          key={idx}
          type={item.type}
          handleDrop={handleDrop}
          handleCanDrop={handleCanDrop}
          isNestingAllowed={i === 0 && list.type === PAGE_CATEGORIES.MAIN_NAV}
          isNested={i > 0}
          id={item.id}
          nestedParentID={nestedParentID}
          hasNestedChildren={i === 0 && item.children.length > 0}
          isSameListAllowed={i > 0}
        >
          <Page
            data={item}
            isNested={i > 0}
            hasNestedChildren={i === 0 && item.children.length > 0}
            canDuplicate={list.type !== PAGE_CATEGORIES.FEATURED_NAV}
          >
            {i === 0 &&
              item.children &&
              item.children.map((nestedItem, idx) => {
                return getJSX(nestedItem, idx, list, i + 1, item.id);
              })}
          </Page>
        </Drag>
        <Drop
          acceptableTypes={ACCEPTABLE_TYPES}
          handleDrop={handleDrop}
          handleCanDrop={handleCanDrop}
          type={list.type}
          index={idx + 1}
          nestedParentID={nestedParentID}
          allowDrops={i == 0}
          className={classnames("empty-drop-container", { subpage: i > 0 })}
        />
      </div>
    );
  };

  const handleOnClickAdd = () => {
    const heroDataId = uuidv4();
    const block = {
      data: heroDataId,
      type: BLOCK_TYPES.HERO,
    };
    dispatch(
      addBlockData({
        block,
      })
    );

    dispatch(addPage({ heroDataId }));
  };

  return (
    <div className={classes.container}>
      <h1>Pages</h1>
      {data.map((list) => {
        return list.type === PAGE_CATEGORIES.HOME ? null : (
          <div key={list.id}>
            <h2
              className={classnames({
                "main-nav": list.type === PAGE_CATEGORIES.MAIN_NAV,
              })}
            >
              {list.title}
            </h2>
            <Drop
              handleDrop={handleDrop}
              acceptableTypes={ACCEPTABLE_TYPES}
              handleCanDrop={handleCanDrop}
              key={list.id}
              type={list.type}
              className="cms_controls_list"
              index={list.children.length}
              isList={true}
              allowDrops={true}
            >
              {list.children.map((item, idx) => {
                return getJSX(item, idx, list, 0);
              })}
            </Drop>
          </div>
        );
      })}
      <a className="add_button_wrapper" onClick={handleOnClickAdd}>
        New Page
        <ReactSVG src={IconAdd} className="svg add_button" wrapper="span" />
      </a>
    </div>
  );
};

export default Pages;
