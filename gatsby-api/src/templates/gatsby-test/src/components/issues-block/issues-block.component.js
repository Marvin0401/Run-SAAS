import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Pinstripes from "@components/pinstripes/pinstripes.component";
import StyleInjector from "@components/style-injector/style-injector.component";

import { Link } from 'gatsby';

import { blockDataSelector } from "@helpers/blockData";
import { slugSelector } from "@helpers/blockData";
import { containerOfPageWithBlockSelector } from "@helpers/site";

import { ReactSVG } from "react-svg";
import CHECKICON from "@assets/images/icon-check.svg";
import ARROWICON from "@assets/images/icon_arrow-1.svg";
import { BLOCK_TYPES, BLOCK_VARIANT, PAGE_CATEGORIES } from "@constants/constants";

const IssuesBlock = ({ block }) => {

  const { sharedData } = block;

  const sharedBlockData = blockDataSelector({ data: sharedData });

  const defaultPageContainer = 
    containerOfPageWithBlockSelector({
      type: BLOCK_TYPES.ISSUES_LIST,
      variant: BLOCK_VARIANT.DEFAULT,
    });

  const defaultIsHidden =
    defaultPageContainer?.type === PAGE_CATEGORIES.HIDDEN ||
    defaultPageContainer.type === PAGE_CATEGORIES.DRAFT;

  const pageSlug = !defaultIsHidden ? slugSelector({pageId: sharedBlockData.pageId}) : null;
  
  return (
      <section className="issues_block">
        <Pinstripes type="top" />

        <div className="issues_wrapper">
          {sharedBlockData.items.map((item, i) => (
            <Fragment key={item.id}>
              {i % 2 === 0 && (
                <>
                  <div className="issues_divider"></div>
                  <div className="issues_divider"></div>
                </>
              )}
              <article className="issues_item-extra">
                <ReactSVG className="checkmark_icon svg" src={CHECKICON} />

                <div className="text_section">
                  <h2 dangerouslySetInnerHTML={{__html: item.title}} />

                  <p>
                    <div className="quill_editor_custom_style" dangerouslySetInnerHTML={{__html: item.description}} />
                  </p>
                </div>
              </article>
            </Fragment>
          ))}
        </div>

        {!defaultIsHidden && (
          <Link
            to={`/${pageSlug}`}
          >
            <button type="button" className="btn_style-1">
              More Issues
              <ReactSVG className="arrow svg" src={ARROWICON} wrapper="svg" />
            </button>
          </Link>
        )}
      </section>
  );
};
IssuesBlock.propTypes = {
  block: PropTypes.object.isRequired,
};
export default IssuesBlock;
