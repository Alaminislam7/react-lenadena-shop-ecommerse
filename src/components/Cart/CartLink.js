import React, { useContext } from "react";
import { CartContext } from "../../context/cart";
import { Link } from "react-router-dom";

export default function CartLink() {
  const {cartItems} = useContext(CartContext);
  return (
    <div className="cart-link-container">
      <Link to='/cart'>cart</Link>
      <span className="cart-link-total">{cartItems}</span>
    </div>
  );
}
