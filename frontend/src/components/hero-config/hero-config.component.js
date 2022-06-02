import React, { useCallback } from "react";
import PropTypes from "prop-types";

import UploadButtonIcon from "@assets/images/cms/upload_button.svg";
import HeroIconStandart from "@assets/images/cms/hero_icon-standard.svg";
import HeroIconGradient from "@assets/images/cms/hero_icon-gradient.svg";
import HeroIconAngled from "@assets/images/cms/hero_icon-angled.svg";

import HeroIconFullWidthImage from "@assets/images/cms/hero_icon-full_width_image.svg";
import HeroIconVideo from "@assets/images/cms/hero_icon-video.svg";
import HeroIconFloatingImage from "@assets/images/cms/hero-icon-floating_image.svg";
import HeroIconNoImage from "@assets/images/cms/hero_icon-no_image.svg";
import TextButtonBigLogo from "@assets/images/cms/text_button-big_logo.svg";
import TextButtonHeadline from "@assets/images/cms/text_button-headline.svg";
import HeroFormIconGrid from "@assets/images/cms/hero_form_icon-grid.svg";
import HeroFormIconBar from "@assets/images/cms/hero_form_icon-bar.svg";
import HeroFormIconNone from "@assets/images/cms/hero_form_icon-none.svg";
import ButtonStyleIconNone from "@assets/images/cms/button_style_icon-none.svg";
import ButtonStyleIconUnderlined from "@assets/images/cms/button_icon_style-underlined.svg";
import ButtonStyleIconBoxed from "@assets/images/cms/button_icon_style-boxed.svg";
import SocialIconNone from "@assets/images/cms/social_icon_style-none.svg";
import SocialIconSolid from "@assets/images/cms/social_icon_style-solid.svg";
import SocialIconOutlined from "@assets/images/cms/social_icon_style-outlined.svg";

// import RadioIcon from "@assets/images/radio_button.svg";
import { ReactSVG } from "react-svg";
import classnames from "classnames";

import { useDispatch, useSelector } from "react-redux";
import {
  blockDataSelector,
  activePageSelector,
  homePageSelector,
} from "@redux/selectors/site";
import { setDataItem } from "@redux/slices/blockData";

import { useImageUploadPopUp } from "@components/image-upload-modal/image-upload-modal.component";
import Slider from "@components/slider/slider.component";

const HASH = {
  GRADIENT: "gradient_box",
  STANDARD: "standard_box",
  ANGLED: "angled_box",
  FULL_WIDTH: "full_width_image",
  FLOATING: "floating_image",
  VIDEO: "video_image",
  NO_IMAGE: "no_image",
};

