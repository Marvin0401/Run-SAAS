import React from "react";
import PropTypes from "prop-types";

import { blockDataSelector } from "@helpers/blockData";
import { siteSelector } from "@helpers/site";

import SocialMediaIconsTemplate from "@components/social-media-icons-template/social-media-icons-template.component";

const FooterBlock = ({ block, customCode }) => {

  const { data } = block;
  const blockData = blockDataSelector({ data });

  const siteSettings = siteSelector();

  const socialLinks = {
    facebook: siteSettings?.social_link_facebook,
    twitter: siteSettings?.social_link_twitter,
    instagram: siteSettings?.social_link_instagram,
    youtube: siteSettings?.social_link_youtube,
  };

  return (
    <footer className="footer">
      <div dangerouslySetInnerHTML={{__html: customCode.siteFooter}} />
      <div dangerouslySetInnerHTML={{__html: customCode.pageFooter}} />
      <SocialMediaIconsTemplate links={socialLinks} />
      <div className="footer_info quill_editor_custom_style" dangerouslySetInnerHTML={{__html:blockData.info}}/>
      <div className="disclaimer" dangerouslySetInnerHTML={{__html:blockData.disclaimer}}/>
    </footer>
  );
};

FooterBlock.propTypes = {
  block: PropTypes.object.isRequired,
  customCode: PropTypes.object,
};

export default FooterBlock;
