import React, { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@redux/slices/auth";
import { saveSite } from "@redux/slices/site";

import useStyles from "./account-settings.style";

import classnames from "classnames";

import AccountSecurityForm from "@components/account-security-form/account-security-form.component";
import BillingForm from "@components/billing-form/billing-form.component";
import ProfileForm from "@components/profile-form/profile-form.component";

import { useNotificationPopUp } from "@components/notification-pop-up/notification-pop-up.component";
import { saveDataSelector } from "@redux/selectors/site";
import { setIsShowPalletSidebar } from "@redux/slices/colorPallets";

const AccountSettings = (props) => {
  const classes = useStyles(props);

  const dispatch = useDispatch();

  const block = useSelector(saveDataSelector);
  const siteId = useSelector((state) => state.site.settings?.id);

  const { setPopUp } = useNotificationPopUp();

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

  const handleOnClickConfirm = (e) => {
    e.preventDefault();

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
    dispatch(logout());
    dispatch(setIsShowPalletSidebar(false));
    setPopUp({ close: true });
  };

  const handleOnClickLogout = (e) => {
    e.preventDefault();

    setPopUp({
      title: "Log out?",
      children: (
        <>
          <p>
            You will lose any unsaved data. Are you sure you want to log out?
          </p>
          <button onClick={handleOnClickConfirm}>Confirm</button>
        </>
      ),
    });
  };

  return (
    <div className={classnames(classes.container, "full_screen_control_bar")}>
      <div className="full_screen_control_bar-inner_wrapper">
        <ProfileForm formInputClass={classes.formInput} />
        <AccountSecurityForm formInputClass={classes.formInput} />
        <BillingForm formInputClass={classes.formInput} />

        <button onClick={handleOnClickLogout}>Log out</button>
      </div>
    </div>
  );
};

export default AccountSettings;
