import React from "react";
import PropTypes from "prop-types";

const EndorserPhotoList = ({ endorserList }) => {
  return (
    <div className="endorser_photos_wrapper">
      <div className="bg_bar"></div>
      <div className="bg_blank"></div>
      {endorserList.map((item) => (
        <React.Fragment key={item.id}>
          <img src={item.image} />
          <div className="name_and_title">
            <div className="endorser_name" dangerouslySetInnerHTML={{__html: item.title}}/>
            <div className="endorser_title" dangerouslySetInnerHTML={{__html: item.subtitle}}/>
          </div>
        </React.Fragment>
      ))}
      <div className="bg_bar"></div>
      <div className="bg_blank"></div>
    </div>
  );
};

EndorserPhotoList.propTypes = {
  endorserList: PropTypes.array.isRequired,
};

export default EndorserPhotoList;
