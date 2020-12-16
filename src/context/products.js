import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import url from '../utils/URL';
import { featuredProducts, flattenProducts, paginate } from '../utils/helpers';

export const ProductContex = React.createContext();

//provider,consumer,useContext()


export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [sorted, setSorted] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    shipping: false,
    price: "all"
  })

  const changePage = index => {
    setPage(index);
  };

  const updateFilters = e => {
    const type = e.target.type;
    const filter = e.target.name;
    const value = e.target.value;
    let filterValue;
    if (type === "checkbox") {
      filterValue = e.target.checked;
    } else if (type === "radio") {
      value === "all" ? (filterValue = value) : (filterValue = parseInt(value));
    } else {
      filterValue = value;
    }
    setFilters({ ...filters, [filter]: filterValue });
  };

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${url}/products`)
      .then(res => {
        const featured = featuredProducts(flattenProducts(res.data));
        const products = flattenProducts(res.data);
        setSorted(paginate(products));
        setProducts(products);
        setFeatured(featured);
        setLoading(false)
        console.log(products);
      });
    return () => { };
  }, []);

  useLayoutEffect(() => {
    let newProducts = [...products].sort((a, b) => a.price - b.price);
    const { search, category, shipping, price } = filters;
    //
    if (category !== "all") {
      newProducts = newProducts.filter(item => item.category === category);
    }
    if (shipping !== false) {
      newProducts = newProducts.filter(item => item.free_shipping === shipping);
    }
    if (price !== "all") {
      newProducts = newProducts.filter(item => {
        if (price === 0) {
          return item.price < 300;
        } else if (price === 300) {
          return item.price > 300 && item.price < 650;
        } else {
          return item.price > 650;
        }
      });
    }
    if (search !== "") {
      newProducts = newProducts.filter(item => {
        let title = item.title.toLowerCase().trim();
        return title.startsWith(search) ? item : null;
      });
    }

    setPage(0);

    setSorted(paginate(newProducts));
  
  }, [filters, products]);


  return (
    <ProductContex.Provider value={{ loading, products, featured, sorted, page, filters, changePage, updateFilters }}>
      {children}
    </ProductContex.Provider>
  );
}