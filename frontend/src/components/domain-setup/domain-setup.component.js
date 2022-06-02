import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";

import { CopyToClipboard } from "react-copy-to-clipboard";
import clients from "@services/api";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import { ReactSVG } from "react-svg";
import { toast } from "react-toastify";
import {
  publishSite,
  updateSiteSettings,
  getSiteData,
} from "@redux/slices/site";

import CopyIcon from "@assets/images/cms/copy.svg";

const DomainSetup = ({
  domain: currentDomain,
  updateDomain,
  saveDomain,
  close,
}) => {
  const [verifyDomain, setVerifyDomain] = useState(false);
  const [domain, setDomain] = useState(currentDomain);
  const [resRecord, setResRecord] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const recordNamesStr = useMemo(() => {
    if (resRecord) {
      return resRecord.map((record) => record.Type).join(", ");
    } else {
      return "";
    }
  }, [resRecord]);

  const {
    id: siteId,
    is_published,
    is_domain_live,
  } = useSelector((state) => state.site.settings);

  const handleOnSubmitDomain = async () => {
    if (!domain) {
      toast.error("Please enter domain name.");
      return;
    }
    setIsLoading(true);
    const data = {
      domain_name: domain,
      site_id: siteId,
    };
    try {
      const response = await clients.default.client({
        method: "post",
        url: "api/sites/request/ssl/",
        data,
      });

      setResRecord(response.data.data.domain_validation_record);
      setVerifyDomain(true);
      setIsLoading(false);
      setIsVerified(false);
      toast.success("Records fetched successfully");
    } catch (err) {
      toast.error(
        "Got an error while fetching SSL. Please contact administrator."
      );
      setIsLoading(false);
      console.log({ err });
    }
  };

  const handleOnClickVerify = async () => {
    setIsLoading(true);
    const data = {
      domain_name: domain,
      site_id: siteId,
    };
    let response = {};
    try {
      response = await clients.default.client({
        method: "post",
        url: "api/sites/request/ssl/",
        data,
      });
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error(
        "Got an error while performing verification. Please contact administrator."
      );
      console.error(e);
    }

    if (response?.data?.data.status === "ISSUED") {
      setIsVerified(true);
      toast.success("Verification successful");
    } else {
      toast.error("Verification is still pending, Please try again later.");
      setIsVerified(false);
    }
  };

  const handleOnCopy = () => {
    toast.success("Copied to clipboard");
  };

  const handleOnClickSave = () => {
    updateDomain(domain);
    saveDomain(undefined, domain).then(() => {
      close();
      dispatch(
        getSiteData({ siteId, isLive: true, overrideState: false })
      ).then((res) => {
        dispatch(
          publishSite({
            data: {
              data: res.payload?.data[0],
              domain,
              siteId,
              template: "gatsby-test",
              isProduction: true,
            },
          })
        ).then(() => {
          if (!is_published || !is_domain_live) {
            dispatch(
              updateSiteSettings({
                data: {
                  is_published: true,
                  is_domain_live: true,
                },
                id: siteId,
              })
            );
          }
        });
      });
    });
  };

  return (
    <div className="full_option_wrapper">
      {!verifyDomain ? (
        <>
          <h4 className="full">Domain name</h4>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            name="domain"
            className="input-center"
            placeholder="Enter domain name here"
          />
          <button
            className={classnames("button", {
              "is-loading": isLoading,
            })}
            disabled={isLoading}
            onClick={handleOnSubmitDomain}
          >
            Submit
          </button>
        </>
      ) : (
        <>
          <p>
            Add the {recordNamesStr} records below to your DNS provider to
            verify that you own <b>{domain}</b>. Do not delete your{" "}
            {recordNamesStr} records.
          </p>
          {resRecord.map(
            (record, idx) =>
              record && (
                <div key={idx} className="record">
                  <div key={idx + "type"} className="record-item">
                    <h5>Type</h5>
                    <span>{record.Type}</span>
                  </div>
                  <div key={idx + "name"} className="record-item">
                    <h5>Name</h5>
                    <span>{record.Name}</span>
                    <CopyToClipboard text={record.Name} onCopy={handleOnCopy}>
                      <ReactSVG
                        src={CopyIcon}
                        className="copy-icon svg replaced-svg"
                      />
                    </CopyToClipboard>
                  </div>
                  <div key={idx + "value"} className="record-item">
                    <h5>Value</h5>
                    <span>{record.Value}</span>
                    <CopyToClipboard text={record.Value} onCopy={handleOnCopy}>
                      <ReactSVG
                        src={CopyIcon}
                        className="copy-icon svg replaced-svg"
                      />
                    </CopyToClipboard>
                  </div>
                </div>
              )
          )}
          <button
            className={classnames("button verifiable", {
              "is-loading": isLoading,
              verified: isVerified,
            })}
            disabled={isLoading}
            onClick={handleOnClickVerify}
            style={{ marginRight: 10 }}
          >
            Verify
          </button>
          <button
            className={classnames("button")}
            disabled={!isVerified}
            onClick={handleOnClickSave}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
};

DomainSetup.propTypes = {
  updateDomain: PropTypes.func.isRequired,
  saveDomain: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  domain: PropTypes.string,
};

export default DomainSetup;
