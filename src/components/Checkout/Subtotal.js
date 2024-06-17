import React from "react";
import mixpanel from 'mixpanel-browser';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../StateProvider";
import { getBasketTotal } from "../../reducer";
import { useHistory } from "react-router-dom";
mixpanel.init('58c886e21f37ceada78f5a7d090d1629', {debug: true, track_pageview: true, persistence: 'localStorage'});
function Subtotal() {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();
  
  function handleCheckout() {
    mixpanel.track('Checkout Initiated', {
      cart_total: getBasketTotal(basket),
      number_items: basket.length,
      add_to_cart_pressed: 'true'
    });
    history.push("/payment");
  }

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
