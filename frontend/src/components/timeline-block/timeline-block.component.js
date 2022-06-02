import React from "react";
import PropTypes from "prop-types";

import TextEditor from "@components/text-editor/text-editor.component";
import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";

const TimelineBlock = ({ block }) => {
  const dispatch = useDispatch();

  const { data } = block;

  const blockData = useSelector((state) => blockDataSelector({ state, data }));
  const setItemValue = ({ updatedPropObj, item: changedItem }) => {
    const updatedItems = blockData?.data?.map((item) => {
      return item.id === changedItem.id
        ? {
            ...item,
            ...updatedPropObj,
          }
        : item;
    });
    const updatedData = {
      ...blockData,
      data: updatedItems,
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
    <section className="timeline_block white_block">
      <div className="section_gradient_overlay"></div>

      <h2>
        <TextEditor
          value={blockData?.title || ""}
          onChange={(text) => {
            setValue({ title: text });
          }}
          charLimit={50}
        />
      </h2>

      <div className="timeline">
        <div className="timeline_line"></div>

        {blockData?.data?.map((val) => (
          <div className="timeline_element" key={val.id}>
            <h6 className="timeline_date">
              <TextEditor
                value={val.title || ""}
                onChange={(text) =>
                  setItemValue({
                    updatedPropObj: { title: text },
                    item: val,
                  })
                }
                charLimit={20}
              />
            </h6>

            <div className="timeline_text">
              <TextEditor
                value={val.value || ""}
                onChange={(text) =>
                  setItemValue({
                    updatedPropObj: { value: text },
                    item: val,
                  })
                }
                charLimit={350}
                toolbarOptions={["bold", "italic", "link"]}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

TimelineBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default TimelineBlock;
