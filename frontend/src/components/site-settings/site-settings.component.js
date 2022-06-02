import React, { useRef, useEffect, useCallback, useState } from "react";

import classnames from "classnames";

import { useDispatch, useSelector } from "react-redux";
import { updateSiteSettings } from "@redux/slices/site";
import clients from "@services/api";

import useStyles from "./site-settings.style";

import { ReactSVG } from "react-svg";

import { useImageUploadPopUp } from "@components/image-upload-modal/image-upload-modal.component";
import { useNotificationPopUp } from "@components/notification-pop-up/notification-pop-up.component";

import UploadIcon from "@assets/images/cms/upload_button.svg";
import DomainSetup from "@components/domain-setup/domain-setup.component";
import { toast } from "react-toastify";
// import root from "react-shadow";

// import generalStyles from "@styles/general.scss";
// import cmsStyles from "@styles/cms_shadow.scss";
// import formsStyles from "@styles/forms.scss";
// import buttonsStyles from "@styles/buttons.scss";

const SiteSettings = (props) => {
  const classes = useStyles(props);
  const form = useRef(null);
  const buildInProgress = useSelector((state) => state.site.buildInProgress);
  const [isVerified, setIsVerified] = useState();

  const dispatch = useDispatch();

  const setPopUp = useImageUploadPopUp();

  const { setPopUp: setNotificationPopUp } = useNotificationPopUp();

  const settings = useSelector((state) => state.site.settings);
  const { id: siteId } = settings;
  const isLoading = useSelector((state) => state.status === "loading");
  const isPaying = useSelector((state) => state.auth.user?.is_paying);

  const validate = () => {
    return form.current.reportValidity();
  };

  const [domain, setDomain] = useState(settings?.domain || "");
  const [formProvider, setFormProvider] = useState(settings.formProvider || "");

  useEffect(() => {
    (async () => {
      if (!domain) return;
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
        if (response?.data?.data.status === "ISSUED") {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (err) {
        toast.error(
          "Got an error while verification of domain. Please contact administrator."
        );
        console.log({ err });
        setIsVerified(false);
      }
    })();
  }, [domain]);

  const handleVisitSite = (e) => {
    e && e.preventDefault();
    let url = "";
    if (isPaying && settings.domain && settings.is_domain_live) {
      url = `https://${settings.domain}`;
    } else {
      url = `https://${settings.id}.designedtorun.com`;
    }
    window.open(url, "_target");
  };

  const handleOnSubmit = useCallback(
    (e, domainName = domain) => {
      e && e.preventDefault();

      if (validate()) {
        let data = {};
        form.current.title.value && (data["title"] = form.current.title.value);
        domainName && (data["domain"] = domainName);
        form.current.favicon.value &&
          (data["fav_icon_loc"] = form.current.fav_icon_loc.value);
        form.current.meta_description.value &&
          (data["meta_description"] = form.current.meta_description.value);
        form.current.meta_keywords.value &&
          (data["meta_keywords"] = form.current.meta_keywords.value);
        form.current.social_link_facebook.value &&
          (data["social_link_facebook"] =
            form.current.social_link_facebook.value);
        form.current.social_link_twitter.value &&
          (data["social_link_twitter"] =
            form.current.social_link_twitter.value);
        form.current.social_link_instagram.value &&
          (data["social_link_instagram"] =
            form.current.social_link_instagram.value);
        form.current.social_link_youtube.value &&
          (data["social_link_youtube"] =
            form.current.social_link_youtube.value);
        form.current.share_description.value &&
          (data["share_description"] = form.current.share_description.value);
        form.current.share_image.value &&
          (data["share_image"] = form.current.share_image.value);
        form.current.share_title.value &&
          (data["share_title"] = form.current.share_title.value);
        form.current.header.value &&
          (data["header"] = form.current.header.value);
        form.current.body.value && (data["body"] = form.current.body.value);
        form.current.footer.value &&
          (data["footer"] = form.current.footer.value);
        formProvider && (data["formProvider"] = formProvider);
        if (formProvider === "google_forms") {
          data["formApiKey"] = "";
        } else {
          form.current.formApiKey?.value &&
            (data["formApiKey"] = form.current.formApiKey.value);
        }
        form.current.popup &&
          (data["popup"] = form.current.popup.checked ? "on" : "off");
        return dispatch(
          updateSiteSettings({
            data,
            id: settings.id,
          })
        );
      }
    },
    [domain, formProvider]
  );

  useEffect(() => {
    document
      .querySelectorAll(
        `.${classes.container} .full_option_wrapper input.${classes.formInput}`
      )
      .forEach((el) =>
        el.addEventListener("change", addClassOnChange, { once: true })
      );
  }, []);

  const addClassOnChange = useCallback((event) => {
    event.target.classList.add("touched");
  }, []);

  const handleOnUploadSuccess = ({ mediaUrl, type }) => {
    if (type === "share") {
      form.current.share_image.value = mediaUrl;
    } else if (type === "favicon") {
      form.current.favicon.value = mediaUrl;
    }

    setPopUp({ close: true });
  };

  const handleOnClickShareImage = ({ src }, type) => {
    let options = {
      enableCrop: true,
      onUploadSuccess: ({ mediaUrl }) =>
        handleOnUploadSuccess({ mediaUrl, type }),
      src,
    };

    if (type === "share") {
      options = {
        ...options,
        imgDimensions: {
          left: 0,
          top: 0,
          width: 1200,
          height: 630,
        },
      };
    } else if (type === "favicon") {
      options = {
        ...options,
        aspectRatio: 1,
        enableCrop: true,
      };
    }
    setPopUp(options);
  };

  const handleOnChangeFileUpload = (e, type) => {
    const { files } = e.target;

    if (files && files.length === 0) {
      return;
    }

    handleOnClickShareImage(
      {
        src: URL.createObjectURL(files[0]),
      },
      type
    );
  };

  const handleUpdateDomain = (domain) => {
    setDomain(domain);
  };

  const handleOnClickSetupDomain = (e) => {
    e.preventDefault();

    setNotificationPopUp({
      title: "Setup Domain",
      innerClassName: "notification_popup wide-popup",
      children: (
        <DomainSetup
          domain={domain}
          updateDomain={handleUpdateDomain}
          saveDomain={handleOnSubmit}
          close={() => setNotificationPopUp(false)}
        />
      ),
    });
  };

  const handleFormProviderChange = (e) => {
    const value = e.target.value;
    if (!formProvider) {
      setFormProvider(value);
      return;
    }
    setNotificationPopUp({
      title: "Alert!",
      children: (
        <div>
          <div>
            <p>
              This change might broke the existing forms!
              <br />
              Are you sure you want to change this?
            </p>
          </div>
          <div className={classes.actionWrapper}>
            <button
              onClick={() => {
                setFormProvider(value);
                setNotificationPopUp(false);
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setNotificationPopUp(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      ),
    });
  };

  return (
    // <root.div>
    //   <style>{generalStyles}</style>
    //   <style>{buttonsStyles}</style>
    //   <style>{formsStyles}</style>
    //   <style>{cmsStyles}</style>
    <div className={classes.container + " full_screen_control_bar"}>
      <div className="full_screen_control_bar-inner_wrapper">
        <form onSubmit={handleOnSubmit} ref={form}>
          <div className="full_row_wrapper halves border">
            <div className="full_option_wrapper">
              <div className="help_tip">
                <div className="tip_text">
                  This will appear as your site title on search engines and in
                  browser window tabs.
                </div>
              </div>

              <h1 className="full">Site title</h1>
              <input defaultValue={settings?.title} name="title" type="text" />
            </div>

            <div className="full_option_wrapper">
              <h1 className="full">Domain name</h1>
              <input
                type="text"
                value={domain}
                placeholder="No domain set"
                name="domain"
                readOnly
                className={classnames({
                  verified: isVerified,
                  "is-loading": isVerified === undefined && isPaying && domain,
                })}
              />
              <span />
            </div>

            <div className="full_option_wrapper domain-btn-wrapper">
              <button
                className="button domain-btn"
                disabled={!isPaying}
                onClick={handleOnClickSetupDomain}
              >
                {domain ? "Update domain" : "Setup domain"}
              </button>
              <button
                className={classnames("button domain-btn", {
                  "is-loading-dark-right": buildInProgress,
                })}
                onClick={handleVisitSite}
                disabled={
                  !isPaying || !settings.is_published || buildInProgress
                }
              >
                View Live Site
              </button>
            </div>
          </div>

          <div className="full_row_wrapper halves border">
            <div className="full_option_wrapper">
              <div className="help_tip">
                <div className="tip_text">
                  250px x 250px, transparent png ideal. This is the small icon
                  that appears in browser tabs and other previews.
                </div>
              </div>

              <h1 className="full">Favicon</h1>
              <div className={classes.faviconContainer}>
                <div className="img_preview" style={{ flexWrap: "nowrap" }}>
                  <label
                    htmlFor="file-input"
                    onClick={(e) => {
                      if (form.current.favicon.value) {
                        e.preventDefault();
                        handleOnClickShareImage(
                          { src: form.current.favicon.value },
                          "favicon"
                        );
                      }
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <ReactSVG
                      src={UploadIcon}
                      className="upload_icon svg replaced-svg"
                    />
                  </label>

                  <input
                    id="file-input"
                    onChange={(e) => handleOnChangeFileUpload(e, "favicon")}
                    style={{ display: "none" }}
                    type="file"
                  />
                  <input
                    defaultValue={settings?.favicon}
                    name="favicon"
                    type="text"
                    style={{ display: "none" }}
                  />
                </div>
                {settings?.fav_icon_loc && (
                  <img
                    alt="favicon of candidate site"
                    src={settings?.fav_icon_loc}
                  />
                )}
              </div>
            </div>

            <div className="full_option_wrapper">
              <h1 className="full">Pop-up on home page</h1>

              <div className="option_wrapper">
                <input
                  type="checkbox"
                  defaultChecked={settings?.popup === "on"}
                  className="toggle_button"
                  name="popup"
                ></input>
                <div className="toggle_label">Pop-up activate</div>
              </div>
            </div>
          </div>

          <div className="full_row_wrapper halves border">
            <h1 className="full">Meta tags</h1>

            <div className="full_option_wrapper">
              <div className="help_tip">
                <div className="tip_text">
                  This will show up on search engine previews and is also
                  important for search engine optimization.
                </div>
              </div>

              <h2>Meta Description</h2>
              <textarea
                defaultValue={settings?.meta_description}
                name="meta_description"
              />
            </div>

            <div className="full_option_wrapper">
              <div className="help_tip">
                <div className="tip_text">
                  Keywords are optional, and in some cases may assist with
                  search engine optimization.
                </div>
              </div>

              <h2>Meta Keywords</h2>
              <textarea
                defaultValue={settings?.meta_keywords}
                name="meta_keywords"
              />
            </div>
          </div>

          <div className="full_row_wrapper quarters border">
            <h1 className="full">Social Links</h1>

            <p>Must include &quot;http://&quot; or &quot;https://&quot;</p>

            <div className="full_option_wrapper">
              <h2>Facebook</h2>
              <input
                type="url"
                className={classes.formInput}
                defaultValue={settings?.social_link_facebook}
                name="social_link_facebook"
              />
            </div>

            <div className="full_option_wrapper">
              <h2>Twitter</h2>
              <input
                type="url"
                className={classes.formInput}
                defaultValue={settings?.social_link_twitter}
                name="social_link_twitter"
              />
            </div>

            <div className="full_option_wrapper">
              <h2>Instagram</h2>
              <input
                type="url"
                className={classes.formInput}
                defaultValue={settings?.social_link_instagram}
                name="social_link_instagram"
              />
            </div>

            <div className="full_option_wrapper">
              <h2>Video</h2>
              <input
                type="url"
                className={classes.formInput}
                defaultValue={settings?.social_link_youtube}
                name="social_link_youtube"
              />
            </div>
          </div>

          <div className="full_row_wrapper thirds border">
            <h1 className="full">Site sharing to social</h1>

            <div className="help_tip">
              <div className="tip_text">
                Define what appears when someone shares your site on social
                media.
              </div>
            </div>

            <div className="full_option_wrapper">
              <h2>Share name</h2>
              <textarea
                defaultValue={settings?.share_title}
                name="share_title"
              />
            </div>

            <div className="full_option_wrapper">
              <h2>Share Description</h2>
              <textarea
                defaultValue={settings?.share_description}
                name="share_description"
              />
            </div>

            <div className="full_option_wrapper">
              <h2>Share image</h2>
              <p>Image must crop to 1200 x 630</p>
              <div className={classes.shareImageContainer}>
                <div className="img_preview">
                  <div>
                    <label
                      htmlFor="file-input-share"
                      onClick={(e) => {
                        if (form.current.share_image.value) {
                          e.preventDefault();
                          handleOnClickShareImage(
                            { src: form.current.share_image.value },
                            "share"
                          );
                        }
                      }}
                    >
                      <ReactSVG
                        src={UploadIcon}
                        className="upload_icon svg replaced-svg"
                      />
                    </label>

                    <input
                      id="file-input-share"
                      onChange={(e) => handleOnChangeFileUpload(e, "share")}
                      style={{ display: "none" }}
                      type="file"
                    />
                    <input
                      defaultValue={settings?.share_image}
                      name="share_image"
                      type="text"
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                <div className={classes.shareImagePreviewContainer}>
                  <img
                    className={classes.shareImagePreview}
                    src={form.current?.share_image?.value}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="full_row_wrapper halves border">
            <h1 className="full">Forms</h1>
            <div className="full_option_wrapper">
              <h2>Form Provider</h2>
              <select
                name="formProvider"
                value={formProvider}
                onChange={handleFormProviderChange}
              >
                <option value="" disabled>
                  Please select form provider
                </option>
                <option value="mailchimp">Mailchimp</option>
                <option value="action_network">Action Network</option>
                <option value="google_forms">Google Sheet</option>
                <option value="ngpvan">NGPVan</option>
              </select>
            </div>
            {formProvider && (
              <div className="full_option_wrapper">
                {!(formProvider === "google_forms") && (
                  <>
                    <h2>Api Key</h2>
                    <input
                      type="text"
                      className={classes.formInput}
                      name="formApiKey"
                      defaultValue={settings.formApiKey}
                    />
                  </>
                )}
              </div>
            )}
          </div>

          <div className="full_row_wrapper thirds">
            <h1 className="full">Custom code</h1>

            <p>
              Warning: This feature can potentially break your site if not used
              correctly.
            </p>

            <div className="full_option_wrapper">
              <h2>Header</h2>
              <textarea defaultValue={settings?.header} name="header" />
            </div>

            <div className="full_option_wrapper">
              <h2>Top of Body Area</h2>
              <textarea defaultValue={settings?.body} name="body" />
            </div>

            <div className="full_option_wrapper">
              <h2>Footer</h2>
              <textarea defaultValue={settings?.footer} name="footer" />
            </div>
          </div>

          <div className="full_row_wrapper">
            <div className="button">
              <input
                className={classnames({
                  "is-loading": isLoading,
                })}
                type="submit"
                value="Update"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
    // </root.div>
  );
};

export default SiteSettings;
