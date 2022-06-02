import React, { useState, useRef, useEffect } from "react";

import { logout, register } from "@redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

import classnames from "classnames";

import CheckMark from "@assets/images/checkmark.svg";
import Logo from "@assets/images/cms/run-lobby-logo.png";
import { Link, Redirect } from "react-router-dom";

import RadioBtn from "@assets/images/radio_button.svg";
import { ReactSVG } from "react-svg";

import PasswordStrengthBar from "react-password-strength-bar";

import { useNotificationPopUp } from "@components/notification-pop-up/notification-pop-up.component";

const Register = () => {
  const form = useRef(null);

  const dispatch = useDispatch();

  const passwordRef = useRef(null);

  const [agree, setAgree] = useState(false);
  const [party, setParty] = useState("democrat");
  const [password, setPassword] = useState("");
  const isLoading = useSelector((state) => state.auth.status === "loading");

  const user = useSelector((state) => state.auth.user);

  const { setPopUp } = useNotificationPopUp();

  const handleOnChangeAgree = () => {
    setAgree((prev) => !prev);
  };

  const handleOnChangePoliticalParty = (e) => {
    setParty(e.currentTarget.value);
  };

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

  const handleOnClickConfirm = () => {
    setPopUp(undefined);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const {
      campaign_name,
      code,
      company,
      domain,
      email,
      first_name,
      last_name,
      party,
      password,
      phone,
    } = e.target;

    /** @TODO move this logic to API */
    if (party?.value === "other") {
      setPopUp({
        title: "More Info Required",
        children: (
          <>
            <p>
              Please send an email to{" "}
              <a href="info@designedtorun.com">info@designedtorun.com</a>{" "}
              detailing why you would like an account.
            </p>
            <button onClick={handleOnClickConfirm}>OK</button>
          </>
        ),
      });

      return;
    }

    if (party?.value === "republican") {
      setPopUp({
        title: "Roads Closed Pizza Boy",
        children: (
          <>
            <p>
              Currently your kind is not welcome here. You might want to
              consider donating to AOC in the meantime.
            </p>
            <button onClick={handleOnClickConfirm}>OK</button>
          </>
        ),
      });

      return;
    }

    dispatch(
      register({
        data: {
          campaign_name: campaign_name?.value,
          code: code?.value,
          company: company?.value,
          domain: domain?.value,
          email: email?.value,
          first_name: first_name?.value,
          last_name: last_name?.value,
          political_party: party?.value,
          password: password?.value,
          phone: phone?.value,
        },
      })
    );
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

      <div className="lobby_forms_wrapper">
        <h2>Profile Details</h2>

        <form ref={form} onSubmit={handleOnSubmit}>
          <div className="form_group">
            <input
              name="first_name"
              type="text"
              placeholder="First name *"
              required
            />

            <input
              name="last_name"
              type="text"
              placeholder="Last name *"
              required
            />

            <input
              name="company"
              type="text"
              placeholder="Company *"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email address *"
              required
            />

            <input
              name="phone"
              type="phone"
              placeholder="Phone number *"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password *"
              className="password"
              ref={passwordRef}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordStrengthBar
              password={password}
              onChangeScore={handleOnChangeScore}
            />
          </div>

          <h2>Site Details</h2>
          <div className="form_group">
            <input
              name="campaign_name *"
              type="text"
              placeholder="Candidate or campaign name *"
              required
            />

            <input
              name="domain"
              type="text"
              placeholder="Site domain (optional)"
            />

            <div style={{ display: "initial" }}>
              <div className="section_label">Political Party *</div>

              <div className="radio_wrapper">
                <input
                  type="radio"
                  name="party"
                  value="democrat"
                  onChange={handleOnChangePoliticalParty}
                  checked={party == "democrat"}
                />
                <ReactSVG src={RadioBtn} className="svg replaced-svg" />
                <label htmlFor="">Democrat</label>
              </div>

              <div className="radio_wrapper">
                <input
                  type="radio"
                  name="party"
                  value="republican"
                  checked={party == "republican"}
                  onChange={handleOnChangePoliticalParty}
                />
                <ReactSVG src={RadioBtn} className="svg replaced-svg" />
                <label htmlFor="">Republican</label>
              </div>

              <div className="radio_wrapper">
                <input
                  type="radio"
                  name="party"
                  value="other"
                  checked={party == "other"}
                  onChange={handleOnChangePoliticalParty}
                />
                <ReactSVG src={RadioBtn} className="svg replaced-svg" />
                <label htmlFor="">Other</label>
              </div>
              {party == "other" && (
                <input name="code" type="text" placeholder="Code" />
              )}
            </div>
          </div>

          <div className="error_notification">
            Put any error notifications here.
          </div>
          <div className={classnames("button", { "is-loading": isLoading })}>
            <input type="submit" value="Sign Up" />
          </div>

          <div>
            <div className="terms_condition">
              <div className="checkbox_wrapper">
                <input
                  checked={agree}
                  onChange={handleOnChangeAgree}
                  id="agree"
                  name="agree"
                  type="checkbox"
                  required
                />
                <ReactSVG src={CheckMark} className="svg" />
                <label htmlFor="agree">
                  I agree to the{" "}
                  <Link to="/terms" className="termsAndConditions">
                    terms and conditions
                  </Link>
                  *
                </label>
              </div>
            </div>
            <div className="login_link">
              <Link to="/login">I already have an account</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
