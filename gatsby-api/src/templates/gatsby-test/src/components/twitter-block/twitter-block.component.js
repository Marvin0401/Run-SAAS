import React, { useCallback, useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import PropTypes from "prop-types";
import classnames from "classnames";

import TwitterIcon from "@assets/images/twitter_section_banner.svg";
import TwitterIconLove from "@assets/images/twitter_icon-love.svg";
import TwitterIconComment from "@assets/images/twitter_icon-comment.svg";
import TwitterIconRetweet from "@assets/images/twitter_icon-retweet.svg";

import clients from "@services/api";

import { blockDataSelector } from "@helpers/blockData";

import StyleInjector from "@components/style-injector/style-injector.component";
import Pinstripes from "@components/pinstripes/pinstripes.component";

const TwitterBlock = ({ block }) => {
  const { data } = block;

  const blockData = blockDataSelector({ data });

  const [index, setIndex] = useState(0);
  const [twitterUser, setTwitterUser] = useState(undefined);
  const [tweets, setTweets] = useState([]);

  const getTweets = useCallback(
    () =>
      clients.default.client({
        method: "get",
        url: `/api/sites/get-twitter-user/${blockData.username}/`,
      }),
    [blockData.username]
  );

  useEffect(async () => {
    try {
      if (blockData.username) {
        const response = await getTweets();
        setTwitterUser(response.data.profile);
        setTweets(response.data.feed.data || []);
      }
    } catch (err) {
      setTweets([]);
    }
  }, [blockData.username]);

  const goToTweet = () => {
    window.open(
      `https://twitter.com/${twitterUser.username}/status/${tweets[index].id}`,
      "_blank"
    );
  };

  const tweetTemplate = (tweet, i) => (
    <div
      className={classnames("tweet", { selected: i === index })}
      key={tweet.id}
      style={{ left: 20 + -(index + 1) * 60 + "%" }}
      onClick={() => setIndex(i)}
    >
      <div
        className="twitter_profile_img"
        style={{
          backgroundImage: `url(${twitterUser.profile_image_url})`,
        }}
      ></div>
      <div className="twitter_handle">@{twitterUser.username}</div>
      <div className="twitter_date">
        {new Date(tweet.created_at).toDateString().slice(4)}
      </div>

      <div className="tweet_text">{tweet.text}</div>
    </div>
  );

  return (
      <section className="twitter_block">
        <Pinstripes type="top" />

        <ReactSVG
          src={TwitterIcon}
          wrapper="svg"
          className="twitter_section_banner svg"
        />

        <div className="outer_tweet_wrapper">
          <div className="tweet_wrapper">
            {tweets.length >= 3 &&
              tweetTemplate(tweets[tweets.length - 1], tweets.length - 1)}
            {tweets.map(tweetTemplate)}
            {tweets.length >= 3 && tweetTemplate(tweets[0], 0)}
          </div>
        </div>

        {tweets.length > 0 && (
          <div className="tweet_buttons">
            <ReactSVG
              src={TwitterIconLove}
              wrapper="svg"
              className=" svg"
              onClick={goToTweet}
            />
            <ReactSVG
              src={TwitterIconComment}
              wrapper="svg"
              className=" svg"
              onClick={goToTweet}
            />
            <ReactSVG
              src={TwitterIconRetweet}
              wrapper="svg"
              className=" svg"
              onClick={goToTweet}
            />
          </div>
        )}
      </section>
  );
};
TwitterBlock.propTypes = {
  block: PropTypes.object.isRequired,
};
export default TwitterBlock;
