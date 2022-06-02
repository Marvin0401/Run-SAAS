import React, { useRef } from "react";
import PropTypes from "prop-types";

import classnames from "classnames";

import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "@redux/slices/profile";

const ProfileForm = ({ formInputClass }) => {
  const form = useRef(null);

  const user = useSelector((state) => state.auth.user);
  const {
    company,
    custID: user_id,
    first_name,
    last_name,
    email,
    phone,
  } = user;

  const isLoading = useSelector((state) => state.profile.status === "loading");

  const dispatch = useDispatch();

  const validate = () => {
    return form.current.reportValidity();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      dispatch(
        updateUserProfile({
          data: {
            company: e.target.company.value,
            email: e.target.email.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            phone: e.target.phone.value,
            user_id,
          },
        })
      );
    }
  };

  return (
    <form onSubmit={handleOnSubmit} ref={form}>
      <div className="full_row_wrapper halves border">
        <h1 className="full">Profile Details</h1>

        <div className="full_option_wrapper">
          <label htmlFor="">First Name</label>
          <input
            className={formInputClass}
            defaultValue={first_name}
            name="first_name"
            required
            type="text"
          />

          <label htmlFor="">Last Name</label>
          <input
            className={formInputClass}
            defaultValue={last_name}
            name="last_name"
            required
            type="text"
          />

          <label htmlFor="">Email</label>
          <input
            className={formInputClass}
            defaultValue={email}
            name="email"
            required
            type="email"
          />
        </div>

        <div className="full_option_wrapper">
          <label htmlFor="">Phone</label>
          <input
            defaultValue={phone}
            className={formInputClass}
            name="phone"
            required
            type="tel"
          />

          <label htmlFor="">Company</label>
          <input
            className={formInputClass}
            defaultValue={company}
            name="company"
            type="text"
          />
        </div>

        <div className="full_option_wrapper full_width">
          <div className="button">
            <input
              className={classnames({ "is-loading": isLoading })}
              type="submit"
              value="Update"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

ProfileForm.propTypes = {
  formInputClass: PropTypes.string,
};

export default ProfileForm;
