import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { uploadSSLCert } from "@redux/slices/site";

import classnames from "classnames";

const SslForm = () => {
  const dispatch = useDispatch();

  const siteId = useSelector((state) => state.site.settings?.id);

  const isLoading = useSelector((state) => state.site.status === "loading");

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const data = {
      certificate_body: e.target.body.value,
      chain: e.target.chain.value,
      private_key: e.target.key.value,
    };

    dispatch(uploadSSLCert({ data, id: siteId }));
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="full_row_wrapper">
        <div className="full_option_wrapper">
          <label>Certificate Body (PEM encoded)</label>
          <textarea placeholder="Certificate Body" name="body" />
        </div>

        <div className="full_option_wrapper">
          <label>Certificate Key (PEM encoded)</label>
          <textarea placeholder="Certificate Key" name="key" />
        </div>

        <div className="full_option_wrapper">
          <label>Certificate Chain (PEM encoded)</label>
          <textarea placeholder="Certificate Chain" name="chain" />
        </div>

        <div className="full_option_wrapper full_width">
          <div className={classnames("button", { "is-loading": isLoading })}>
            <input type="submit" value="Upload" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SslForm;
