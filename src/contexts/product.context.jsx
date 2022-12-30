import React, { createContext, useState } from "react"
import PRODUCTS from '../shop-data.json';

// this context sets the products state 
// use in index.js

//initialize context
export const ProductsContext = createContext({
  products: [],

})

// provider
export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = {products}
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}