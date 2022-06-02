import React from "react";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";
import IconArrow from "@assets/images/icon_arrow-1.svg";

const NewsListPage = ({
  description,
  eyebrow,
  headline,
  itemList,
  onReadMorePress,
}) => {
  return (
    <section className="news_page_list_block white_block">
      <div className="section_gradient_overlay"></div>
      <div className="inner_page_intro">
        <h2>
          <span className="eyebrow" dangerouslySetInnerHTML={{__html: eyebrow}}/>
          <span dangerouslySetInnerHTML={{__html: headline}}/>
        </h2>

        <div className="intro_p quill_editor_custom_style" dangerouslySetInnerHTML={{__html: description}}/>
      </div>

      <div className="news_item_wrapper">
        {itemList.map((item) => (
          <article className="news_item" key={item.id}>
            <div className="type_of_post">{item.type}</div>

            <h3 dangerouslySetInnerHTML={{__html: item.title}} />

            <p className="quill_editor_custom_style" dangerouslySetInnerHTML={{__html: item.description}} />

            <div className="news_date_block">
              <div className="month">JAN</div>
              <div className="day">1</div>
              <div className="year">2020</div>
            </div>

            <button
              className="btn_style-2"
              onClick={(e) => {
                e.preventDefault();
                onReadMorePress(item.id, item.link);
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
  itemList: PropTypes.array.isRequired,
  onReadMorePress: PropTypes.func,
};

export default NewsListPage;
