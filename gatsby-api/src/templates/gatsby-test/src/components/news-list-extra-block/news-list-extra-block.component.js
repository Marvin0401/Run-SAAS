import React from "react";
import PropTypes from "prop-types";
import { ReactSVG } from "react-svg";
import IconArrow from "@assets/images/icon_arrow-1.svg";
import Pinstripes from "@components/pinstripes/pinstripes.component";


const NewsListExtraBlock = ({
  headline,
  itemList,
  onReadMorePress,
}) => {
  return (
      <section className="news_block">
        <Pinstripes type="top" />
        <div className="inner_page_intro">
          <h2>
            <span dangerouslySetInnerHTML={{__html: headline}}/>
          </h2>
        </div>
        <div className="news_item_wrapper">
          {itemList.map((item) => (
            <article className="news_item" key={item.id}>
              <div className="type_of_post">
                {item.link ? "PRESS RELEASE" : "NEWS ARTICLE"}
              </div>

              <h3 dangerouslySetInnerHTML={{__html: item.title}}/>

              <p className="quill_editor_custom_style" dangerouslySetInnerHTML={{__html: item.description}}/>

              <div className="news_date_block">
                <div className="month">{new Date(item.createdAt).toLocaleString('default', { month: 'short' })}</div>
                <div className="day">{new Date(item.createdAt).getDate()}</div>
                <div className="year">{new Date(item.createdAt).getFullYear()}</div>
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

NewsListExtraBlock.propTypes = {
  headline: PropTypes.string.isRequired,
  itemList: PropTypes.array.isRequired,
  onReadMorePress: PropTypes.func,
};

export default NewsListExtraBlock;
