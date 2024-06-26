import mixpanel from 'mixpanel-browser';
import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../StateProvider";
import { getBasketTotal } from "../../reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const history = useHistory();
  const handleCheckout = () => {
    mixpanel.track('Proceed to Checkout', {
      user_email: Itr_user_email,
      cart_total: getBasketTotal(basket),
      number_items: basket.length,
      add_to_cart_pressed: 'True'
    });
    history.push('/payment');
  };
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
      <button onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
