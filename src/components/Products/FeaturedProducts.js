import React, { useContext } from "react";
import { ProductContex } from "../../context/products";
import Loading from "../Loading";
import ProductList from "./ProductList";

export default function FeaturedProducts() {
  const {loading, featured} = useContext(ProductContex);
  if(loading)
  {
    return <Loading/>
  }
  return (
    <ProductList title='featured products' products={featured}/>
  );
}
