import React from "react";

import { useParams } from "react-router-dom";

import { ReactSVG } from "react-svg";
import SettingsIcon from "@assets/images/cms/nav_icon-page_settings.svg";

import { useDispatch, useSelector } from "react-redux";

import { pageSelector } from "@redux/selectors/site";
import { updatePage } from "@redux/slices/site";

const PageSettings = () => {
  const dispatch = useDispatch();

  const { pageId } = useParams();

  const data = useSelector((state) => pageSelector({ state, pageId }));
  const { settings } = data;

  const onChangeTextInput = (e, propName) => {
    e.preventDefault();

    dispatch(
      updatePage({
        ...data,
        settings: {
          ...settings,
          [propName]: e.target.value,
        },
      })
    );
  };
  return (
    <div>
      <div className="block-img">
        <ReactSVG src={SettingsIcon} wrapper="span" />
      </div>
      <h1 className="big">Page Settings</h1>
      <div>
        <h2>Home Page</h2>
        <h4>Page URL slug</h4>
        <input
          type="text"
          value={settings["slug"]}
          onChange={(e) => onChangeTextInput(e, "slug")}
        />
        <h4>Browser window / Search engine title</h4>
        <input
          type="text"
          value={settings["title"]}
          onChange={(e) => onChangeTextInput(e, "title")}
        />
      </div>
      <hr className="big_grey" />

      <div>
        <h2>SEO</h2>
        <h4>Meta Title</h4>
        <textarea
          className="border_none"
          value={settings["meta_title"]}
          onChange={(e) => onChangeTextInput(e, "meta_title")}
        />
        <h4>Meta Decription</h4>
        <textarea
          className="border_none"
          value={settings["meta_description"]}
          onChange={(e) => onChangeTextInput(e, "meta_description")}
        />
      </div>
      <hr className="big_grey" />
      <div>
        <h2>Custom Code</h2>
        <h4>Header Code</h4>
        <textarea
          className="border_none"
          value={settings["header"]}
          onChange={(e) => onChangeTextInput(e, "header")}
        />
        <h4>Top of body section</h4>
        <textarea
          className="border_none"
          value={settings["body"]}
          onChange={(e) => onChangeTextInput(e, "body")}
        />
        <h4>Footer code</h4>
        <textarea
          className="border_none"
          value={settings["footer"]}
          onChange={(e) => onChangeTextInput(e, "footer")}
        />
      </div>
    </div>
  );
};

export default PageSettings;
