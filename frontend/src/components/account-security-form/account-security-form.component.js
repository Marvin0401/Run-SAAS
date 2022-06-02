import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import classnames from "classnames";

import PasswordStrengthBar from "react-password-strength-bar";

import { useDispatch, useSelector } from "react-redux";
import { updatePassword, logout } from "@redux/slices/auth";
import { saveSite } from "@redux/slices/site";
import { saveDataSelector } from "@redux/selectors/site";

const AccountSecurityForm = ({ formInputClass }) => {
  const form = useRef(null);

  const passwordRef = useRef(null);

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.status === "loading");
  // const { custID: user_id } = useSelector((state) => state.auth.user);
  const siteId = useSelector((state) => state.site.settings?.id);
  const block = useSelector(saveDataSelector);

  const validate = () => {
    return form.current.reportValidity();
  };

  const handleOnChangeScore = (score, feedback) => {
    if (passwordRef.current == null) return;
    if (score > 2) {
      passwordRef.current.setCustomValidity("");
    } else {
      passwordRef.current.setCustomValidity(
        feedback.warning || "Weak password"
      );
    }
  };

  const handleConfirmPassword = (e) => {
    let event = e.target.value;
    if (password !== event) {
      e.target.setCustomValidity("Password not matched");
    } else {
      e.target.setCustomValidity("");
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      dispatch(
        updatePassword({
          data: {
            old_password: e.target.current_password.value,
            new_password: e.target.new_password.value,
          },
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setTimeout(() => {
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
          }, 2000);
        }
      });

      setPassword("");
      form.current.reset();

      document.querySelectorAll(`.touched`).forEach((el) => {
        el.classList.remove("touched");
      });
    }
  };

  return (
    <form onSubmit={handleOnSubmit} ref={form} className="acc-sec-form">
      <div className="full_row_wrapper halves border">
        <h1 className="full">Account Security</h1>

        <div className="full_option_wrapper">
          <label htmlFor="">Current Password</label>
          <input
            className={formInputClass}
            name="current_password"
            required
            type="password"
          />

          <label htmlFor="">New Password</label>
          <input
            className={formInputClass}
            name="new_password"
            ref={passwordRef}
            required
            onInput={(e) => setPassword(e.target.value)}
            type="password"
          />
          <PasswordStrengthBar
            password={password}
            onChangeScore={handleOnChangeScore}
          />

          <label htmlFor="">Confirm New Password</label>
          <input
            className={formInputClass}
            name="confirm_new_password"
            required
            onInput={(e) => handleConfirmPassword(e)}
            type="password"
          />
        </div>

        <div className="full_option_wrapper full_width">
          <div
            className={classnames("button", {
              "is-loading-dark-right": isLoading,
            })}
          >
            <input disabled={isLoading} type="submit" value="Update" />
          </div>
        </div>
      </div>
    </form>
  );
};

AccountSecurityForm.propTypes = {
  formInputClass: PropTypes.string,
};

export default AccountSecurityForm;
