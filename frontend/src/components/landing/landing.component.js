import React from "react";

import { Link } from "react-router-dom";

import marketingSiteStyles from "@styles/marketing_site.scss";

import { ReactSVG } from "react-svg";
import { Helmet } from "react-helmet-async";

import RunLogo from "@assets/images/marketing_site/run-logo.png";
import IconAccount from "@assets/images/marketing_site/icon-account.png";
import SiteExampleHome from "@assets/images/marketing_site/hero_site_example-home.png";
import SiteExampleMobile from "@assets/images/marketing_site/hero_site_example-mobile.png";
import CleanAndBold from "@assets/images/marketing_site/graphic-clean_and_bold.png";
import ReadyToGo from "@assets/images/marketing_site/graphic-ready_to_go.png";
import Connective from "@assets/images/marketing_site/graphic-connective.png";
import EasySetup from "@assets/images/marketing_site/graphic-easy_setup.png";
import RunPlainLogo from "@assets/images/marketing_site/run-plain-logo.png";
import Facebook from "@assets/images/marketing_site/social_icon-facebook.svg";
import Twitter from "@assets/images/marketing_site/social_icon-twitter.svg";
import Instagram from "@assets/images/marketing_site/social_icon-instagram.svg";

const Landing = () => {
  return (
    <div>
      <Helmet>
        <title>RUN! The web site builder for political campaigns</title>
        <style>{marketingSiteStyles}</style>
      </Helmet>

      <div className="hero">
        <img src={RunLogo} className="logo" />

        <nav>
          <div className="tab">
            <Link to="/register">Sign up</Link>
          </div>

          <div className="tab">
            <Link to="/login">
              Log in <img src={IconAccount} />
            </Link>
          </div>
        </nav>

        <div className="left_content">
          <h1>
            The site builder for progressive and Democratic political campaigns
          </h1>

          <Link className="main_button" to="/register">
            Start Free Trial
          </Link>
        </div>

        <div className="right_content">
          <img src={SiteExampleHome} className="hero_site_example-home" />

          <img src={SiteExampleMobile} className="hero_site_example-mobile" />
        </div>
      </div>

      {/* FEATURE GRID */}

      <div className="feature_grid">
        <div className="feature">
          <div className="feature_image_wrapper">
            <img src={CleanAndBold} />
          </div>

          <h2>Clean and Bold</h2>
          <p>Beautiful pre-designed websites, no designer required</p>
        </div>

        <div className="feature">
          <div className="feature_image_wrapper">
            <img src={ReadyToGo} />
          </div>

          <h2>Ready to Go</h2>
          <p>Packaged with the pages and modules campaigns need</p>
        </div>

        <div className="feature">
          <div className="feature_image_wrapper">
            <img src={Connective} className="smaller" />
          </div>

          <h2>Connective</h2>
          <p>
            Forms connect to NGP VAN, Action Network, Mailchimp and Google
            Sheets
          </p>
        </div>

        <div className="feature">
          <div className="feature_image_wrapper">
            <img src={EasySetup} />
          </div>

          <h2>Easy Setup</h2>
          <p>Setup in minutes, no technical knowledge needed</p>
        </div>
      </div>

      {/* ABOUT US */}

      <div className="about_us">
        <div className="left_column">
          <h2>We know what campaigns need. Because we’ve done it.</h2>

          <p>
            <b>
              RUN! is brought you by{" "}
              <a href="http://incitementdesign.com" target="_new">
                Incitement
              </a>
              ,
            </b>{" "}
            a design agency focused on supporting progressive and Democratic
            campaigns.
          </p>

          <p>
            For years we’ve designed and built sites for campaigns ranging from
            Gavin Newsom for Governor all the way down to smaller local races.
            We know what campaigns really need to succeed.
          </p>

          <p>
            <b>Campaigns today are caught between two extremes:</b> either hire
            an expensive firm to make a professional site or take their chances
            on generic site builders not geared towards their needs.
          </p>

          <p>
            <b>RUN! is here to bridge the gap</b>–providing high quality sites
            at a price campaigns can afford.
          </p>

          <br />
          <Link className="main_button" to="/register">
            Start Free Trial
          </Link>
        </div>

        <div className="right_column"></div>
      </div>

      {/* PRICING */}

      <div className="pricing">
        <h2>RUN! is completely free until you decide to launch</h2>

        <p>
          <b>Everything included for a one-time payment of $1950</b>
          <br />+ $50 monthly hosting fee after first year
        </p>

        <Link className="main_button" to="/register">
          Get Started
        </Link>

        <p>
          Sorry, RUN! is <b>not available</b> to Republican Party candidates.
        </p>
      </div>

      {/* FOOTER */}

      <div className="footer">
        <b>Questions?</b> Reach out to us at{" "}
        <a href="mailto:info@designedtorun.com">info@designedtorun.com</a>
        <div className="social_icons">
          <a
            href="https://www.facebook.com/incitementdesign/"
            target="_blank"
            rel="noreferrer"
          >
            <ReactSVG src={Facebook} className="svg" wrapper="span" />
          </a>
          <a
            href="https://www.instagram.com/incitementdesign/"
            target="_blank"
            rel="noreferrer"
          >
            <ReactSVG src={Instagram} className="svg" wrapper="span" />
          </a>
          <a
            href="https://twitter.com/WeAreIncitement/"
            target="_blank"
            rel="noreferrer"
          >
            <ReactSVG src={Twitter} className="svg" wrapper="span" />
          </a>
        </div>
        <img src={RunPlainLogo} className="logo-plain" />
      </div>
    </div>
  );
};

export default Landing;
