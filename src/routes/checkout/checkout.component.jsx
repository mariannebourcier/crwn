import "./checkout.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

const Checkout = () => {
  const { cartItems, cartTotal} =
    useContext(CartContext);
  return (
    <div className="checkout-containers">
      <div className="checkout-header">
        <div className="header-block">
          <span>Products</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      
        {cartItems.map((cartItem) => {
          const { id, name, quantity } = cartItem;
          return (
            <CheckoutItem />
          );
        })}
        <span className="total">Total: {cartTotal}$</span>
      </div>
  );
};

export default Checkout;
