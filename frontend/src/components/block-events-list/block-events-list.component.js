import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import TextEditor from "@components/text-editor/text-editor.component";

import { ReactSVG } from "react-svg";
import ARROWICON from "@assets/images/icon_arrow-1.svg";

const BlockEventsList = ({
  block,
  pageId,
  setItemValue,
  blockData,
  setValue,
}) => {
  const history = useHistory();

  const handleNavigateToItem = (itemId, link) => {
    if (link) return window.open(link, "_blank");
    history.push(`/cms/page/${pageId}/block/${block.id}/${itemId}`);
  };

  return (
    <section className="events_page_list_block white_block">
      <div className="section_gradient_overlay"></div>

      <div className="inner_page_intro">
        <h2>
          <TextEditor
            value={blockData?.eyebrow || ""}
            onChange={(text) => {
              setValue({ eyebrow: text });
            }}
            charLimit={45}
            isSimple={true}
            element="span"
            className="eyebrow"
          />
          <TextEditor
            value={blockData?.title || ""}
            onChange={(text) => {
              setValue({ title: text });
            }}
            charLimit={45}
            isSimple={true}
          />
        </h2>

        <div className="intro_p">
          <TextEditor
            value={blockData?.intro || ""}
            onChange={(text) => {
              setValue({ intro: text });
            }}
            charLimit={350}
            toolbarOptions={["bold", "italic", "link"]}
          />
        </div>
      </div>

      <div className="events_item_wrapper">
        {blockData?.items?.map((item) => (
          <article className="events_item" href="events-item.php" key={item.id}>
            <TextEditor
              value={item.title || ""}
              onChange={(text) =>
                setItemValue({
                  updatedPropObj: { title: text },
                  item: item,
                })
              }
              charLimit={150}
              element="h2"
              isSimple={true}
            />

            <TextEditor
              value={item.date || ""}
              onChange={(text) =>
                setItemValue({
                  updatedPropObj: { date: text },
                  item: item,
                })
              }
              charLimit={50}
              element="div"
              isSimple={true}
              className="event_date"
            />

            <TextEditor
              value={item.shortDescription || ""}
              onChange={(text) =>
                setItemValue({
                  updatedPropObj: { shortDescription: text },
                  item: item,
                })
              }
              charLimit={350}
              toolbarOptions={["bold", "italic", "link"]}
            />

            <button
              className="btn_style-2 event_signup_btn"
              href="events-item.php"
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
  block: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired,
  setItemValue: PropTypes.func.isRequired,
  blockData: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
};
export default BlockEventsList;
