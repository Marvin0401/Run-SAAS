import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { ReactSVG } from "react-svg";

import MainTabsContainer from "@components/main-tabs-container/main-tabs-container.component";
import SocialMediaIconsContainer from "@components/social-media-icons-container/social-media-icons-container.component";

import { useSelector } from "react-redux";

import CLOSE_BUTTON from "@assets/images/close_button.svg";
import OPEN_BUTTON from "@assets/images/open_button.svg";

const NavMobileTemplate = ({ data, featuredPage, handleNavigateToItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = useSelector((state) => ({
    facebook: state.site.settings?.social_link_facebook,
    twitter: state.site.settings?.social_link_twitter,
    instagram: state.site.settings?.social_link_instagram,
    youtube: state.site.settings?.social_link_youtube,
  }));

  return (
    <>
      <div
        className={classnames("open_button", { open: isOpen })}
        onClick={() => setIsOpen(true)}
      >
        <ReactSVG src={OPEN_BUTTON} className="svg" wrapper="span" />
      </div>
      <div
        className={classnames("close_button", { open: isOpen })}
        onClick={() => setIsOpen(false)}
      >
        <ReactSVG src={CLOSE_BUTTON} className="svg" wrapper="span" />
      </div>

      <nav className={classnames("menu", { open: isOpen })}>
        <MainTabsContainer
          data={data}
          isOpen={isOpen}
          handleNavigateToItem={handleNavigateToItem}
        />
        <button
          className={classnames("tab featured_tab", { open: isOpen })}
          onClick={() =>
            handleNavigateToItem(featuredPage.pageId, featuredPage.link)
          }
        >
          {featuredPage?.title}
        </button>
        <SocialMediaIconsContainer
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
  handleNavigateToItem: PropTypes.func.isRequired,
};

export default NavMobileTemplate;
