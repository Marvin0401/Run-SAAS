/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef } from "react";

import { activePageSelector, homePageSelector } from "@redux/selectors/site";
import classnames from "classnames";

import { BLOCK_TYPES } from "@constants";

import { useSelector, useDispatch } from "react-redux";

import BasicTextBlock from "@components/basic-text-block/basic-text-block.component";
import BulletColumnsBlock from "@components/bullet-columns-block/bullet-columns-block.component";
import EndorsementsFilter from "@components/endorsements-filter/endorsements-filter.component";
import FooterBlock from "@components/footer-block/footer-block.component";
import HeroContainer from "@components/hero-container/hero-container.component";
import IssuesFilter from "@components/issues-filter/issues-filter.component";
import IntroBlock from "@components/intro-block/intro-block.component";
import LandingFilter from "@components/landing-filter/landing-filter.component";
import TextWithSidebarBlock from "@components/text-with-sidebar-block/text-with-sidebar-block.component";
import TimelineBlock from "@components/timeline-block/timeline-block.component";
import DataDetailsCallout from "@components/data-details-callout/data-details-callout.component";
import QuoteCallout from "@components/quote-callout/quote-callout.component";
import QuoteWithImageCallout from "@components/quote-with-image-callout/quote-with-image-callout.component";
import FullWidthVideoBlock from "@components/full-width-video-block/full-width-video-block.component";
import FullWidthImageBlock from "@components/full-width-image-block/full-width-image-block.component";
import BlockEventsContainer from "@components/block-events-container/block-events-container.component";
import NewsFilter from "@components/news-filter/news-filter.component";
import ShortFormBlock from "@components/short-form-block/short-form-block.component";
import CustomLink from "@components/custom-link/custom-link.component";

import useStyles from "./active-page.style";
import { useRouteMatch } from "react-router-dom";
import TwitterBlock from "@components/twitter-block/twitter-block.component";
import LongFromBlock from "@components/long-from-block/long-from-block.component";
import useDynamicRefs from "use-dynamic-refs";
import {
  setSelectedBlockTheme,
  setScrapingStatus,
} from "@redux/slices/colorPallets";

import extractCSStoObject from "utils/css_extractor_native";

