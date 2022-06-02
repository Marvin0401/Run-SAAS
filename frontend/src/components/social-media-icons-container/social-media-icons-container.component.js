import React from "react";
import SocialMediaIconsTemplate from "../social-media-icons-template/social-media-icons-template.component";
import PropTypes from "prop-types";

const SocialMediaIconsContainer = ({ iconType, links, isOpen }) => {
  return (
    <>
      <SocialMediaIconsTemplate
        iconType={iconType}
        links={links}
        isOpen={isOpen}
      />
    </>
  );
};

SocialMediaIconsContainer.propTypes = {
  iconType: PropTypes.string,
  links: PropTypes.shape({
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    instagram: PropTypes.string,
    youtube: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
};

export default SocialMediaIconsContainer;
