import React from "react";
import { blockDataSelector } from "@redux/selectors/site";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { setDataItem } from "@redux/slices/blockData";

const BlockConfigTwitter = ({ block }) => {
  const dispatch = useDispatch();

  const { data } = block;

  const blockData = useSelector((state) => blockDataSelector({ state, data }));

  const setValue = (value) => {
    const updatedData = {
      ...blockData,
      ...value,
    };
    dispatch(setDataItem(updatedData));
  };

  return (
    <>
      <h2>Twitter section</h2>
      <div className="option_wrapper left">
        <label
          style={{
            fontWeight: "bold",
            marginBottom: "0.6em",
          }}
        >
          Account handle
        </label>
        <input
          type="text"
          value={blockData.username}
          onChange={(e) => {
            setValue({ username: e.target.value });
          }}
        />
      </div>
    </>
  );
};

BlockConfigTwitter.propTypes = {
  block: PropTypes.object.isRequired,
};

export default BlockConfigTwitter;
