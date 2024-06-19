import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../StateProvider";
import { getBasketTotal } from "../../reducer";
import { useHistory } from "react-router-dom";
import mixpanel from 'mixpanel-browser';

function Subtotal() {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal-gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={(e) => {
        mixpanel.track('Proceed to Checkout', {
          user_email: basket.user_email, // Assuming user_email is part of the basket object
          cart_total: getBasketTotal(basket),
          number_items: basket.length,
          add_to_cart_pressed: true
        });
        history.push("/payment");
      }>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
