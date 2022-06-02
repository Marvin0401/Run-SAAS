import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import "@styles/zoho-plan.scss";
import root from "react-shadow";
import zohoStyles from "@styles/zoho-plan.scss";
import { useSelector } from "react-redux";

const ZohoPlan = (props) => {
  const { product_id, subscriber } = props;
  const planUrl = `https://subscriptions.zoho.com/api/v1/widgets/products?product_digest=${product_id}&showchild=true&formatneeded=true`;

  const [planDetails, setPlanDetails] = useState(null);
  const [isPlanDisabled, setIsPlanButtonDisabled] = useState(false);

  const isPaying = useSelector((state) => state.auth.user?.is_paying);

  useEffect(async () => {
    try {
      const planDetails = await axios.get(planUrl);
      setPlanDetails(planDetails.data.product);
    } catch (err) {
      console.log(err);
      toast.error("Error in fetching zoho plan details");
    }
  }, []);

  const handleSubscribe = (plan) => {
    if (isPaying) {
      toast.error("You are already subscribed!");
      return;
    }
    setIsPlanButtonDisabled(true);
    subscriber(plan, setIsPlanButtonDisabled);
  };

  return (
    <root.div
      style={{
        width: "100%",
      }}
    >
      <style>{zohoStyles}</style>
      <div className="pricing-table-main">
        <div className="pricing-table-header">
          <div className="filters d-flex"></div>
        </div>
        <div className="pricing-table-body">
          <div className="pricing-table ">
            <ul className="clearfix elegant">
              {planDetails?.plans.map((plan, i) => {
                return (
                  <li className="plan-item" key={i}>
                    <div className="plan-block ">
                      <div id="plan-name" className="plan-name">
                        {plan.name}
                      </div>
                      <div className="main-price">
                        <span className="price-figure">
                          <small>{planDetails?.currency_symbol}</small>
                          <span className="basic-plan price-value">
                            <span className="otherCurrency" id="plan-amount">
                              {plan.recurring_price}
                            </span>
                          </span>
                        </span>
                        <span className="price-term">
                          <span>Billed {plan.name}</span>
                        </span>
                        <span className="goal">
                          <button
                            className="rounded"
                            rel="noreferrer"
                            disabled={isPlanDisabled}
                            onClick={() => handleSubscribe(plan)}
                          >
                            Subscribe
                          </button>
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </root.div>
  );
};

ZohoPlan.propTypes = {
  product_id: PropTypes.string,
  subscriber: PropTypes.any,
};

export default ZohoPlan;
