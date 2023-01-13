import React, { createContext, useState, useEffect } from "react"
import SHOP_DATA from '../shop-data.js';
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
// this context sets the products state 
// use in index.js

//initialize context
export const CategoriesContext = createContext({
  categoriesMap: {},

})

// provider
export const CategoriesProvider = ({children}) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  // get data from db 
  useEffect(() => {
    const getCategoriesMap = async () => {
      await getCategoriesAndDocuments();
      setCategoriesMap(categoriesMap)
    }
    getCategoriesMap();
  }, [])
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA)
  // }, [])
  // sets db once to send data to firebase
  const value = {categoriesMap}
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}