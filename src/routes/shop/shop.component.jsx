import { Routes, Route } from 'react-router-dom'
import './shop.styles.scss';
import Category from '../category/category.component'
import CategoriesPreview from '../categories-preview/categories-preview.component';
// list all different products available
const Shop = () => {

  return (
   <Routes>
     <Route index element={<CategoriesPreview />} />
     <Route path=':category' element={<Category />} />
   </Routes>
  )}


  export default Shop;