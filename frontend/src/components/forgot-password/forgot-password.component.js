import React, { useRef } from "react";

import { forgotPassword } from "@redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

import classnames from "classnames";

import Logo from "@assets/images/cms/run-lobby-logo.png";
import { Redirect } from "react-router-dom";

import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const form = useRef(null);

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.status === "loading");

  const user = useSelector((state) => state.auth.user);

  const validate = () => {
    return form.current.reportValidity();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await dispatch(
      forgotPassword({
        data: {
          email: e.target.email.value,
        },
      })
    );
  };

  if (user) return <Redirect to="/cms/pages" />;

  return (
    <div id="lobby">
      <img src={Logo} className="lobby_logo" />
      <div className="lobby_forms_wrapper single_col">
        <h2>Forgot Password?</h2>
        <form ref={form} onSubmit={handleOnSubmit}>
          <input
            placeholder="Email address"
            required
            type="email"
            name="email"
          />
          <div className={classnames("button", { "is-loading": isLoading })}>
            <input type="submit" value="Submit" />
          </div>
        </form>
        <div className="new_account_redirect">
          <Link to="/register">Need an account?</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
