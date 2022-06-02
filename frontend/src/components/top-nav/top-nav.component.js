import React from "react";

import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

import { useDispatch, useSelector } from "react-redux";

import AccoutnIcon from "@assets/images/cms/nav_icon-account.svg";
import BlocksIcon from "@assets/images/cms/nav_icon-blocks.svg";
import ColorEditorIcon from "@assets/images/cms/nav_icon-color_editor.svg";
import DesignSettingIcon from "@assets/images/cms/nav_icon-design_settings.svg";
import FontsIcon from "@assets/images/cms/font.svg";
import Logo from "@assets/images/cms/run_logo.png";
import LArrow from "@assets/images/cms/L_arrow_thick.svg";
import HelpIcon from "@assets/images/cms/nav_icon-help.svg";
import PagesIcon from "@assets/images/cms/nav_icon-pages.svg";
import SettingsIcon from "@assets/images/cms/nav_icon-page_settings.svg";
import SiteSettingIcon from "@assets/images/cms/nav_icon-site_settings.svg";
import { isSuperAdminSelector } from "@redux/selectors/auth";
import root from "react-shadow";
import generalStyles from "@styles/general.scss";
import cmsStyles from "@styles/cms_shadow.scss";
import { setIsShowPalletSidebar } from "@redux/slices/colorPallets";

const TopNav = () => {
  const activePage = useSelector((state) => state.site.activePage);
  const isSuperAdmin = useSelector(isSuperAdminSelector);

  const dispatch = useDispatch();

  const handleColorEditor = (e) => {
    dispatch(setIsShowPalletSidebar(true));
    e.preventDefault();
  };

  return (
    <root.div className="cms_top_nav_container">
      <style>{generalStyles}</style>
      <style>{cmsStyles}</style>
      <div className="cms_top_nav">
        <div className="run_logo">
          <img src={Logo} />
        </div>

        <div className="left_nav">
          <div className="tab page_name">
            <Link to={`/cms/page/${activePage?.id}/blocks`}>
              {activePage?.name}
            </Link>
            <img src={LArrow} wrapper="span" />
          </div>
          <div className="tab">
            <Link to={`/cms/page/${activePage?.id}/settings`}>
              <ReactSVG
                src={SettingsIcon}
                className="nav_icon svg"
                wrapper="span"
              />
              Page Settings
            </Link>
          </div>
          <div className="tab">
            <Link to={`/cms/page/${activePage?.id}/blocks`}>
              <ReactSVG
                src={BlocksIcon}
                className="nav_icon svg replaced-svg"
                wrapper="span"
              />
              Blocks
            </Link>
          </div>
        </div>

        <div className="right_nav">
          {isSuperAdmin && (
            <div className="tab">
              <a onClick={handleColorEditor}>
                <ReactSVG
                  src={ColorEditorIcon}
                  className="nav_icon svg"
                  wrapper="span"
                />
                Color Editor
              </a>
            </div>
          )}

          {isSuperAdmin && (
            <div className="tab">
              <Link to="/cms/font-settings">
                <ReactSVG
                  src={FontsIcon}
                  className="nav_icon svg"
                  wrapper="span"
                />
                Font Settings
              </Link>
            </div>
          )}

          <div className="tab">
            <Link to="/cms/design-settings">
              <ReactSVG
                src={DesignSettingIcon}
                className="nav_icon svg"
                wrapper="span"
              />
              Design Settings
            </Link>
          </div>

          <div className="tab">
            <Link to="/cms/pages">
              <ReactSVG
                src={PagesIcon}
                className="nav_icon svg"
                wrapper="span"
              />
              Pages
            </Link>
          </div>

          <div className="tab">
            <Link to="/cms/site-settings">
              <ReactSVG
                src={SiteSettingIcon}
                className="nav_icon svg"
                wrapper="span"
              />
              Site Settings
            </Link>
          </div>

          <div className="tab">
            <Link to="/cms/support">
              <ReactSVG
                src={HelpIcon}
                className="nav_icon svg"
                wrapper="span"
              />
            </Link>
          </div>

          <div className="tab">
            <Link to="/cms/account-settings">
              <ReactSVG
                src={AccoutnIcon}
                className="nav_icon svg"
                wrapper="span"
              />
              Account
            </Link>
          </div>
        </div>
      </div>
    </root.div>
  );
};

export default TopNav;
