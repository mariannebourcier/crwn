import { createContext , useEffect, useState, useReducer} from "react";
import createAction from '../utils/reducer/reducer.utils'
const addCartItem = (cartItems, productToAdd) => {
  // find if cart items contain producttoadd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id)

  // if found, increment quantity

  if (existingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id 
      ? {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
    )}
  
  // return new array with modified cart items/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1}]
};
const clearCartItem = (cartItems, cartItemToRemove) =>  cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)



export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  clearItemFromCart: () => {},
  cartTotal: 0
})

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
      case CART_ACTION_TYPES.SET_IS_CART_OPEN:
        return {
          ...state,
          isCartOpen: payload
        }
    default: 
    throw new Error(`unhandled type of ${type} in cartReducer`)
  }

}
export const CartProvider = ({children}) => {


  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE)
  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    )
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems : newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}))
  }
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    updateCartItemsReducer(newCartItems)
  }

  const removeCartItem = (cartItems, cartItemToRemove) => {
    // removing cart item that already exists
    // find the cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)
    // check if quantity is equal to 1,
    if (existingCartItem.quantity === 1) {
      // if statement true, return value
      return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }
    // if it is , remove item from cart
    // if it isnt, return back cartitems with matching cart with reduced quantity
    return cartItems.map((cartItem) => 
    cartItem.id === cartItemToRemove.id?
    // if id matches one being removed, give a new obj where qty has been reduced by 1
    { ...cartItem, quantity: cartItem.quantity - 1}
    : cartItem)

  } 

  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    updateCartItemsReducer(newCartItems)

  }
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    updateCartItemsReducer(newCartItems)

  }
  
  const setIsCartOpen = (bool) => {
    dispatch(
      createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool ))

  }

  const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart, clearItemFromCart, cartTotal}


  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}