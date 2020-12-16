import React from "react";
import { ProductContex } from '../context/products';
import Loading from "../components/Loading";
import Filters from "../components/Products/Filters";
import PaginatedProducts from "../components/Products/PageProducts";

export default function Products() {
  const {loading, sorted} = React.useContext(ProductContex);

  if(loading)
  {
    return <Loading/>
  }
  return (
      <>
        <Filters/>
        <PaginatedProducts/>
      </>
    );
}
