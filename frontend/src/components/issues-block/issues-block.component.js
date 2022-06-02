import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TextEditor from "@components/text-editor/text-editor.component";
import Pinstripes from "@components/pinstripes/pinstripes.component";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  blockDataSelector,
  containerOfPageWithBlockSelector,
} from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";
import { ReactSVG } from "react-svg";
import CHECKICON from "@assets/images/icon-check.svg";
import ARROWICON from "@assets/images/icon_arrow-1.svg";
import {} from "@constants/";
import { BLOCK_TYPES, BLOCK_VARIANT, PAGE_CATEGORIES } from "@constants/";

const IssuesBlock = ({ block }) => {
  const dispatch = useDispatch();

  const { sharedData } = block;
  const defaultPageContainer = useSelector((state) =>
    containerOfPageWithBlockSelector({
      state,
      type: BLOCK_TYPES.ISSUES_LIST,
      variant: BLOCK_VARIANT.DEFAULT,
    })
  );

  const defaultIsHidden =
    defaultPageContainer?.type === PAGE_CATEGORIES.HIDDEN ||
    defaultPageContainer.type === PAGE_CATEGORIES.DRAFT;

  const sharedBlockData = useSelector((state) =>
    blockDataSelector({ state, data: sharedData })
  );

  const setItemValue = ({ updatedPropObj, item: changedItem }) => {
    const updatedItems = sharedBlockData?.items?.map((item) => {
      return item.id === changedItem.id
        ? {
            ...item,
            ...updatedPropObj,
          }
        : item;
    });
    const updatedData = {
      ...sharedBlockData,
      items: updatedItems,
    };
    dispatch(setDataItem(updatedData));
  };

  return (
    <section className="issues_block">
      <Pinstripes type="top" />

      <div className="issues_wrapper">
        {sharedBlockData.items.map((item, i) => (
          <Fragment key={item.id}>
            {i % 2 === 0 && i !== sharedBlockData.items.length - 1 && (
              <>
                <div className="issues_divider"></div>
                <div className="issues_divider"></div>
              </>
            )}
            <article className="issues_item-extra">
              <ReactSVG className="checkmark_icon svg" src={CHECKICON} />

              <div className="text_section">
                <TextEditor
                  value={item?.title || ""}
                  onChange={(text) =>
                    setItemValue({
                      updatedPropObj: { title: text },
                      item: item,
                    })
                  }
                  charLimit={40}
                  element="h2"
                />

                <div>
                  <TextEditor
                    value={item?.description || ""}
                    onChange={(text) =>
                      setItemValue({
                        updatedPropObj: { description: text },
                        item: item,
                      })
                    }
                    charLimit={350}
                    element="div"
                  />
                </div>
              </div>
            </article>
          </Fragment>
        ))}
      </div>

      {!defaultIsHidden && (
        <Link
          to={`/cms/page/${sharedBlockData.pageId}/block/${sharedBlockData.blockId}`}
        >
          <button type="button" className="btn_style-1">
            More Issues
            <ReactSVG className="arrow svg" src={ARROWICON} wrapper="svg" />
          </button>
        </Link>
      )}
    </section>
  );
};
IssuesBlock.propTypes = {
  block: PropTypes.object.isRequired,
};
export default IssuesBlock;
