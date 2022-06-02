import React from "react";
import ZohoPlan from "../zoho-plan/zoho-plan.component";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
const BillingForm = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const subscriptionURL =
    "https://dev-api.designedtorun.com/api/zoho/subscriptions-create/";
  const queryParams = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    company_name: user.company,
  };
  const pricingTableOpt =
    process.env.REACT_APP_ZOHO_WIDGET === "TEST"
      ? {
          id: "zf-widget-root-id",
          product_id:
            "2-987039bc2c4273a05c4004bbe4aab456c6be149da8e35179d7a3371340e4b6f6f9ed7a8ab679442558bcad6fd428a6fd8e7b6a867c45d6db0b00f51473f23b3d",
          template: "elegant_pro",
          most_popular_plan: "",
          is_group_by_frequency: false,
          group_options: [],
          plans: [{ plan_code: "yearly_test" }, { plan_code: "yearly_test" }],
          theme: { color: "#7331ff", theme_color_light: "" },
          button_text: "Subscribe",
          product_url: "https://subscriptions.zoho.com",
          price_caption: "",
          language_code: "en",
          open_inSameTab: false,
        }
      : {
          id: "zf-widget-root-id",
          product_id:
            "2-ea2abc007350db8e5c4004bbe4aab45670ad8e34d39d532991d0e24d39b3e999851f6d90a58d15cd58bcad6fd428a6fdb79637b2071cdcfacdc51d8ddc5526b9",
          template: "elegant_pro",
          most_popular_plan: "",
          is_group_by_frequency: false,
          group_options: [],
          plans: [
            {
              plan_code: "run_yearly",
            },
          ],
          theme: { color: "#7331ff", theme_color_light: "" },
          button_text: "Subscribe",
          product_url: "https://subscriptions.zoho.com",
          price_caption: "",
          language_code: "en",
          open_inSameTab: false,
        };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_self", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const subscriber = async (plan, setButtonVisablity) => {
    try {
      const response = await axios.post(
        subscriptionURL,
        {
          plan_code: plan.plan_code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      const {
        data: {
          data: { hostedpage },
        },
      } = response;

      const query = new URLSearchParams(queryParams).toString();

      if (hostedpage) {
        const subscriptionHandlerURL = `${hostedpage.url}?${query}`;
        openInNewTab(subscriptionHandlerURL);
      }

      setButtonVisablity(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setButtonVisablity(false);
    }
  };

  return (
    <div className="full_row_wrapper halves border">
      <h1 className="full">Subscribe</h1>
      <div className="padding-half">
        Please ensure to use the same email as your Run! account so your
        subscription status gets updated.
      </div>
      <ZohoPlan subscriber={subscriber} {...pricingTableOpt}></ZohoPlan>
    </div>
  );
};

BillingForm.propTypes = {
  formInputClass: PropTypes.string,
};
export default BillingForm;
