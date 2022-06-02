import React from "react";
import CHECKICON from "@assets/images/icon-check.svg";
import { ReactSVG } from "react-svg";
import PropTypes from "prop-types";

import TextEditor from "@components/text-editor/text-editor.component";

import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";

const TextWithSidebarBlock = ({ block }) => {
  const dispatch = useDispatch();

  const { data } = block;

  const blockData = useSelector((state) => blockDataSelector({ state, data }));

  const setSidebarItemValue = ({ updatedPropObj, item: changedItem }) => {
    const updatedItems = blockData?.sidebarListItems.map((item) => {
      return item.id === changedItem.id
        ? {
            ...item,
            ...updatedPropObj,
          }
        : item;
    });
    const updatedData = {
      ...blockData,
      sidebarListItems: updatedItems,
    };
    dispatch(setDataItem(updatedData));
  };

  const setValue = (value) => {
    const updatedData = {
      ...blockData,
      ...value,
    };
    dispatch(setDataItem(updatedData));
  };

  return (
    <section className="basic_text_with_sidebar_block white_block">
      <div className="section_gradient_overlay"></div>

      <div className="basic_text_with_sidebar_inner main_text column">
        <TextEditor
          value={blockData.description || ""}
          onChange={(text) => {
            setValue({ description: text });
          }}
          toolbarOptions={[
            "bold",
            "italic",
            "h1",
            "h2",
            "h3",
            "h4",
            "link",
            "list",
            "image",
          ]}
          charLimit={-1}
        />
      </div>

      <div className="basic_text_sidebar column">
        <h3>
          <TextEditor
            value={blockData.sidebarTitle || ""}
            onChange={(text) => {
              setValue({ sidebarTitle: text });
            }}
            charLimit={-1}
          />
        </h3>

        <ul>
          {blockData?.sidebarListItems?.map((val) => (
            <li key={val.id}>
              <ReactSVG className="svg" src={CHECKICON} />
              <TextEditor
                value={val.value || ""}
                onChange={(text) =>
                  setSidebarItemValue({
                    updatedPropObj: { value: text },
                    item: val,
                  })
                }
                charLimit={150}
                toolbarOptions={["bold", "italic", "link"]}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

TextWithSidebarBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default TextWithSidebarBlock;
