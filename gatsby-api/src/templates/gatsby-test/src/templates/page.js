import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BLOCK_TYPES } from "@constants/constants";
import HeroTemplate from "@components/hero-template/hero-template.component";
import BasicTextBlock from "@components/basic-text-block/basic-text-block.component";
import EndorsementsFilter from "@components/endorsements-filter/endorsements-filter.component";
import FooterBlock from "@components/footer-block/footer-block.component";
import BulletColumnsBlock from "@components/bullet-columns-block/bullet-columns-block.component";
import IntroBlock from "@components/intro-block/intro-block.component";
import IssuesFilter from "@components/issues-filter/issues-filter.component";
import TimelineBlock from "@components/timeline-block/timeline-block.component";
import { NotificationPopUpProvider } from "@components/notification-pop-up/notification-pop-up.component";
import LandingFilter from "@components/landing-filter/landing-filter.component";
import FullWidthVideoBlock from "@components/full-width-video-block/full-width-video-block.component";
import FullWidthImageBlock from "@components/full-width-image-block/full-width-image-block.component";
import BlockEventsContainer from "@components/block-events-container/block-events-container.component";
import DataDetailsCallout from "@components/data-details-callout/data-details-callout.component";
import QuoteCallout from "@components/quote-callout/quote-callout.component";
import QuoteWithImageCallout from "@components/quote-with-image-callout/quote-with-image-callout.component";
import NewsFilter from "@components/news-filter/news-filter.component";
import TwitterBlock from "@components/twitter-block/twitter-block.component";
import ShortFormBlock from "@components/short-form-block/short-form-block.component";
import LongFromBlock from "@components/long-from-block/long-from-block.component";
import TextWithSidebarBlock from "@components/text-with-sidebar-block/text-with-sidebar-block.component";
import GlobalStyle from "@components/global-style/global-style.component.js";

import { Helmet } from "react-helmet";
import { useMatch } from "@reach/router";
import { site } from "../../content/Data.json";

function PageTemplate({ pageContext }) {
  const { blocks, name, settings, id: pageId } = pageContext;
  const params = useMatch("/:pageSlug/:itemSlug");

  const getCalloutJSX = (parentNode, block) => {
    if (!block.callout) return parentNode;
    switch (block?.callout.type) {
      case BLOCK_TYPES.DATA_DETAILS:
        return (
          <>
            {parentNode}
            <DataDetailsCallout block={block} key={block?.callout.id} />
          </>
        );
      case BLOCK_TYPES.QUOTE_IMAGE:
        return (
          <>
            {parentNode}
            <QuoteWithImageCallout block={block} key={block?.callout.id} />
          </>
        );
      case BLOCK_TYPES.QUOTE:
        return (
          <>
            {parentNode}
            <QuoteCallout block={block} key={block?.callout.id} />
          </>
        );
      default:
        return parentNode;
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{settings.title || site.settings.title}</title>
        <meta
          name="title"
          content={settings.meta_title || site.settings.title}
        />
        <meta
          name="description"
          content={settings.description || site.settings.meta_description}
        />
        <meta name="description" content={site.settings.meta_keywords} />
        <meta name="og:title" content={site.settings.share_name} />
        <meta name="og:description" content={site.settings.share_description} />
        <meta name="og:image" content={site.settings.share_image} />
        <meta
          name="og:site_name"
          content={settings.meta_title || site.settings.title}
        />
        <link href={site.settings.fav_icon_loc} rel="icon" />
      </Helmet>
      <NotificationPopUpProvider>
        <GlobalStyle />
        {blocks.map((blockType) =>
          blockType.children.map((block) => {
            switch (block.type) {
              case BLOCK_TYPES.HERO:
                return (
                  <HeroTemplate
                    block={block}
                    pageName={name}
                    key={block.id}
                    customCode={{
                      siteHeader: site.settings.header,
                      siteBody: site.settings.body,
                      pageHeader: settings.header,
                      pageBody: settings.body,
                    }}
                    pageId={pageId}
                  />
                );
              case BLOCK_TYPES.BASIC_TEXT:
                return getCalloutJSX(
                  <BasicTextBlock block={block} key={block.id} />,
                  block
                );
              case BLOCK_TYPES.ENDORSEMENTS:
                return <EndorsementsFilter block={block} key={block.id} />;
              case BLOCK_TYPES.FOOTER:
                return (
                  <FooterBlock
                    block={block}
                    key={block.id}
                    customCode={{
                      siteFooter: site.settings.footer,
                      pageFooter: settings.footer,
                    }}
                  />
                );
              case BLOCK_TYPES.BULLET_COLUMNS:
                return getCalloutJSX(
                  <BulletColumnsBlock block={block} key={block.id} />,
                  block
                );
              case BLOCK_TYPES.NEWS_LIST:
                return getCalloutJSX(
                  <NewsFilter
                    block={block}
                    pageId={pageId}
                    key={block.id}
                    activeItemId={params?.itemSlug}
                  />,
                  block
                );
              case BLOCK_TYPES.INTRO:
                return <IntroBlock block={block} key={block.id} />;
              case BLOCK_TYPES.TEXT_WITH_SIDEBAR:
                return getCalloutJSX(
                  <TextWithSidebarBlock block={block} key={block.id} />,
                  block
                );
              case BLOCK_TYPES.ISSUES_LIST:
                return (
                  <IssuesFilter
                    block={block}
                    pageId={pageId}
                    key={block.id}
                    itemId={params?.itemSlug}
                  />
                );
              case BLOCK_TYPES.LANDING_POPUP:
                return site.settings.popup === "on" ? (
                  <LandingFilter block={block} key={block.id} />
                ) : null;
              case BLOCK_TYPES.TIMELINE:
                return <TimelineBlock block={block} key={block.id} />;
              case BLOCK_TYPES.FULL_WIDTH_VIDEO:
                return <FullWidthVideoBlock block={block} key={block.id} />;
              case BLOCK_TYPES.FULL_WIDTH_IMAGE:
                return <FullWidthImageBlock block={block} key={block.id} />;
              case BLOCK_TYPES.EVENTS_LIST:
                return (
                  <BlockEventsContainer
                    block={block}
                    key={block.id}
                    itemId={params?.itemSlug}
                    pageId={pageId}
                  />
                );
              case BLOCK_TYPES.SHORT_FORM:
                return <ShortFormBlock block={block} key={block.id} />;
              case BLOCK_TYPES.TWITTER:
                return <TwitterBlock block={block} key={block.id} />;
              case BLOCK_TYPES.LONG_FORM:
                return <LongFromBlock block={block} key={block.id} />;
              default:
                return null;
            }
          })
        )}
      </NotificationPopUpProvider>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        closeButton={false}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
export default PageTemplate;
