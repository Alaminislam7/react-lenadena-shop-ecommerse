import React from "react";
import { ProductContex } from '../context/products';
import Loading from "../components/Loading";
import ProductList from '../components/Products/ProductList';

export default function Products() {
  const {loading, products} = React.useContext(ProductContex);
  console.log(products);

  if(loading)
  {
    return <Loading/>
  }
  return (
      <ProductList title='our products' products={products}/>
    );
}
