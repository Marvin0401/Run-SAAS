import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import TextEditor from "@components/text-editor/text-editor.component";

const EndorserPhotoList = ({
  endorserList,
  onChange,
  blockID,
  pageID,
  style,
}) => {
  return (
    <Link
      className="endorser_photos_wrapper"
      to={`/cms/page/${pageID}/block/${blockID}/featured-individuals`}
      style={style}
    >
      <div className="bg_bar"></div>
      <div className="bg_blank"></div>
      {endorserList.map((item) => (
        <React.Fragment key={item.id}>
          <img src={item.image} />
          <div className="name_and_title">
            <TextEditor
              value={item.title}
              def
              onChange={(value) => {
                onChange({
                  id: item.id,
                  key: "title",
                  value,
                  parentKey: "featuredIndividuals",
                });
              }}
              toolbarOptions={[]}
              charLimit={40}
              className="endorser_name"
              element="div"
            />
            <TextEditor
              value={item.subtitle}
              onChange={(value) => {
                onChange({
                  id: item.id,
                  key: "subtitle",
                  value,
                  parentKey: "featuredIndividuals",
                });
              }}
              toolbarOptions={[]}
              charLimit={50}
              className="endorser_title"
              element="div"
            />
          </div>
        </React.Fragment>
      ))}
      <div className="bg_bar"></div>
      <div className="bg_blank"></div>
    </Link>
  );
};

EndorserPhotoList.propTypes = {
  endorserList: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  blockID: PropTypes.string.isRequired,
  pageID: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default EndorserPhotoList;
