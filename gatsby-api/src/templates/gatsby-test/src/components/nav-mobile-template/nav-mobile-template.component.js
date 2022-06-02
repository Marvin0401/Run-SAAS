import React, {useState} from "react";

import { ReactSVG } from "react-svg";
import PropTypes from "prop-types";
import classnames from "classnames";

import MainTabsTemplate from "@components/main-tabs-template/main-tabs-template.component";
import SocialMediaIconsTemplate from "@components/social-media-icons-template/social-media-icons-template.component";

import CLOSE_BUTTON from "@assets/images/close_button.svg";
import OPEN_BUTTON from "@assets/images/open_button.svg";

import { siteSelector } from "@helpers/site";

const NavMobileTemplate = ({ data, featuredPage, handleNavigate }) => {

  const [isOpen, setIsOpen] = useState(false);
  const siteSettings = siteSelector();

  const socialLinks = {
    facebook: siteSettings?.social_link_facebook,
    twitter: siteSettings?.social_link_twitter,
    instagram: siteSettings?.social_link_instagram,
    youtube: siteSettings?.social_link_youtube,
  };

  return (
    <>
      <div className={classnames("open_button", {open: isOpen})} onClick={() => setIsOpen(true)}>
        <ReactSVG src={OPEN_BUTTON} className="svg" wrapper="span" />
      </div>
      <div className={classnames("close_button", {open: isOpen})} onClick={() => setIsOpen(false)}>
        <ReactSVG src={CLOSE_BUTTON} className="svg" wrapper="span" />
      </div>

      <nav className={classnames("menu", {open: isOpen})}>
        <MainTabsTemplate
          data={data}
          isOpen={isOpen}
          handleNavigate={handleNavigate}
        />
        <button
          className={classnames("tab featured_tab", { open: isOpen })}
          onClick={() =>
            handleNavigate(featuredPage.slug, featuredPage.link)
          }
        >
          {featuredPage.title}
        </button>
        <SocialMediaIconsTemplate
          iconType={data.socialIconsType}
          links={socialLinks}
          isOpen={isOpen}
        />
      </nav>
    </>
  );
};

NavMobileTemplate.propTypes = {
  data: PropTypes.array,
  featuredPage: PropTypes.object,
  handleNavigate: PropTypes.func.isRequired,
};

export default NavMobileTemplate;
