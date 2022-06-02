import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getSite,
  getSiteData,
  saveSite,
  setActivePage,
} from "@redux/slices/site";
import PropTypes from "prop-types";

import { PAGE_CATEGORIES } from "@constants";
import Loader from "@components/loader/loader.component";
import { useRouteMatch } from "react-router-dom";
import { isSuperAdminSelector } from "@redux/selectors/auth";
import { saveDataSelector } from "@redux/selectors/site";
import {
  setBodyFont,
  setButtonFont,
  getGoogleFontsMeta,
  setHeadlineFont,
  getFontSets,
} from "@redux/slices/design";
import { getColorPalettes } from "@redux/slices/colorPallets";
import publishedSiteToast from "@helpers/publishedSitePopup";
import { useNotificationPopUp } from "@components/notification-pop-up/notification-pop-up.component";
import { clearpopup } from "@redux/slices/auth";

const API_CALL_INTERVAL = 30000;

const Initialize = ({ children }) => {
  const dispatch = useDispatch();
  const isSuperAdmin = useSelector(isSuperAdminSelector);
  const block = useSelector(saveDataSelector);
  const matchParams = useRouteMatch({
    path: "/cms/page/:pageId/",
    strict: false,
    exact: false,
  });

  const initialPage = useSelector(
    (state) =>
      state.site.pages?.find(({ type }) => type === PAGE_CATEGORIES.HOME)
        .children[0]
  );

  const activePageId = useSelector((state) => state.site.activePage?.id);
  const showRegPopup = useSelector((state) => state.auth.showRegPopup);

  const [isRegPopupOpened, setIsRegPopupOpened] = useState(showRegPopup);

  const settings = useSelector((state) => state.site.settings);
  const siteId = useSelector((state) => state.site.settings?.id);
  const fontSets = useSelector((state) => state.design?.fontSets);
  const fontsSelected = useSelector((state) => !!state.design.headlineFont);
  const initialized = useSelector(
    (state) =>
      state.site.pages &&
      state.blockData.data &&
      state.design.fontSets &&
      (!isSuperAdmin || state.design?.gfontsMeta) &&
      activePageId
  );

  const colorPallets = useSelector((state) => state.colorPallets.colorPallets);
  const { setPopUp } = useNotificationPopUp();

  const buildStatus = useSelector((state) => state.site.status);

  useEffect(() => {
    dispatch(getSite());
  }, []);

  useEffect(() => {
    if (initialPage) {
      let id;

      if (matchParams && matchParams.params.pageId) {
        id = matchParams.params.pageId;
      } else if (!activePageId) {
        id = initialPage.id;
      }

      if (id && id !== activePageId)
        dispatch(setActivePage({ id, redirect: false }));
    }
  }, [dispatch, matchParams, initialPage, setActivePage]);

  useEffect(() => {
    const dataSourceIsAPI = process.env.REACT_APP_DATA_SOURCE === "API";

    if (siteId && !initialPage && dataSourceIsAPI) {
      dispatch(getSiteData({ siteId, isLive: false, overrideState: true }));
    }
  }, [dispatch, getSiteData, initialPage, siteId]);

  useEffect(() => {
    isSuperAdmin && dispatch(getGoogleFontsMeta());
    dispatch(getFontSets());
  }, []);

  useEffect(() => {
    if (initialized && !colorPallets.length) {
      dispatch(getColorPalettes());
    }
  }, [initialized]);

  useEffect(() => {
    if (initialized && !fontsSelected) {
      dispatch(setHeadlineFont(fontSets[0]));
      dispatch(setButtonFont(fontSets[0].button[0]));
      dispatch(setBodyFont(fontSets[0].body[0]));
    }
  }, [initialized, fontsSelected, fontSets]);

  useEffect(() => {
    let interval;
    if (initialized && fontsSelected && block) {
      interval = setInterval(() => {
        const data = {
          ...block,
          id: siteId,
        };

        dispatch(
          saveSite({
            data,
            isLive: false,
          })
        );
      }, API_CALL_INTERVAL);
    }

    return () => {
      clearInterval(interval);
    };
  }, [initialized, fontsSelected, block]);

  useEffect(() => {
    if (buildStatus === "published") {
      publishedSiteToast(settings, setPopUp, dispatch);
    }
  }, [buildStatus]);

  const handleOnClickConfirm = (e) => {
    e && e.preventDefault();
    setPopUp(undefined);
    dispatch(clearpopup());
    setIsRegPopupOpened(false);
  };

  useEffect(() => {
    if (showRegPopup) {
      setPopUp({
        title: "Welcome!",
        onClose: handleOnClickConfirm,
        children: (
          <>
            <p>
              Welcome to Run! Where all of your wildest dreams can come true!
            </p>
            <button onClick={handleOnClickConfirm}>Get Started!</button>
          </>
        ),
      });
    }
  }, [showRegPopup]);

  return initialized && fontsSelected && !isRegPopupOpened ? (
    children
  ) : (
    <Loader />
  );
};

Initialize.propTypes = {
  children: PropTypes.node,
};

export default Initialize;
