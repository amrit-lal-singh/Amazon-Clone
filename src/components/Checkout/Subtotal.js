import React from "react";
import mixpanel from 'mixpanel-browser';
import { Itr_user_email } from '../Header/Header.js';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../StateProvider";
import { getBasketTotal } from "../../reducer";
import { useHistory } from "react-router-dom";

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
        e.preventDefault();
        const cartTotal = getBasketTotal(basket);
        const numItems = basket.length;
        mixpanel.track('Proceed to Checkout', {
          user_email: Itr_user_email,
          cart_total: cartTotal,
          number_items: numItems,
          add_to_cart_pressed: 'True'
        });
        history.push('/payment');
      }}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
