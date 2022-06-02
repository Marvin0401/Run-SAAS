import React from "react";
import PropTypes from "prop-types";
// TODO: check whereelse to add this component
import Pinstripes from "@components/pinstripes/pinstripes.component";

import { blockDataSelector } from "@helpers/blockData";
import classnames from "classnames";

const DonateBlock = ({ block }) => {

  const { data, sharedData } = block;

  const blockData = blockDataSelector({ data });
  const sharedBlockData = blockDataSelector({ data: sharedData });

  return (
      <section
        className={classnames("donate_block", {
          label: !blockData.headlineOn,
          headline: blockData.headlineOn,
        })}
      >
        {/* <!--headline class, label class or no class can be toggled--> */}

        <Pinstripes type="top" />

        <h2 dangerouslySetInnerHTML={{__html: blockData?.headline}} />

        <div className="donate_buttons">
          <div className="donate_label">Donate:</div>
          {sharedBlockData.buttonData.map((item, i) => (
            <a
              href={item.url}
              target="_blank"
              className="donation_amount"
              rel="noreferrer"
              key={i}
            >
              {(item.amount === null && "Other") || "$" + item.amount}
            </a>
          ))}
        </div>
      </section>
  );
};

DonateBlock.propTypes = {
  block: PropTypes.object.isRequired,
};

export default DonateBlock;
