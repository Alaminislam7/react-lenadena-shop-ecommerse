import React from "react";
import { Link } from "react-router-dom";

import PropsTypes from 'prop-types';
// import img from '../../assets/mainBcg.jpeg';

export default function Product({image, title, id, price}) {
  
  return (
    <article className="product">
      <div className="img-container">
        <img src={image} alt={title || 'default'}/>
        <Link to={`products/${id}`} className='btn btn-primary product-link'>
          details
        </Link>
      </div>
      <div className="product-footer">
        <p className="product-title">{title || 'default'}</p>
        <p className="product-price"> ${price || 0}</p>
      </div>
    </article>
  );
}

Product.PropsTypes = {
  image: PropsTypes.string.isRequired,
  title: PropsTypes.string.isRequired,
  price: PropsTypes.number.isRequired,
  id: PropsTypes.number.isRequired,
}
