import React from "react";
import VIDEO from "@assets/images/social_icon-video.svg";
import TextEditor from "@components/text-editor/text-editor.component";
import { useDispatch, useSelector } from "react-redux";
import { blockDataSelector } from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";
import PropTypes from "prop-types";
import { useNotificationPopUp } from "@components/notification-pop-up/notification-pop-up.component";
import VideoPopup from "@components/video-popup/video-popup.component";
const FullWidthVideoBlock = ({ block }) => {
  const dispatch = useDispatch();
  const { setPopUp } = useNotificationPopUp();
  const { data } = block;

  const blockData = useSelector((state) => blockDataSelector({ state, data }));

  const setValue = (value) => {
    const updatedData = {
      ...blockData,
      ...value,
    };
    dispatch(setDataItem(updatedData));
  };
  return (
    <>
      {blockData.headlineOn && (
        <div className="video_image_header white_block">
          <h3>
            <TextEditor
              value={blockData.title || ""}
              onChange={(text) => {
                setValue({
                  title: text,
                });
              }}
              charLimit={100}
            />
          </h3>
        </div>
      )}

      <section className="full_width_video">
        <div
          className="video_preview"
          data-video_id="467827284"
          data-video_platform="vimeo"
        >
          <img src={blockData.thumbnail} />
          <div
            className="play_button"
            onClick={() => {
              setPopUp({
                children: <VideoPopup embedCode={blockData.embedCode} />,
                outerClassName: "video_overlay open",
                innerClassName: "embed_container-wrapper open",
                closeButtonClassName: "video_close_button open",
              });
            }}
          >
            <img src={VIDEO} alt="Play video" />
          </div>
        </div>
      </section>

      {blockData.captionOn && (
        <div className="video_image_caption white_block">
          <small>
            <TextEditor
              value={blockData.description || ""}
              onChange={(text) =>
                setValue({
                  description: text,
                })
              }
              charLimit={350}
              toolbarOptions={["bold", "italic", "link"]}
            />
          </small>
        </div>
      )}
    </>
  );
};

FullWidthVideoBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default FullWidthVideoBlock;
