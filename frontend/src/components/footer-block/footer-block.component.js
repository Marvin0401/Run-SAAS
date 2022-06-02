import React from "react";
import PropTypes from "prop-types";

import TextEditor from "@components/text-editor/text-editor.component";
import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";

import SocialMediaIconsContainer from "@components/social-media-icons-container/social-media-icons-container.component";

const FooterBlock = ({ block }) => {
  const dispatch = useDispatch();

  const blockData = useSelector((state) =>
    blockDataSelector({ state, data: block.data })
  );

  const socialLinks = useSelector((state) => ({
    facebook: state.site.settings?.social_link_facebook,
    twitter: state.site.settings?.social_link_twitter,
    instagram: state.site.settings?.social_link_instagram,
    youtube: state.site.settings?.social_link_youtube,
  }));

  const handleOnChangeText = (change) =>
    dispatch(setDataItem({ ...blockData, ...change }));

  return (
    <footer className="footer">
      <SocialMediaIconsContainer links={socialLinks} />
      <TextEditor
        onChange={(val) => handleOnChangeText({ info: val })}
        value={blockData.info}
        toolbarOptions={["bold", "italic", "link"]}
        element="div"
        charLimit={150}
        className="footer_info"
      />
      <TextEditor
        onChange={(val) => handleOnChangeText({ disclaimer: val })}
        isSimple
        value={blockData.disclaimer}
        element="div"
        className="disclaimer"
      />
    </footer>
  );
};

FooterBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default FooterBlock;
