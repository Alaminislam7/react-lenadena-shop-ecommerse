import React, { createContext, useState, useEffect, useReducer } from 'react';
//import localCart from '../utils/localCart';
import reducer from '../context/reducer';
import { REMOVE, INCREASE, DECREASE, ADD_TO_CART, CLEAR_CART } from "./actions";


function getCartFromLocalStorage()
{
    return localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : [];
}
const CartContext = createContext();

function CartProvider({children})
{
    const [cart, dispatch] = useReducer(reducer,getCartFromLocalStorage());
    const [total, setTotal] = useState(0);
    const [cartItems, setCartItems] = useState(0);

    
    useEffect( () => {
        //local storage
        localStorage.setItem('cart',JSON.stringify(cart));
        //cart items
        let newCartItems = cart.reduce( (total, cartItem) => {
            return (total +=cartItem.amount);
        }, 0);
        setCartItems(newCartItems);
        //cart total
        let newTotal = cart.reduce( (total, cartItem) => {
            return (total += cartItem.amount * cartItem.price);
        }, 0);
        newTotal = parseFloat(newTotal.toFixed(2));
        setTotal(newTotal);
    },[cart])

    //remove item
    const removeItem = id => {
        // setCart([...cart].filter(item => item.id !==id));
        dispatch({ type: REMOVE, payload: id });
    }
    //increment item
    const incrementAmount = id => {
        // const newCart = [...cart].map(item => {
        //     return item.id === id
        //     ?   {...item, amount: item.amount + 1}
        //     : {...item}
        // });
        // setCart(newCart);
        dispatch({ type: INCREASE, payload: id });
    }
    //decrement item
    const decrementAmount = (id, amount) => 
    {
        // if (amount === 1)
        // {
        //     removeItem(id)
        //     return;
        // }else{
        //     const newCart = [...cart].map(item => {
        //         return item.id === id
        //             ? {...item, amount: item.amount - 1 }
        //             : {...item}
        //     });
        //     setCart(newCart);
        // }
        if (amount === 1) {
            dispatch({ type: REMOVE, payload: id });
            return;
          } else {
            dispatch({ type: DECREASE, payload: id });
          }
    }
    //addToCart item
    const addToCart = product => {
        // const {id, image, title, price} = product;
        // const item = [...cart].find(item => item.id === id);
        // if(item)
        // {
        //     incrementAmount(id);
        //     return;
        // }else{
        //     const newItem = {id, image, title, price, amount: 1};
        //     const newCart = [...cart, newItem];
        //     setCart(newCart);
        // }
        let item = [...cart].find(item => item.id === product.id);
        if (item) {
        dispatch({ type: INCREASE, payload: product.id });
        } else {
        dispatch({ type: ADD_TO_CART, payload: product });
        }
    }
    //clear item
    const clearCart = id => {
        //setCart([]);
        dispatch({ type: CLEAR_CART });
    }
    return (
        <CartContext.Provider value={{
                cart, total, cartItems,incrementAmount,decrementAmount,addToCart, clearCart,removeItem
                }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }
