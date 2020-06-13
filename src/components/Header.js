import React, { useContext } from "react";
import img from '../assets/logo.svg'
import { Link } from "react-router-dom";
import CartLink from '../components/Cart/CartLink';
import { UserContex } from "../context/user";
import LoginLink from '../components/LoginLink';

export default function Header() {
  const {user} = useContext(UserContex);
  return (
    <header className='header'>
      <img src={img} alt="lenadena shop ecommerce project" className='logo'/>
      <nav>
        <ul>
          <div>
            <li>
              <Link to='/'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/about'>
                about
              </Link>
            </li>
            <li>
              <Link to='/products'>
                Products
              </Link>
            </li>
            {user.token && (
              <Link to='/checkout'>checkout</Link>
            )}
          </div>
          <div>
              <LoginLink/>
              <CartLink/>
          </div>
        </ul>
      </nav>
    </header>
  );
}
