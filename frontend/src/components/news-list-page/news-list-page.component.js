/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";
import DatePicker from "react-datepicker";
import TextEditor from "@components/text-editor/text-editor.component";
import IconArrow from "@assets/images/icon_arrow-1.svg";

const NewsListPage = ({
  description,
  eyebrow,
  headline,
  onChange,
  itemList,
  onChangeItemContent,
  onReadMorePress,
}) => {
  const DateCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div onClick={onClick} ref={ref}>
      <div className="month">{value?.split(",")?.[0]}</div>
      <div className="day">{value?.split(",")?.[1]}</div>
      <div className="year">{value?.split(",")?.[2]}</div>
    </div>
  ));

  return (
    <section className="news_page_list_block white_block">
      <div className="section_gradient_overlay"></div>
      <div className="inner_page_intro">
        <h2>
          <TextEditor
            value={eyebrow || ""}
            onChange={(value) => {
              onChange({ key: "eyebrow", value });
            }}
            isSimple
            charLimit={45}
            element="span"
            className="eyebrow"
          />
          <TextEditor
            value={headline}
            onChange={(value) => {
              onChange({ key: "headline", value });
            }}
            isSimple
            charLimit={45}
            element="span"
          />
        </h2>
        <TextEditor
          value={description || ""}
          onChange={(value) => {
            onChange({ key: "description", value });
          }}
          toolbarOptions={["bold", "italic", "link"]}
          charLimit={350}
          element="div"
          className="intro_p"
        />
      </div>
      <div className="news_item_wrapper">
        {itemList.map((item) => (
          <article className="news_item" key={item.id}>
            <div className="type_of_post">
              {item.link ? "PRESS RELEASE" : "NEWS ARTICLE"}
            </div>

            <TextEditor
              value={item.title}
              onChange={(value) => {
                onChangeItemContent({ id: item.id, key: "title", value });
              }}
              isSimple
              charLimit={45}
              element="h3"
            />

            <TextEditor
              value={item.description || ""}
              onChange={(value) => {
                onChangeItemContent({
                  id: item.id,
                  key: "description",
                  value,
                });
              }}
              toolbarOptions={["bold", "italic", "link"]}
              charLimit={500}
              element="p"
            />
            <div className="news_date_block">
              <DatePicker
                selected={new Date(item.createdAt)}
                onChange={(date) => {
                  onChangeItemContent({
                    id: item.id,
                    key: "createdAt",
                    value: date.toISOString(),
                  });
                }}
                customInput={<DateCustomInput />}
                dateFormat="MMM,d,yyyy"
              />
            </div>

            <button
              className="btn_style-2"
              onClick={(e) => {
                e.preventDefault();
                onReadMorePress(item.id);
              }}
            >
              Read more
              <ReactSVG
                src={IconArrow}
                className="svg arrow replaced-svg"
                wrapper="svg"
              />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

NewsListPage.propTypes = {
  description: PropTypes.string.isRequired,
  eyebrow: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  itemList: PropTypes.array.isRequired,
  onChangeItemContent: PropTypes.func.isRequired,
  onReadMorePress: PropTypes.func,
};

export default NewsListPage;
