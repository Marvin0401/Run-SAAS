import React, { useRef, useState } from "react";

import { resetPassword } from "@redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

import PasswordStrengthBar from "react-password-strength-bar";

import classnames from "classnames";

import Logo from "@assets/images/cms/run-lobby-logo.png";
import { Redirect, useRouteMatch, Link } from "react-router-dom";

const ResetPassword = () => {
  const params = useRouteMatch().params;
  const form = useRef(null);

  const passwordRef = useRef(null);

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.status === "loading");

  const user = useSelector((state) => state.auth.user);

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

    if (!validate()) return;

    const { new_password } = e.target;

    dispatch(
      resetPassword({
        data: {
          password: new_password.value,
          token: params.otp,
        },
      })
    );

    form.current.reset();

    document.querySelectorAll(`.touched`).forEach((el) => {
      el.classList.remove("touched");
    });
  };

  if (user) return <Redirect to="/cms/pages" />;

  return (
    <div id="lobby">
      <Link to="/">
        <img src={Logo} className="lobby_logo" />
      </Link>
      <div className="lobby_forms_wrapper single_col">
        <h2>Reset Password</h2>
        <form ref={form} onSubmit={handleOnSubmit}>
          <label htmlFor="">New Password</label>
          <input
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
            name="confirm_new_password"
            required
            onInput={(e) => handleConfirmPassword(e)}
            type="password"
          />
          <div className={classnames("button", { "is-loading": isLoading })}>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
