import './categories-preview.styles.scss'


import { useContext, Fragment } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';

import CategoryPreview from '../../components/category-preview/category-preview.component';
// list all different products available

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext)

  return (
    <Fragment>
      {
        
          Object.keys(categoriesMap).map(title => {
            const products = categoriesMap[title]
            return <CategoryPreview key={title} products={products}
            />
          }
       
          )
        }
  </Fragment>
  )}


  export default CategoriesPreview;