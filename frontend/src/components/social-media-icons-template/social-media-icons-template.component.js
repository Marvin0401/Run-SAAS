import React from "react";
import PropTypes from "prop-types";

import { ReactSVG } from "react-svg";
import FACEBOOK from "@assets/images/social_icon-facebook.svg";
import TWITTER from "@assets/images/social_icon-twitter.svg";
import INSTAGRAM from "@assets/images/social_icon-instagram.svg";
import VIDEO from "@assets/images/social_icon-video.svg";
import classnames from "classnames";

const SocialMediaIconsTemplate = ({ iconType, links, isOpen }) => {
  return (
    <div className={classnames("social_icons", iconType, { open: isOpen })}>
      {links?.facebook && (
        <a href={links?.facebook}>
          <div>
            <ReactSVG src={FACEBOOK} className="facebook svg" wrapper="span" />
          </div>
        </a>
      )}

      {links?.twitter && (
        <a href={links?.twitter}>
          <div>
            <ReactSVG src={TWITTER} className="svg" wrapper="span" />
          </div>
        </a>
      )}

      {links?.instagram && (
        <a href={links?.instagram}>
          <div>
            <ReactSVG src={INSTAGRAM} className="facebook svg" wrapper="span" />
          </div>
        </a>
      )}

      {links?.youtube && (
        <a href={links?.youtube}>
          <div>
            <ReactSVG src={VIDEO} className="svg" wrapper="span" />
          </div>
        </a>
      )}
    </div>
  );
};

SocialMediaIconsTemplate.propTypes = {
  iconType: PropTypes.string,
  links: PropTypes.shape({
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    instagram: PropTypes.string,
    youtube: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
};

export default SocialMediaIconsTemplate;