const HeroConfig = ({ block }) => {
  const dispatch = useDispatch();
  const setPopUp = useImageUploadPopUp();
  const page = useSelector((state) => activePageSelector({ state }));
  const homePage = useSelector((state) => homePageSelector({ state }));
  const isHome = page.id === homePage.id;
  const layoutPropName = isHome ? "layoutType" : "internalPagesLayoutType";

  const { sharedData: sharedDataId, data: uniqueDataId } = block;

  const sharedBlockData = useSelector((state) =>
    blockDataSelector({ state, data: sharedDataId })
  );
  const uniqueBlockData = useSelector((state) =>
    blockDataSelector({ state, data: uniqueDataId })
  );
  let images = {};
  if (!isHome) {
    if (!uniqueBlockData.splitImage)
      images.splitImage = sharedBlockData.splitImage;
    if (!uniqueBlockData.fullImage)
      images.fullImage = sharedBlockData.fullImage;
    if (!uniqueBlockData.mobileImage)
      images.mobileImage = sharedBlockData.mobileImage;
  }

  const consolidatedBlockData = {
    ...sharedBlockData,
    ...uniqueBlockData,
    ...images,
  };

  const svgInjector = (svg, savedValue, value) => {
    const classes = ["svg"];
    if (savedValue === value) classes.push("selected");
    svg.style.maxWidth = "none";
    svg.classList.add(...classes);
  };

  const setValue = (value, isUnique = false) => {
    const updatedData = isUnique
      ? {
          ...uniqueBlockData,
          ...value,
        }
      : {
          ...sharedBlockData,
          ...value,
        };
    dispatch(setDataItem(updatedData));
  };

  const handleLayoutChange = useCallback(
    (layout) => {
      const alternateLayoutPropName = !isHome
        ? "layoutType"
        : "internalPagesLayoutType";

      let dataToUpdate = {};
      dataToUpdate[layoutPropName] = layout;
      const split = [HASH.STANDARD, HASH.ANGLED, HASH.GRADIENT];

      if (
        split.includes(layout) &&
        split.includes(consolidatedBlockData[alternateLayoutPropName])
      ) {
        if (layout !== consolidatedBlockData[alternateLayoutPropName]) {
          dataToUpdate[alternateLayoutPropName] = layout;
        }
      }
      setValue(dataToUpdate);
    },
    [consolidatedBlockData]
  );

  const handleOnUploadSuccess = (
    { mediaUrl, originalImageUrl },
    type,
    caller,
    isUnique
  ) => {
    if (caller === "mobile") {
      setValue(
        {
          mobileImage: mediaUrl,
          originalMobileImage:
            originalImageUrl ||
            (isUnique
              ? uniqueBlockData.originalMobileImage
              : sharedBlockData.originalMobileImage),
        },
        isUnique
      );
    } else if (caller === "logo") {
      setValue(
        {
          logo: mediaUrl,
          originalLogo:
            originalImageUrl ||
            (isUnique
              ? uniqueBlockData.originalLogo
              : sharedBlockData.originalLogo),
        },
        isUnique
      );
    } else if (
      type === HASH.GRADIENT ||
      type === HASH.ANGLED ||
      type === HASH.STANDARD
    ) {
      setValue(
        {
          splitImage: mediaUrl,
          originalSplitImage:
            originalImageUrl ||
            (isUnique
              ? uniqueBlockData.originalSplitImage
              : sharedBlockData.originalSplitImage),
        },
        isUnique
      );
    } else if (type === HASH.FULL_WIDTH) {
      setValue(
        {
          fullImage: mediaUrl,
          originalFullImage:
            originalImageUrl ||
            (isUnique
              ? uniqueBlockData.originalFullImage
              : sharedBlockData.originalFullImage),
        },
        isUnique
      );
    } else if (type === HASH.FLOATING || type === HASH.VIDEO) {
      setValue(
        {
          floatImage: mediaUrl,
          originalFloatImage:
            originalImageUrl ||
            (isUnique
              ? uniqueBlockData.originalFloatImage
              : sharedBlockData.originalFloatImage),
        },
        isUnique
      );
    }

    setPopUp({ close: true });
  };

  const invokeImageUploadPopup = ({ src, caller, isUnique, file }) => {
    const type = consolidatedBlockData[layoutPropName];

    let options = {
      enableCrop: true,
      onUploadSuccess: (data) =>
        handleOnUploadSuccess(data, type, caller, isUnique, src),
      src,
      orignalFile: file,
    };

    if (caller === "mobile") {
      options = {
        ...options,
        imgDimensions: {
          left: 0,
          top: 0,
          width: 1200,
          height: 1200,
        },
        title: "Mobile Image",
      };
    } else if (caller === "logo") {
      options = {
        ...options,
        imgDimensions: {
          left: 0,
          top: 0,
          width: 1000,
          height: 500,
        },
        title: "Logo Image",
      };
    } else if (
      type === HASH.GRADIENT ||
      type === HASH.ANGLED ||
      type === HASH.STANDARD
    ) {
      // Split images
      options = {
        ...options,
        imgDimensions: {
          left: 0,
          top: 0,
          width: 845,
          height: 1000,
        },
        title: "Split Image",
      };
    } else if (type === HASH.FULL_WIDTH) {
      // Full width images
      options = {
        ...options,
        imgDimensions: {
          left: 0,
          top: 0,
          width: 1500,
          height: 990,
        },
        title: "Full width Image",
      };
    } else if (type === HASH.FLOATING || type === HASH.VIDEO) {
      // Floating/video images
      options = {
        ...options,
        imgDimensions: {
          left: 0,
          top: 0,
          width: 1000,
          height: 700,
        },
        title: "Floating/Video Image",
      };
    }
    setPopUp(options);
  };

  const handleOnChangeFileUpload = (e, type, isUnique) => {
    const { files } = e.target;

    if (files && files.length === 0) {
      return;
    }

    invokeImageUploadPopup({
      src: URL.createObjectURL(files[0]),
      file: files[0],
      caller: type,
      isUnique,
    });
    e.target.value = "";
  };

  const handleOnClickUpload = (e, caller, isUnique) => {
    const type = consolidatedBlockData[layoutPropName];
    let imgUrl;
    if (caller === "mobile") {
      imgUrl = isUnique
        ? uniqueBlockData.originalMobileImage
        : sharedBlockData.originalMobileImage;
    } else if (caller === "logo") {
      imgUrl = consolidatedBlockData.originalLogo;
    } else if (
      type === HASH.GRADIENT ||
      type === HASH.ANGLED ||
      type === HASH.STANDARD
    ) {
      imgUrl = isUnique
        ? uniqueBlockData.originalSplitImage
        : sharedBlockData.originalSplitImage;
    } else if (type === HASH.FULL_WIDTH) {
      imgUrl = isUnique
        ? uniqueBlockData.originalFullImage
        : sharedBlockData.originalFullImage;
    } else if (type === HASH.FLOATING || type === HASH.VIDEO) {
      imgUrl = isUnique
        ? uniqueBlockData.originalFloatImage
        : sharedBlockData.originalFloatImage;
    }
    if (imgUrl) {
      e.preventDefault();
      invokeImageUploadPopup({
        src: imgUrl,
        caller,
        isUnique,
      });
    }
  };

  const imageUploadJSX = (isUnique) => {
    const rand = Math.random(50000);
    const randMobile = Math.random(50000);

    return (
      <div className="option_wrapper icon_row two">
        <div className="img_select_wrapper">
          <div className="option_side_label">Hero image</div>
          <div className="img_preview">
            <label htmlFor={`file-input-${rand}`}>
              <ReactSVG
                src={UploadButtonIcon}
                beforeInjection={(svg) => {
                  svg.classList.add("svg", "upload_icon");
                }}
                onClick={(e) => handleOnClickUpload(e, "hero", isUnique)}
              />
            </label>
            <input
              id={`file-input-${rand}`}
              onChange={(e) => handleOnChangeFileUpload(e, "hero", isUnique)}
              style={{ display: "none" }}
              type="file"
            />
          </div>
        </div>

        <div className="img_select_wrapper">
          <div className="option_side_label">Mobile version</div>
          <div className="img_preview">
            <label
              htmlFor={`file-input-mobile-${randMobile}`}
              onClick={(e) => handleOnClickUpload(e, "mobile", isUnique)}
            >
              <ReactSVG
                src={UploadButtonIcon}
                beforeInjection={(svg) => {
                  svg.classList.add("svg", "upload_icon");
                }}
              />
            </label>
            <input
              id={`file-input-mobile-${randMobile}`}
              onChange={(e) => handleOnChangeFileUpload(e, "mobile", isUnique)}
              style={{ display: "none" }}
              type="file"
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {isHome && (
        <>
          <div
            className={classnames(
              "option_wrapper with_logo",
              consolidatedBlockData.bgColor
            )}
          >
            <label htmlFor="file-input-logo">
              <img src={consolidatedBlockData.logo} className="big_logo" />
            </label>
            <input
              id="file-input-logo"
              onChange={(e) => handleOnChangeFileUpload(e, "logo")}
              style={{ display: "none" }}
              type="file"
            />
          </div>
          <h2>Background color</h2>

          <div className="option_wrapper">
            <div
              className={classnames("swatch_option yellow", {
                selected: consolidatedBlockData.bgColor === "yellow",
              })}
              onClick={() => {
                setValue({
                  bgColor: "yellow",
                });
              }}
            />
            <div
              className={classnames("swatch_option teal", {
                selected: consolidatedBlockData.bgColor === "teal",
              })}
              onClick={() => {
                setValue({
                  bgColor: "teal",
                });
              }}
            />
            <div
              className={classnames("swatch_option blue", {
                selected: consolidatedBlockData.bgColor === "blue",
              })}
              onClick={() => {
                setValue({
                  bgColor: "blue",
                });
              }}
            />
            <div
              className={classnames("swatch_option white", {
                selected: consolidatedBlockData.bgColor === "white",
              })}
              onClick={() => {
                setValue({
                  bgColor: "white",
                });
              }}
            />
          </div>

          <hr className="big" />
        </>
      )}
      {!isHome && (
        <>
          <h2>{page.name} Page</h2>
          <div className="option_wrapper">
            <input
              type="checkbox"
              className="toggle_button"
              checked={consolidatedBlockData.showImage}
              onChange={() =>
                setValue(
                  {
                    showImage: !consolidatedBlockData.showImage,
                  },
                  true
                )
              }
            ></input>
            <div className="toggle_label">No Image</div>
          </div>
          {imageUploadJSX(true)}
          <hr className="small" />

          <div className="block_config" style={{ padding: 0 }}>
            <span
              className={classnames("block_option", {
                selected: consolidatedBlockData.headlineOn,
              })}
              onClick={() => {
                setValue(
                  {
                    headlineOn: true,
                  },
                  true
                );
              }}
            >
              HEADLINE
            </span>
            <span
              className={classnames("block_option", {
                selected: !consolidatedBlockData.headlineOn,
              })}
              onClick={() => {
                setValue(
                  {
                    headlineOn: false,
                  },
                  true
                );
              }}
            >
              PAGENAME
            </span>
          </div>
          <hr className="big" />
        </>
      )}
      <h2>{isHome ? "Header Layout" : "Inner page headers"}</h2>

      {isHome && (
        <div className="option_wrapper">
          <input
            type="checkbox"
            className="toggle_button"
            checked={consolidatedBlockData.flipContent}
            onChange={() =>
              setValue({
                flipContent: !consolidatedBlockData.flipContent,
              })
            }
          ></input>
          <div className="toggle_label">Flip content</div>
        </div>
      )}
      <div className="option_wrapper icon_row tall_icons">
        <ReactSVG
          src={HeroIconStandart}
          beforeInjection={(svg) => {
            svgInjector(
              svg,
              consolidatedBlockData[layoutPropName],
              "standard_box"
            );
          }}
          onClick={() => handleLayoutChange("standard_box")}
        />
        <ReactSVG
          src={HeroIconGradient}
          beforeInjection={(svg) => {
            svgInjector(
              svg,
              consolidatedBlockData[layoutPropName],
              "gradient_box"
            );
          }}
          onClick={() => handleLayoutChange("gradient_box")}
        />
        <ReactSVG
          src={HeroIconAngled}
          beforeInjection={(svg) => {
            svgInjector(
              svg,
              consolidatedBlockData[layoutPropName],
              "angled_box"
            );
          }}
          onClick={() => handleLayoutChange("angled_box")}
        />
      </div>

      <div className="option_wrapper icon_row tall_icons">
        <ReactSVG
          src={HeroIconFullWidthImage}
          beforeInjection={(svg) => {
            svgInjector(
              svg,
              consolidatedBlockData[layoutPropName],
              "full_width_image"
            );
          }}
          onClick={() => handleLayoutChange("full_width_image")}
        />
        {isHome && (
          <>
            <ReactSVG
              src={HeroIconVideo}
              beforeInjection={(svg) => {
                svgInjector(
                  svg,
                  consolidatedBlockData[layoutPropName],
                  "video_image"
                );
              }}
              onClick={() => handleLayoutChange("video_image")}
            />
            <ReactSVG
              src={HeroIconFloatingImage}
              beforeInjection={(svg) => {
                svgInjector(
                  svg,
                  consolidatedBlockData[layoutPropName],
                  "floating_image"
                );
              }}
              onClick={() => handleLayoutChange("floating_image")}
            />
          </>
        )}
        <ReactSVG
          src={HeroIconNoImage}
          beforeInjection={(svg) => {
            svgInjector(svg, consolidatedBlockData[layoutPropName], "no_image");
          }}
          onClick={() => handleLayoutChange("no_image")}
        />
      </div>

      {consolidatedBlockData[layoutPropName] !== HASH.NO_IMAGE &&
        isHome &&
        imageUploadJSX(true)}
      {consolidatedBlockData[layoutPropName] === HASH.VIDEO && (
        <div className="option_wrapper">
          {/* <div className="radio_wrapper">
            <input type="radio" id="vimeo" name="same" value="" checked />
            <ReactSVG src={RadioIcon} className="svg" />
            <label htmlFor="vimeo">Vimeo</label>
          </div>

          <div className="radio_wrapper">
            <input type="radio" id="youtube" name="same" value="" checked />
            <ReactSVG src={RadioIcon} className="svg" />
            <label htmlFor="youtube">YouTube</label>
          </div> */}

          <div className="input_wrapper">
            <label>Video embed code</label>
            <input
              type="text"
              value={uniqueBlockData.embedCode || ""}
              onChange={(e) =>
                setValue(
                  {
                    embedCode: e.target.value,
                  },
                  true
                )
              }
            />
          </div>
        </div>
      )}
      {isHome && (
        <>
          <hr className="small" />

          <div className="option_wrapper icon_row short_icons two">
            <ReactSVG
              src={TextButtonHeadline}
              beforeInjection={(svg) => {
                svgInjector(svg, consolidatedBlockData.headlineOn, true);
              }}
              onClick={() => {
                setValue(
                  {
                    headlineOn: true,
                  },
                  true
                );
              }}
            />
            <ReactSVG
              src={TextButtonBigLogo}
              beforeInjection={(svg) => {
                svgInjector(svg, consolidatedBlockData.headlineOn, false);
              }}
              onClick={() => {
                setValue(
                  {
                    headlineOn: false,
                  },
                  true
                );
              }}
            />
          </div>

          <hr className="small" />

          <div className="option_wrapper icon_row short_icons three">
            <ReactSVG
              src={HeroFormIconGrid}
              beforeInjection={(svg) => {
                svgInjector(svg, consolidatedBlockData.formType, "grid_form");
              }}
              onClick={() => {
                setValue({
                  formType: "grid_form",
                });
              }}
            />
            <ReactSVG
              src={HeroFormIconBar}
              beforeInjection={(svg) => {
                svgInjector(svg, consolidatedBlockData.formType, "bar_form");
              }}
              onClick={() => {
                setValue({
                  formType: "bar_form",
                });
              }}
            />
            <ReactSVG
              src={HeroFormIconNone}
              beforeInjection={(svg) => {
                svgInjector(svg, consolidatedBlockData.formType, "");
              }}
              onClick={() => {
                setValue({
                  formType: "",
                });
              }}
            />
          </div>

          <div className="option_wrapper">
            <input
              type="checkbox"
              className="toggle_button"
              checked={consolidatedBlockData.disclaimerOn}
              onChange={() =>
                setValue({
                  disclaimerOn: !consolidatedBlockData.disclaimerOn,
                })
              }
            ></input>
            <div className="toggle_label">Legal disclaimer</div>
          </div>

          <hr className="small" />

          <div className="option_wrapper three icon_row short_icons">
            <ReactSVG
              src={ButtonStyleIconNone}
              beforeInjection={(svg) => {
                svgInjector(svg, consolidatedBlockData.buttonType, "");
              }}
              onClick={() => {
                setValue({
                  buttonType: "",
                });
              }}
            />
            <ReactSVG
              src={ButtonStyleIconUnderlined}
              beforeInjection={(svg) => {
                svgInjector(
                  svg,
                  consolidatedBlockData.buttonType,
                  "underlined"
                );
              }}
              onClick={() => {
                setValue({
                  buttonType: "underlined",
                });
              }}
            />
            <ReactSVG
              src={ButtonStyleIconBoxed}
              beforeInjection={(svg) => {
                svgInjector(svg, consolidatedBlockData.buttonType, "boxed");
              }}
              onClick={() => {
                setValue({
                  buttonType: "boxed",
                });
              }}
            />
          </div>

          <hr className="small" />

          <div className="option_wrapper three icon_row tall_icons">
            <ReactSVG
              src={SocialIconNone}
              beforeInjection={(svg) => {
                svgInjector(svg, consolidatedBlockData.socialIconsType, "");
              }}
              onClick={() => {
                setValue({
                  socialIconsType: "",
                });
              }}
            />
            <ReactSVG
              src={SocialIconSolid}
              beforeInjection={(svg) => {
                svgInjector(
                  svg,
                  consolidatedBlockData.socialIconsType,
                  "filled"
                );
              }}
              onClick={() => {
                setValue({
                  socialIconsType: "filled",
                });
              }}
            />
            <ReactSVG
              src={SocialIconOutlined}
              beforeInjection={(svg) => {
                svgInjector(
                  svg,
                  consolidatedBlockData.socialIconsType,
                  "bordered"
                );
              }}
              onClick={() => {
                setValue({
                  socialIconsType: "bordered",
                });
              }}
            />
          </div>

          <div className="option_wrapper">
            <input
              type="checkbox"
              className="toggle_button"
              checked={consolidatedBlockData.socialBelowContentOn}
              onChange={() =>
                setValue({
                  socialBelowContentOn:
                    !consolidatedBlockData.socialBelowContentOn,
                })
              }
            ></input>
            <div className="toggle_label">Below content</div>
          </div>

          <hr className="small" />

          <div className="option_wrapper">
            <div className="slider_label">Header Gradient Opacity</div>
            <Slider
              min={0}
              max={100}
              values={[consolidatedBlockData.headerGradientOpacity]}
              onChange={(values) =>
                setValue({ headerGradientOpacity: values[0] })
              }
            />
          </div>
        </>
      )}
      {!isHome && (
        <>
          <hr className="small" />
          <p>
            Default images for inner pages which do not have images selected
          </p>
          {imageUploadJSX(false)}
        </>
      )}
    </>
  );
};

HeroConfig.propTypes = {
  block: PropTypes.shape(),
};

export default HeroConfig;
