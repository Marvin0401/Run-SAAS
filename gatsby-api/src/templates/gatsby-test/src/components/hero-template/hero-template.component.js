import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { Link, navigate } from "gatsby";

import classnames from "classnames";

import SocialMediaIconsTemplate from "@components/social-media-icons-template/social-media-icons-template.component";
import MainTabsTemplate from "@components/main-tabs-template/main-tabs-template.component";
import VideoPreviewTemplate from "@components/video-preview-template/video-preview-template.component";
import Pinstripes from "@components/pinstripes/pinstripes.component";

import NavMobileTemplate from "@components/nav-mobile-template/nav-mobile-template.component";
import { siteSelector, homePageSelector } from "@helpers/site";
import { blockDataSelector } from "@helpers/blockData";


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

const HeroTemplate = ({ block = null, pageName, pageId, customCode }) => {
  const { sharedData: sharedDataId, data: uniqueDataId } = block;
  // TODO: copy logic for isHome

  const sharedBlockData = blockDataSelector({ data:sharedDataId });
  const uniqueBlockData = blockDataSelector({ data:uniqueDataId });

  const homePage = homePageSelector();
  const isHome = pageId === homePage.id;

  let images = {};
  if (!isHome) {
    if (!uniqueBlockData.splitImage)
      images.splitImage = sharedBlockData.splitImage;
    if (!uniqueBlockData.fullImage)
      images.fullImage = sharedBlockData.fullImage;
    if (!uniqueBlockData.mobileImage)
      images.mobileImage = sharedBlockData.mobileImage;
  }

  const consolidatedBlockData = {
    ...sharedBlockData,
    ...uniqueBlockData,
    ...images,
  };
  const layoutType = isHome ? consolidatedBlockData?.layoutType : consolidatedBlockData?.internalPagesLayoutType;

  const siteSettings = siteSelector();

  const socialLinks = {
    facebook: siteSettings?.social_link_facebook,
    twitter: siteSettings?.social_link_twitter,
    instagram: siteSettings?.social_link_instagram,
    youtube: siteSettings?.social_link_youtube,
  };

  const handleNavigate = (slug, link) => {
    if (link) return window.open(link, "_blank");
    navigate(`/${slug}`);
  };

  const getBackgroundImageUrl = useCallback(() => {
    let imgUrl;
    if (
      layoutType === HASH.GRADIENT ||
      layoutType === HASH.ANGLED ||
      layoutType === HASH.STANDARD
    ) {
      imgUrl = consolidatedBlockData.splitImage;
    } else if (layoutType === HASH.FULL_WIDTH) {
      imgUrl = consolidatedBlockData.fullImage;
    } else if (layoutType === HASH.FLOATING || layoutType === HASH.VIDEO) {
      imgUrl = consolidatedBlockData.floatImage;
    }
    return imgUrl;
  }, [consolidatedBlockData?.layoutType, consolidatedBlockData.splitImage, consolidatedBlockData.fullImage, consolidatedBlockData.floatImage]);

  return (
    <>
      <header
        className={classnames("hero", consolidatedBlockData.bgColor, consolidatedBlockData.formType, {
          headline_on: consolidatedBlockData.headlineOn,
          page_name_on: !isHome && !consolidatedBlockData.headlineOn,
          [layoutType]: !isSplitLayoutHash[layoutType],
          flip_content: consolidatedBlockData.flipContent,
          social_icons_below: consolidatedBlockData.socialBelowContentOn,
          no_image: !consolidatedBlockData.showImage,
        })}
      >
        <div dangerouslySetInnerHTML={{__html: customCode.siteHeader}} />
        <div dangerouslySetInnerHTML={{__html: customCode.pageHeader}} />
        <NavMobileTemplate
          data={consolidatedBlockData.menuItems}
          featuredPage={consolidatedBlockData.featuredPage}
          handleNavigate={handleNavigate}
        />

        <nav className="desktop">
          <div className="nav_wrapper_left">
            <div className={classnames("main_tabs", consolidatedBlockData.buttonType)}>
              <Link to="/">
                <img src={consolidatedBlockData.logo} alt="Campaign name" className="small_logo" />
              </Link>
              <MainTabsTemplate
                data={consolidatedBlockData.menuItems}
                handleNavigate={handleNavigate}/>
            </div>
          </div>
          <div className="nav_wrapper_right">
            <SocialMediaIconsTemplate
              iconType={consolidatedBlockData.socialIconsType}
              links={socialLinks}
            />
            {consolidatedBlockData.featuredPage && (
              <button
                className="featured_tab"
                style={{ height: "fit-content" }}
                onClick={() =>
                  handleNavigate(consolidatedBlockData.featuredPage.slug, consolidatedBlockData.featuredPage.link)
                }
              >
                {consolidatedBlockData.featuredPage.title}
              </button>
            )}
          </div>
        </nav>

        <div
          className="gradient_overlay"
          style={{ opacity: consolidatedBlockData.headerGradientOpacity / 100 }}
        />
        <Pinstripes type="top" />
        <Pinstripes type="bottom" />

        <div
          className={classnames(
            "header_content header_content_full",
            consolidatedBlockData.bgColor,
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
            <VideoPreviewTemplate embedCode={consolidatedBlockData.embedCode}/>
          </div>

          <div className="header_full_wrapper">
            <div className="header_full_inner_wrapper">
              <Link to={"/"}>
                <img src={consolidatedBlockData.logo} alt="Campaign name" className="big_logo" />
              </Link>
              <h1>{pageName}</h1>
              <h2 dangerouslySetInnerHTML={{ __html: consolidatedBlockData.tagline }} />

              {isHome &&
                (
                  <>
                    <div className="header_signup-bar">
                      <form>
                        <input type="email" placeholder="Email" onChange={() => { }} />
                        <input type="text" placeholder="Phone" onChange={() => { }} />
                        <input type="text" placeholder="Zip" onChange={() => { }} />
                        <input type="submit" placeholder="JOIN US" onChange={() => { }} />
                      </form>
                    </div>

                    <div className="header_signup-grid">
                      <form>
                        <input type="email" placeholder="Email" onChange={() => { }} />
                        <input type="text" placeholder="Zip" onChange={() => { }} />
                        <input type="text" placeholder="Phone" onChange={() => { }} />
                        <input type="submit" placeholder="COUNT ME IN" onChange={() => { }} />
                      </form>
                    </div>

                    <div
                      className={classnames({
                        texting_disclaimer: consolidatedBlockData.disclaimerOn,
                        hide: !consolidatedBlockData.disclaimerOn,
                      })}
                    >
                      <div className="texting_disclaimer_text quill_editor_custom_style" dangerouslySetInnerHTML={{ __html: consolidatedBlockData.disclaimer }} />

                    </div>

                  </>)}

              <SocialMediaIconsTemplate
                iconType={consolidatedBlockData.socialIconsType}
                links={socialLinks}
              />
            </div>
          </div>
        </div>

        <div
          className={classnames(
            "header_content header_content_phone gradient_box",
            { [layoutType]: isSplitLayoutHash[layoutType] },
            consolidatedBlockData.bgColor
          )}
        >
          <div className="top_wrapper">
            <Link to="/">
              <img
                src={consolidatedBlockData.logo}
                alt="Campaign name"
                className="phone_logo"
              />
            </Link>
          </div>

          <div
            className="hero_image_wrapper"
            style={
              consolidatedBlockData.mobileImage && {
                backgroundImage: `url(${consolidatedBlockData.mobileImage})`,
              }
            }
            style={{
              backgroundImage: `url(${consolidatedBlockData.mobileImage})`,
            }}
          >
            <VideoPreviewTemplate embedCode={consolidatedBlockData.embedCode}/>
          </div>

          <div className="bottom_wrapper">
            <h2 dangerouslySetInnerHTML={{__html: consolidatedBlockData?.tagline}} />

            <div className="header_signup-bar">
              <form>
                <input type="email" placeholder="Email" onChange={() => {}} />
                <input type="text" placeholder="Phone" onChange={() => {}} />
                <input type="text" placeholder="Zip" onChange={() => {}} />
                <input type="submit" placeholder="JOIN US" onChange={() => {}} />
              </form>
            </div>

            <div className="header_signup-grid">
              <form>
                <input type="email" placeholder="Email" onChange={() => {}} />
                <input type="text" placeholder="Zip" onChange={() => {}} />
                <input type="text" placeholder="Phone" onChange={() => {}} />
                <input type="submit" placeholder="COUNT ME IN" onChange={() => {}} />
              </form>
            </div>

            <div className="texting_disclaimer quill_editor_custom_style" dangerouslySetInnerHTML={{__html: consolidatedBlockData.disclaimer}} />
          </div>
        </div>
      </header>
      <div dangerouslySetInnerHTML={{__html: customCode.siteBody}} />
      <div dangerouslySetInnerHTML={{__html: customCode.pageBody}} />
    </>
  );
};

HeroTemplate.propTypes = {
  block: PropTypes.object,
  pageName: PropTypes.string,
  pageId: PropTypes.string,
  customCode: PropTypes.object,
};

export default HeroTemplate;
