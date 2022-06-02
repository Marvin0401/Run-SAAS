import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { useDispatch, useSelector } from "react-redux";

import { saveDataSelector } from "@redux/selectors/site";
import {
  getSiteData,
  publishSite,
  saveSite,
  updateSiteSettings,
} from "@redux/slices/site";

import { useNotificationPopUp } from "@components/notification-pop-up/notification-pop-up.component";
import root from "react-shadow";
import generalStyles from "@styles/general.scss";
import cmsStyles from "@styles/cms_shadow.scss";
import buttonsStyles from "@styles/buttons.scss";

const Footer = ({ handleMobileView }) => {
  const dispatch = useDispatch();

  const isColorEditorActive = useSelector(
    (state) => state.colorPallets.isShowPalletSidebar
  );

  const { setPopUp } = useNotificationPopUp();

  const buildInProgress = useSelector((state) => state.site.buildInProgress);

  const settings = useSelector((state) => state.site.settings);

  const block = useSelector(saveDataSelector);
  const siteId = useSelector((state) => state.site.settings?.id);
  const domain = useSelector((state) => state.site.settings?.domain || "");
  // const isPaying = useSelector((state) => state.auth.user?.is_paying);

  const handleOnClickConfirmRevert = () => {
    // Revert to the live data
    dispatch(getSiteData({ siteId, isLive: true, overrideState: true })).then(
      (res) => {
        dispatch(
          saveSite({
            data: res.payload?.data[0],
            isLive: false,
          })
        );
      }
    );
    setPopUp({ close: true });
  };

  const handleOnClickPublish = () => {
    dispatch(
      publishSite({
        data: {
          data: block,
          domain,
          siteId,
          template: "gatsby-test",
          isProduction: !!domain,
        },
      })
    ).then(() => {
      if (!settings.is_published || !settings.is_domain_live) {
        dispatch(
          updateSiteSettings({
            data: {
              is_published: true,
              is_domain_live: true,
            },
            id: settings.id,
          })
        );
      }
    });

    const data = {
      ...block,
      id: siteId,
    };

    dispatch(
      saveSite({
        data,
        isLive: true,
      })
    );

    dispatch(
      saveSite({
        data,
        isLive: false,
      })
    );
  };

  const handleOnClickRevert = () => {
    setPopUp({
      title: "Erase edits?",
      children: (
        <>
          <p>Your site will revert back to your last save point.</p>
          <button onClick={handleOnClickConfirmRevert}>Revert</button>
        </>
      ),
    });
  };

  const handleOnClickViewSite = () => {
    let url = "";
    // TODO: check the correct usage of is_domain_live
    if (settings.domain && settings.is_domain_live) {
      url = `https://${settings.domain}`;
    } else {
      url = `https://${settings.id}.designedtorun.com`;
    }
    window.open(url, "_target");
  };

  return (
    <root.div
      className={classnames("cms_bottom_nav_container main-control-container", {
        color_editor_active: isColorEditorActive,
      })}
    >
      <style>{generalStyles}</style>
      <style>{buttonsStyles}</style>
      <style>{cmsStyles}</style>

      <div className="cms_bottom_nav">
        <div className="bottom_nav_left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9.34"
            height="17.22"
            viewBox="0 0 9.34 17.22"
            className="view_icon svg replaced-svg"
            onClick={() => handleMobileView(true)}
          >
            <g id="aa1a5b84-4526-49ac-81f6-58458e39aaa0" data-name="Layer 2">
              <g id="a2f66d1c-52ba-47a5-80e1-a7926cfb7ab5" data-name="Layer 1">
                <path
                  d="M8.46,0H.88A.87.87,0,0,0,0,.88V16.34a.88.88,0,0,0,.88.88H8.46a.89.89,0,0,0,.88-.88V.88A.88.88,0,0,0,8.46,0ZM4.67,16.18a.73.73,0,1,1,0-1.46.73.73,0,0,1,0,1.46Zm3.71-2.53H1V1H8.38Z"
                  fill="#59596b"
                ></path>
              </g>
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20.03"
            height="17.54"
            viewBox="0 0 20.03 17.54"
            className="view_icon svg replaced-svg"
            onClick={() => handleMobileView(false)}
          >
            <g id="aa3561da-664f-4bee-8725-c9a86b4fcac8" data-name="Layer 2">
              <g id="bf825f3f-a5b0-4962-9529-50f1e57b4fca" data-name="Layer 1">
                <path
                  d="M19,0H1A1,1,0,0,0,0,1V13.43a1,1,0,0,0,1,1H7.47V16.1H5.19v1.44h9.65V16.1H12.55V14.42H19a1,1,0,0,0,1-1V1A1,1,0,0,0,19,0Zm-.15,13.22H1.14v-12H18.88Z"
                  fill="#59596b"
                ></path>
              </g>
            </g>
          </svg>
        </div>

        <div className="bottom_nav_right">
          <button
            onClick={handleOnClickRevert}
            className={classnames({
              "is-loading-dark": buildInProgress,
            })}
            disabled={buildInProgress}
          >
            REVERT
          </button>
          <button
            onClick={handleOnClickViewSite}
            disabled={!settings.is_published || buildInProgress}
          >
            VIEW LIVE SITE
          </button>
          <button onClick={handleOnClickPublish} disabled={buildInProgress}>
            PUBLISH EDITS
          </button>
        </div>
      </div>
    </root.div>
  );
};

Footer.propTypes = {
  style: PropTypes.object,
  handleMobileView: PropTypes.func,
};

export default Footer;
