import React, { createContext, useState, useEffect } from "react"
import SHOP_DATA from '../shop-data.js';
import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
// this context sets the products state 
// use in index.js

//initialize context
export const ProductsContext = createContext({
  products: [],

})

// provider
export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA)
  // }, [])
  // sets db once to send data to firebase
  const value = {products}
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}