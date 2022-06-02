import React, { useState } from "react";
import { useSelector } from "react-redux";
import FontSet from "@components/font-set/font-set.component";
import IconAdd from "@assets/images/cms/add_icon.svg";
import { ReactSVG } from "react-svg";

const emptyFontSet = {
  body: [],
  button: [],
  headline: [],
  title: "",
};

const FontSettings = () => {
  const [showNewFontSet, setShowNewFontSet] = useState(false);
  const gfontsData = useSelector((state) => state.design?.gfontsMeta);
  const fontSetsData = useSelector((state) => state.design?.fontSets);

  return (
    <div className={"full_screen_control_bar"}>
      <div>
        <h1>Font Settings</h1>
        <h2>Font Sets</h2>
        <div className="fontSettings">
          <div className="headings">
            <div>
              <h3>Title</h3>
            </div>
            <div>
              <h3>Headline</h3>
            </div>
            <div>
              <h3>Body Copy</h3>
            </div>
            <div>
              <h3>Button</h3>
            </div>
          </div>
          {fontSetsData.map((fontSet) => (
            <FontSet
              key={fontSet.id}
              selectedData={fontSet}
              fontsData={gfontsData}
            />
          ))}
          {showNewFontSet && (
            <FontSet
              key={"newfont"}
              selectedData={emptyFontSet}
              fontsData={gfontsData}
              isNew
              hideNew={() => setShowNewFontSet(false)}
            />
          )}
        </div>
        {!showNewFontSet && (
          <a className="add_button_wrapper">
            <ReactSVG
              src={IconAdd}
              className="svg add_button"
              wrapper="span"
              onClick={() => setShowNewFontSet(true)}
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default FontSettings;
