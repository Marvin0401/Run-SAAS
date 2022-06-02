import React from "react";
import CHECKICON from "@assets/images/icon-check.svg";
import { ReactSVG } from "react-svg";
import TextEditor from "@components/text-editor/text-editor.component";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";

const BulletColumnsBlock = ({ block }) => {
  const dispatch = useDispatch();

  // const location = useLocation();

  const { data } = block;

  const blockData = useSelector((state) => blockDataSelector({ state, data }));

  const setValue = ({ updatedPropObj, item: changedItem }) => {
    const updatedItems = blockData?.data.map((item) => {
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

  return (
    <section className="bullet_columns_block white_block">
      <div className="section_gradient_overlay"></div>

      <ul className="bullet_columns_inner main_text">
        {blockData?.data?.map((val) => (
          <li key={val.id}>
            <ReactSVG className="svg" src={CHECKICON} />
            <TextEditor
              value={val.value}
              onChange={(text) =>
                setValue({
                  updatedPropObj: { value: text },
                  item: val,
                })
              }
              toolbarOptions={["bold", "italic", "link"]}
              charLimit={350}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

BulletColumnsBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default BulletColumnsBlock;
