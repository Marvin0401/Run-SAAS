import React, { useEffect, useRef, useState } from "react";

import { login, logout } from "@redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

import classnames from "classnames";

import CheckMark from "@assets/images/checkmark.svg";
import Logo from "@assets/images/cms/run-lobby-logo.png";
import { ReactSVG } from "react-svg";
import { Redirect } from "react-router-dom";

import { Link } from "react-router-dom";

const Login = () => {
  const form = useRef(null);

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.status === "loading");

  const user = useSelector((state) => state.auth.user);

  const [remember, setRemember] = useState(true);

  useEffect(() => {
    localStorage.setItem("SHOULD_PERSIST", remember ? "persist" : "forget");
  }, [remember]);

  const validate = () => {
    return form.current.reportValidity();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch(
      login({
        data: {
          email: e.target.email.value,
          password: e.target.password.value,
        },
      })
    );
  };

  const handleOnChangeRemember = () => {
    setRemember((prev) => !prev);
  };

  useEffect(() => {
    if (!user) {
      dispatch(logout());
    }
  }, [user]);

  if (user) return <Redirect to="/cms/pages" />;

  return (
    <div id="lobby">
      <Link to="/">
        <img src={Logo} className="lobby_logo" />
      </Link>
      <div className="lobby_forms_wrapper single_col">
        <h2>Log in</h2>
        <form ref={form} onSubmit={handleOnSubmit}>
          <input
            placeholder="Email address"
            required
            type="email"
            name="email"
          />
          <input
            autoComplete="on"
            className="password"
            placeholder="Password"
            name="password"
            required
            type="password"
          />
          <div className="error_notification">
            Sorry, your email and password don&apost match.
          </div>
          <div className={classnames("button", { "is-loading": isLoading })}>
            <input type="submit" value="Submit" />
          </div>
          <div className="addons">
            <div className="remember_me">
              <div className="checkbox_wrapper">
                <input
                  type="checkbox"
                  onChange={handleOnChangeRemember}
                  id="remember"
                  name="remember"
                  checked={remember}
                />
                <ReactSVG src={CheckMark} className="svg" />
                <label htmlFor="">
                  <small>
                    <b>Remember Me</b>
                  </small>
                </label>
              </div>
            </div>
            <div className="forgot_password">
              <small>
                <b>
                  <Link to="/forgot-password">Forgot Password?</Link>
                </b>
              </small>
            </div>
          </div>
        </form>
        <div className="new_account_redirect">
          <Link to="/register">Need an account?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