const NO_CONFIG = [
  BLOCK_TYPES.FOOTER,
  // BLOCK_TYPES.LONG_FORM,
  // BLOCK_TYPES.SHORT_FORM,
];
const ActivePage = () => {
  const page = useSelector((state) => activePageSelector({ state }));
  const { corners } = useSelector((state) => state.design);
  const homePage = useSelector((state) => homePageSelector({ state }));
  const isHome = page.id === homePage.id;

  const { isShowPalletSidebar, selectedBlockTheme } = useSelector(
    (state) => state.colorPallets
  );
  const [getRef, setRef] = useDynamicRefs();

  const pageRef = useRef();

  const blockTypes = page?.blocks || [];

  const classes = useStyles();

  const dispatch = useDispatch();

  const matchParams = useRouteMatch(
    "/cms/page/:pageId/block/:blockId/:itemId?"
  );

  const activeItemId = useMemo(
    () => matchParams?.params?.itemId,
    [matchParams]
  );

  const activeBlockId = useMemo(
    () => matchParams?.params?.blockId,
    [matchParams]
  );

  const getCalloutJSX = (parentNode, block) => {
    if (!block.callout) return parentNode;
    switch (block?.callout.type) {
      case BLOCK_TYPES.DATA_DETAILS:
        return (
          <>
            {parentNode}
            <DataDetailsCallout block={block} pageID={page.id} />
          </>
        );
      case BLOCK_TYPES.QUOTE_IMAGE:
        return (
          <>
            {parentNode}
            <QuoteWithImageCallout block={block} pageID={page.id} />
          </>
        );
      case BLOCK_TYPES.QUOTE:
        return (
          <>
            {parentNode}
            <QuoteCallout block={block} pageID={page.id} />
          </>
        );
      default:
        return parentNode;
    }
  };

  const getJSX = (block) => {
    switch (block.type) {
      case BLOCK_TYPES.HERO:
        return <HeroContainer block={block} key={block.id} />;
      case BLOCK_TYPES.BASIC_TEXT:
        return getCalloutJSX(
          <BasicTextBlock block={block} key={block.id} />,
          block
        );
      case BLOCK_TYPES.ENDORSEMENTS:
        return (
          <EndorsementsFilter block={block} key={block.id} pageId={page.id} />
        );
      case BLOCK_TYPES.ISSUES_LIST:
        return (
          <IssuesFilter
            block={block}
            pageId={page.id}
            key={block.id}
            itemId={activeItemId}
          />
        );
      case BLOCK_TYPES.BULLET_COLUMNS:
        return getCalloutJSX(
          <BulletColumnsBlock block={block} key={block.id} pageID={page.id} />,
          block
        );
      case BLOCK_TYPES.NEWS_LIST:
        return getCalloutJSX(
          <NewsFilter block={block} key={block.id} pageID={page.id} />,
          block
        );
      case BLOCK_TYPES.FOOTER:
        return <FooterBlock block={block} key={block.id} />;
      case BLOCK_TYPES.INTRO:
        return <IntroBlock block={block} key={block.id} pageID={page.id} />;
      case BLOCK_TYPES.TEXT_WITH_SIDEBAR:
        return getCalloutJSX(
          <TextWithSidebarBlock
            block={block}
            key={block.id}
            pageID={page.id}
          />,
          block
        );
      case BLOCK_TYPES.TIMELINE:
        return <TimelineBlock block={block} key={block.id} pageID={page.id} />;
      case BLOCK_TYPES.LANDING_POPUP:
        return <LandingFilter block={block} key={block.id} />;
      case BLOCK_TYPES.FULL_WIDTH_VIDEO:
        return (
          <FullWidthVideoBlock block={block} key={block.id} pageID={page.id} />
        );
      case BLOCK_TYPES.FULL_WIDTH_IMAGE:
        return (
          <FullWidthImageBlock block={block} key={block.id} pageID={page.id} />
        );
      case BLOCK_TYPES.EVENTS_LIST:
        return (
          <BlockEventsContainer
            block={block}
            key={block.id}
            itemId={activeItemId}
            pageId={page.id}
          />
        );
      case BLOCK_TYPES.SHORT_FORM:
        return <ShortFormBlock block={block} key={block.id} pageID={page.id} />;
      case BLOCK_TYPES.TWITTER:
        return <TwitterBlock block={block} key={block.id} pageID={page.id} />;
      case BLOCK_TYPES.LONG_FORM:
        return <LongFromBlock block={block} key={block.id} pageID={page.id} />;
      default:
        return null;
    }
  };

  const handleBlockClick = async (blockRefName, blockType, blockId) => {
    if (!isShowPalletSidebar) {
      return;
    }

    const blockRef = getRef(blockRefName);

    dispatch(setScrapingStatus("loading"));

    const blockCss = extractCSStoObject(blockRef.current, true);

    dispatch(
      setSelectedBlockTheme({
        theme: blockCss,
        blockType,
        blockId,
      })
    );

    dispatch(setScrapingStatus("succeeded"));
  };

  useEffect(() => {
    if (isShowPalletSidebar && selectedBlockTheme == null) {
      const firstPageBlock = blockTypes[0]?.children[0];
      const blockRef = getRef("block" + 0 + firstPageBlock?.type);

      if (blockRef.current) {
        dispatch(setScrapingStatus("loading"));

        const blockCss = extractCSStoObject(blockRef.current, true);

        dispatch(
          setSelectedBlockTheme({
            theme: blockCss,
            blockType: firstPageBlock.type,
            blockId: firstPageBlock.id,
          })
        );

        dispatch(setScrapingStatus("succeeded"));
      }
    }
  }, [isShowPalletSidebar, selectedBlockTheme]);

  return (
    <div
      className={classnames(classes.container, {
        rounded: corners === "rounded",
        half_rounded: corners === "half_rounded",
        inner_page: !isHome,
      })}
      id="block_container"
      ref={pageRef}
    >
      {blockTypes.map((blockType) =>
        blockType.children.map((block, index) =>
          NO_CONFIG.includes(block.type) ? (
            <CustomLink
              key={`${page.id + block.id}`}
              ref={setRef("block" + index + block.type)}
              onClick={() =>
                handleBlockClick(
                  "block" + index + block.type,
                  block.type,
                  block.id
                )
              }
              id={"block_" + block.type?.toLowerCase()}
            >
              {getJSX(block)}
            </CustomLink>
          ) : (
            <CustomLink
              to={
                activeItemId &&
                activeItemId !== "callout" &&
                activeBlockId === block.id
                  ? `/cms/page/${page.id}/block/${block.id}/${activeItemId}`
                  : `/cms/page/${page.id}/block/${block.id}`
              }
              key={`${page.id + block.id}`}
              ref={setRef("block" + index + block.type)}
              onClick={() =>
                handleBlockClick(
                  "block" + index + block.type,
                  block.type,
                  block.id
                )
              }
              id={"block_" + block.type?.toLowerCase()}
            >
              {getJSX(block)}
            </CustomLink>
          )
        )
      )}
    </div>
  );
};

export default ActivePage;
