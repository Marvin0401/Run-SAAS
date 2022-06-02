import React from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";

import { ReactSVG } from "react-svg";
import ARROWICON from "@assets/images/icon_arrow-1.svg";
import { slugSelector } from "@helpers/blockData";

const BlockEventsList = ({ pageId, blockTheme, blockData }) => {
  const pageSlug = slugSelector({ pageId });

  const handleNavigateToItem = (itemId, link) => {
    if (link) return window.open(link, "_blank");
    navigate(`/${pageSlug}/${itemId}`);
  };

  return (
    <section className="events_page_list_block white_block">
      <div className="section_gradient_overlay" />

      <div className="inner_page_intro">
        <h2>
          <span
            className="eyebrow"
            dangerouslySetInnerHTML={{ __html: blockData?.eyebrow }}
          />

          <div dangerouslySetInnerHTML={{ __html: blockData?.title }} />
        </h2>

        <div
          className="intro_p quill_editor_custom_style"
          dangerouslySetInnerHTML={{ __html: blockData?.intro }}
        />
      </div>

      <div className="events_item_wrapper">
        {blockData?.items?.map((item) => (
          <article className="events_item" key={item.id}>
            <h2 dangerouslySetInnerHTML={{ __html: item.title }} />

            <div
              className="event_date"
              dangerouslySetInnerHTML={{ __html: item.date }}
            />

            <div
              className="quill_editor_custom_style"
              dangerouslySetInnerHTML={{ __html: item.shortDescription }}
            />

            <button
              className="btn_style-2 event_signup_btn"
              onClick={() => handleNavigateToItem(item.id, item.link)}
            >
              Sign up
              <ReactSVG className="arrow svg" src={ARROWICON} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};
BlockEventsList.propTypes = {
  pageId: PropTypes.string.isRequired,
  blockData: PropTypes.object.isRequired,
  blockTheme: PropTypes.object,
};
export default BlockEventsList;
