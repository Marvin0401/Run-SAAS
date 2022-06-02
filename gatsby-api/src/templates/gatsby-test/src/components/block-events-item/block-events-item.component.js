import React from "react";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";

import ARROWICON from "@assets/images/icon_arrow-1.svg";

const BlockEventsItem = ({ blockData, blockTheme, itemId }) => {
  const eventItem = blockData.items.find((item) => item.id == itemId);
  if (!eventItem) {
    return null;
  }

  return (
    <section className="events_page_item_block">
      <div className="section_gradient_overlay"></div>

      <div className="first_column column">
        <h2 dangerouslySetInnerHTML={{ __html: eventItem.title }} />

        <div
          className="event_date"
          dangerouslySetInnerHTML={{ __html: eventItem.date }}
        />

        <div
          className="quill_editor_custom_style"
          dangerouslySetInnerHTML={{ __html: eventItem.longDescription }}
        />
      </div>

      <form className="column">
        <input type="text" placeholder="First Name" onChange={() => {}} />
        <input type="text" placeholder="Last Name" onChange={() => {}} />
        <input type="text" placeholder="Phone Number" onChange={() => {}} />
        <input type="text" placeholder="Zip Code" onChange={() => {}} />
        <input type="email" placeholder="Email" onChange={() => {}} />

        <button type="button" className="btn_style-1 event_rsvp_btn">
          RSVP
          <ReactSVG className="arrow svg" src={ARROWICON} wrapper="svg" />
        </button>
      </form>
    </section>
  );
};

BlockEventsItem.propTypes = {
  blockData: PropTypes.object.isRequired,
  blockTheme: PropTypes.object,
  itemId: PropTypes.string,
};

export default BlockEventsItem;
