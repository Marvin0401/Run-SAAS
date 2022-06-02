import React from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { blockSelector } from "@redux/selectors/site";

import { BLOCK_TYPES } from "@constants";
import { Redirect } from "react-router-dom";

import CalloutConfigQuote from "@components/callout-config-quote/callout-config-quote.component";
import CalloutConfigQuoteWithPhoto from "@components/callout-config-quote-with-photo/callout-config-quote-with-photo.component";
import CustomBlockFilter from "@components/custom-block-filter/custom-block-filter.component";

const CalloutFilter = () => {
  const { blockId, pageId } = useParams();

  const block = useSelector((state) => blockSelector({ state, blockId }));

  if (!block?.callout && pageId)
    return <Redirect to={`/cms/page/${pageId}/block/${blockId}/`} />;

  switch (block?.callout.type) {
    case BLOCK_TYPES.DATA_DETAILS:
      return <CustomBlockFilter block={block.callout} dataKeyPath={["data"]} />;
    case BLOCK_TYPES.QUOTE_IMAGE:
      return <CalloutConfigQuoteWithPhoto block={block} />;
    case BLOCK_TYPES.QUOTE:
      return <CalloutConfigQuote block={block} />;
    default:
      return null;
  }
};

export default CalloutFilter;
