import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Pinstripes from "@components/pinstripes/pinstripes.component";

import { useDispatch, useSelector } from "react-redux";
import { activePageSelector, homePageSelector } from "@redux/selectors/site";
import { setActivePage } from "@redux/slices/site";
import classnames from "classnames";

import { useHistory } from "react-router-dom";

import SocialMediaIconsContainer from "@components/social-media-icons-container/social-media-icons-container.component";
import MainTabsContainer from "@components/main-tabs-container/main-tabs-container.component";
import VideoPreviewContainer from "@components/video-preview-container/video-preview-container.component";

import NavMobileContainer from "../nav-mobile-container/nav-mobile-container.component";
import TextEditor from "@components/text-editor/text-editor.component";

const isSplitLayoutHash = {
  full_width_image: false,
  floating_image: false,
  video_image: false,
  no_image: false,

  standard_box: true,
  angled_box: true,
  gradient_box: true,
};

const HASH = {
  GRADIENT: "gradient_box",
  STANDARD: "standard_box",
  ANGLED: "angled_box",
  FULL_WIDTH: "full_width_image",
  FLOATING: "floating_image",
  VIDEO: "video_image",
  NO_IMAGE: "no_image",
};

const HeroTemplate = ({ data = null, setValue, isHome }) => {
  const { name: pageName } = useSelector((state) =>
    activePageSelector({ state })
  );

  const menuItemsData = data?.menuItems;
  const featuredPage = data?.featuredPage;
  const layoutType = isHome ? data?.layoutType : data?.internalPagesLayoutType;

  const dispatch = useDispatch();
  const history = useHistory();

  const homePage = useSelector((state) => homePageSelector({ state }));

  const handleOnClickLogo = () =>
    dispatch(setActivePage({ id: homePage.id, redirect: true }));

  const socialLinks = useSelector((state) => ({
    facebook: state.site.settings?.social_link_facebook,
    twitter: state.site.settings?.social_link_twitter,
    instagram: state.site.settings?.social_link_instagram,
    youtube: state.site.settings?.social_link_youtube,
  }));

  const handleNavigateToItem = (pageId, link) => {
    if (link) return window.open(link, "_blank");
    history.push(`/cms/page/${pageId}/blocks`);
  };

  const getBackgroundImageUrl = useCallback(() => {
    let imgUrl;
    if (
      layoutType === HASH.GRADIENT ||
      layoutType === HASH.ANGLED ||
      layoutType === HASH.STANDARD
    ) {
      imgUrl = data.splitImage;
    } else if (layoutType === HASH.FULL_WIDTH) {
      imgUrl = data.fullImage;
    } else if (layoutType === HASH.FLOATING || layoutType === HASH.VIDEO) {
      imgUrl = data.floatImage;
    }
    return imgUrl;
  }, [layoutType, data.splitImage, data.fullImage, data.floatImage]);

  return (
    <header
      className={classnames("hero", data.bgColor, data.formType, {
        headline_on: data.headlineOn,
        page_name_on: !isHome && !data.headlineOn,
        [layoutType]: !isSplitLayoutHash[layoutType],
        flip_content: data.flipContent,
        social_icons_below: data.socialBelowContentOn,
        no_image: !data.showImage,
      })}
    >
      <NavMobileContainer
        data={menuItemsData}
        featuredPage={featuredPage}
        handleNavigateToItem={handleNavigateToItem}
      />

      <nav className="desktop">
        <div className="nav_wrapper_left">
          <div className={classnames("main_tabs", data.buttonType)}>
            <img
              src={data.logo}
              alt="Campaign name"
              className="small_logo"
              onClick={handleOnClickLogo}
            />
            <MainTabsContainer
              data={menuItemsData}
              handleNavigateToItem={handleNavigateToItem}
            />
          </div>
        </div>
        <div className="nav_wrapper_right">
          <SocialMediaIconsContainer
            iconType={data.socialIconsType}
            links={socialLinks}
          />
          {featuredPage && (
            <button
              className="featured_tab"
              style={{ height: "fit-content" }}
              onClick={() =>
                handleNavigateToItem(featuredPage.pageId, featuredPage.link)
              }
            >
              {featuredPage.title}
            </button>
          )}
        </div>
      </nav>

      <div
        className="gradient_overlay"
        style={{ opacity: data.headerGradientOpacity / 100 }}
      />
      <Pinstripes type="top" />
      <Pinstripes type="bottom" />

      <div
        className={classnames(
          "header_content header_content_full",
          data.bgColor,
          { [layoutType]: isSplitLayoutHash[layoutType] }
        )}
      >
        <div
          className="hero_image_wrapper"
          style={
            getBackgroundImageUrl() && {
              backgroundImage: `url(${getBackgroundImageUrl()})`,
            }
          }
        >
          <VideoPreviewContainer embedCode={data.embedCode} />
        </div>

        <div className="header_full_wrapper">
          <div className="header_full_inner_wrapper">
            <img
              src={data.logo}
              alt="Campaign name"
              className="big_logo"
              onClick={handleOnClickLogo}
            />
            <h1>{pageName}</h1>
            <TextEditor
              value={data?.tagline || ""}
              onChange={(text) => {
                setValue({ tagline: text });
              }}
              charLimit={75}
              element="h2"
            />
            {/* TODO: Wire the form to API */}
            {isHome && (
              <>
                <div className="header_signup-bar">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="Email" />
                    <input type="text" placeholder="Phone" />
                    <input type="text" placeholder="Zip" />
                    <input type="submit" placeholder="JOIN US" />
                  </form>
                </div>

                <div className="header_signup-grid">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="Email" />
                    <input type="text" placeholder="Zip" />
                    <input type="text" placeholder="Phone" />
                    <input type="submit" placeholder="COUNT ME IN" />
                  </form>
                </div>

                <div
                  className={classnames({
                    texting_disclaimer: data.disclaimerOn,
                    hide: !data.disclaimerOn,
                  })}
                >
                  <div className="texting_disclaimer_text">
                    <TextEditor
                      value={data.disclaimer}
                      onChange={(text) =>
                        setValue({
                          disclaimer: text,
                        })
                      }
                      toolbarOptions={["bold", "italic", "link"]}
                      charLimit={360}
                    />
                  </div>
                </div>
              </>
            )}
            <SocialMediaIconsContainer
              iconType={data.socialIconsType}
              links={socialLinks}
            />
          </div>
        </div>
      </div>

      <div
        className={classnames(
          "header_content header_content_phone gradient_box",
          { [layoutType]: isSplitLayoutHash[layoutType] },
          data.bgColor
        )}
        style={{ backgroundColor: "red" }}
      >
        <div className="top_wrapper">
          <img
            src={data.logo}
            alt="Campaign name"
            className="phone_logo"
            href="/"
          />
        </div>

        <div
          className="hero_image_wrapper"
          style={
            data.mobileImage && {
              backgroundImage: `url(${data.mobileImage})`,
            }
          }
        >
          <VideoPreviewContainer embedCode={data.embedCode} />
        </div>

        <div className="bottom_wrapper">
          <TextEditor
            value={data?.tagline || ""}
            onChange={(text) => {
              setValue({ tagline: text });
            }}
            charLimit={75}
            element="h2"
          />

          <div className="header_signup-bar">
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email" />
              <input type="text" placeholder="Phone" />
              <input type="text" placeholder="Zip" />
              <input type="submit" placeholder="JOIN US" />
            </form>
          </div>

          <div className="header_signup-grid">
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email" />
              <input type="text" placeholder="Zip" />
              <input type="text" placeholder="Phone" />
              <input type="submit" placeholder="COUNT ME IN" />
            </form>
          </div>

          <div className="texting_disclaimer">
            <TextEditor
              value={data.disclaimer}
              onChange={(text) =>
                setValue({
                  disclaimer: text,
                })
              }
              toolbarOptions={["bold", "italic", "link"]}
              charLimit={360}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

HeroTemplate.propTypes = {
  data: PropTypes.shape(),
  setValue: PropTypes.func.isRequired,
  isHome: PropTypes.bool.isRequired,
};

export default HeroTemplate;
