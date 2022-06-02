import React from "react";
import PropTypes from "prop-types";
import TextEditor from "@components/text-editor/text-editor.component";

import { ReactSVG } from "react-svg";
import ARROWICON from "@assets/images/icon_arrow-1.svg";

const BlockEventsItem = ({ blockData, itemId, setItemValue }) => {
  const eventItem = blockData.items.find((item) => item.id == itemId);
  if (!eventItem) {
    return null;
  }

  return (
    <section className="events_page_item_block">
      <div className="section_gradient_overlay"></div>

      <div className="first_column column">
        <TextEditor
          value={eventItem.title || ""}
          onChange={(text) =>
            setItemValue({
              updatedPropObj: { title: text },
              item: eventItem,
            })
          }
          charLimit={150}
          element="h2"
          isSimple={true}
        />

        <TextEditor
          value={eventItem.date || ""}
          onChange={(text) =>
            setItemValue({
              updatedPropObj: { date: text },
              item: eventItem,
            })
          }
          charLimit={50}
          element="div"
          isSimple={true}
          className="event_date"
        />

        <TextEditor
          value={eventItem.longDescription || ""}
          onChange={(text) =>
            setItemValue({
              updatedPropObj: { longDescription: text },
              item: eventItem,
            })
          }
          toolbarOptions={[
            "bold",
            "italic",
            "h3",
            "h4",
            "list",
            "link",
            "image",
          ]}
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
  setItemValue: PropTypes.func.isRequired,
  blockData: PropTypes.object.isRequired,
  itemId: PropTypes.string,
};

export default BlockEventsItem;
