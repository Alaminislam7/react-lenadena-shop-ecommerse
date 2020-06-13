import React, { useContext } from "react";
import { UserContex } from "../context/user";
import { CartContext } from "../context/cart";
import { Link } from "react-router-dom";

export default function LoginLink() {
  const {user, userLogout} = useContext(UserContex);
  const {clearCart} = useContext(CartContext);
  if(user.token)
  {return(
    <button 
      className='login-btn'
      onClick={ () => {
        userLogout();
        clearCart();
      }}
    >
      logout
    </button>
  )}
  return (
    <Link to='/login'>login</Link>
  );
}
