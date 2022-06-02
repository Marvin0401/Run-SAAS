import React from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { blockSelector } from "@redux/selectors/site";

import { BLOCK_TYPES } from "@constants";

import BlockConfigEndorsements from "@components/block-config-endorsements/block-config-endorsements.component";
import BlockConfigBasicText from "@components/block-config-basic-text/block-config-basic-text.component";
import BlockConfigIssues from "@components/block-config-issues/block-config-issues.component";
import BlockConfigLanding from "@components/block-config-landing/block-config-landing.component";
import CustomBlockFilter from "@components/custom-block-filter/custom-block-filter.component";
import BlockConfigIntro from "@components/block-config-intro/block-config-intro.component";
import BlockConfigFullWidthVideoImage from "@components/block-config-full-width-video-image/block-config-full-width-video-image.component";
import BlockConfigShortForm from "@components/block-config-short-form/block-config-short-form.component";

import HeroConfig from "@components/hero-config/hero-config.component";
import { DATA_TYPE } from "@constants/";
import BlockConfigTwitter from "@components/block-config-twitter/block-config-twitter.component";
import BlockConfigLongFromBlock from "@components/block-config-long-from-block/block-config-long-from-block.component";
import useQuery from "@helpers/useQuery";
import InlineImageTextEditor from "@components/inline-image-text-editor/inline-image-text-editor.component";

const BlockFilter = () => {
  const { blockId } = useParams();
  const block = useSelector((state) => blockSelector({ state, blockId }));
  const query = useQuery();

  const imageId = query.get("imageId");
  if (imageId) {
    return <InlineImageTextEditor imageId={imageId} />;
  }

  switch (block?.type) {
    case BLOCK_TYPES.ENDORSEMENTS:
      return <BlockConfigEndorsements block={block} />;
    case BLOCK_TYPES.BASIC_TEXT:
      return <BlockConfigBasicText block={block} />;
    case BLOCK_TYPES.BULLET_COLUMNS:
      return <CustomBlockFilter block={block} dataKeyPath={["data"]} />;
    case BLOCK_TYPES.TEXT_WITH_SIDEBAR:
      return (
        <CustomBlockFilter block={block} dataKeyPath={["sidebarListItems"]} />
      );
    case BLOCK_TYPES.TIMELINE:
      return <CustomBlockFilter block={block} dataKeyPath={["data"]} />;
    case BLOCK_TYPES.EVENTS_LIST:
      return <CustomBlockFilter block={block} dataKeyPath={["items"]} />;
    case BLOCK_TYPES.ISSUES_LIST:
      return <BlockConfigIssues block={block} />;
    case BLOCK_TYPES.NEWS_LIST:
      return (
        <CustomBlockFilter
          block={block}
          dataKeyPath={["items"]}
          dataType={DATA_TYPE.SHARED}
        />
      );
    case BLOCK_TYPES.INTRO:
      return <BlockConfigIntro block={block} />;
    case BLOCK_TYPES.FULL_WIDTH_IMAGE:
    case BLOCK_TYPES.FULL_WIDTH_VIDEO:
      return <BlockConfigFullWidthVideoImage block={block} />;
    case BLOCK_TYPES.HERO:
      return <HeroConfig block={block} />;
    case BLOCK_TYPES.LANDING_POPUP:
      return <BlockConfigLanding block={block} />;

    case BLOCK_TYPES.SHORT_FORM:
      return <BlockConfigShortForm block={block} />;
    case BLOCK_TYPES.LONG_FORM:
      return <BlockConfigLongFromBlock block={block} />;
    case BLOCK_TYPES.TWITTER:
      return <BlockConfigTwitter block={block} />;

    default:
      return null;
  }
};

export default BlockFilter;
