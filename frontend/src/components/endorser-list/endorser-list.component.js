import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import TextEditor from "@components/text-editor/text-editor.component";
import Pinstripes from "@components/pinstripes/pinstripes.component";

const EndorserList = ({
  individualEndorsers,
  organizationalEndorsers,
  onChange,
  blockID,
  pageID,
}) => {
  return (
    <React.Fragment>
      <Pinstripes type="top" />

      <Link
        className="first_column column"
        to={`/cms/page/${pageID}/block/${blockID}/individual-endorsers`}
      >
        <h3 className="title">Individuals</h3>

        <ul>
          {individualEndorsers.map((item) => (
            <TextEditor
              key={item.id}
              value={item.title}
              onChange={(value) => {
                onChange({
                  id: item.id,
                  key: "title",
                  parentKey: "individualEndorsers",
                  value,
                });
              }}
              toolbarOptions={[]}
              charLimit={100}
              element="li"
            />
          ))}
        </ul>
      </Link>

      <Link
        className="second_column column"
        to={`/cms/page/${pageID}/block/${blockID}/organizational-endorsers`}
      >
        <h3 className="title">Organizations</h3>

        <ul>
          {organizationalEndorsers.map((item) => (
            <TextEditor
              value={item.title}
              onChange={(value) => {
                onChange({
                  id: item.id,
                  key: "title",
                  parentKey: "organizationalEndorsers",
                  value,
                });
              }}
              key={item.id}
              toolbarOptions={[]}
              charLimit={100}
              element="li"
            />
          ))}
        </ul>
      </Link>
    </React.Fragment>
  );
};

EndorserList.propTypes = {
  individualEndorsers: PropTypes.array.isRequired,
  organizationalEndorsers: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  blockID: PropTypes.string.isRequired,
  pageID: PropTypes.string.isRequired,
};

export default EndorserList;
