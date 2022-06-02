import React from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import classnames from "classnames";
import { setDataItem } from "@redux/slices/blockData";
import TextEditor from "@components/text-editor/text-editor.component";
import Pinstripes from "@components/pinstripes/pinstripes.component";

const DonateBlock = ({ block }) => {
  const dispatch = useDispatch();

  const { data, sharedData } = block;

  const blockData = useSelector((state) => blockDataSelector({ state, data }));
  const sharedBlockData = useSelector((state) =>
    blockDataSelector({ state, data: sharedData })
  );

  const handleOnChange = (updatedDataProp) =>
    dispatch(setDataItem({ ...blockData, ...updatedDataProp }));

  return (
    <section
      className={classnames("donate_block", {
        label: !blockData.headlineOn,
        headline: blockData.headlineOn,
      })}
    >
      {/* <!--headline class, label class or no class can be toggled--> */}

      <Pinstripes type="top" />

      <TextEditor
        value={blockData?.headline || ""}
        onChange={(text) => {
          handleOnChange({ headline: text });
        }}
        charLimit={50}
        isSimple
        element="h2"
      />

      <div className="donate_buttons">
        <div className="donate_label">Donate:</div>
        {sharedBlockData.buttonData.map((item, i) => (
          <a
            href={item.url}
            target="_blank"
            className="donation_amount"
            rel="noreferrer"
            key={i}
          >
            {(item.amount === null && "Other") || "$" + item.amount}
          </a>
        ))}
      </div>
    </section>
  );
};

DonateBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default DonateBlock;
