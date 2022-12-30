import SHOP_DATA from '../../shop-data.json';

import { useContext } from 'react';
import { ProductsContext } from '../../contexts/product.context';

import './shop.styles.scss';
import ProductCard from '../../components/product-card/product-card-component';

// list all different products available

const Shop = () => {
  const {products} = useContext(ProductsContext)

  return (
    <div className="products-container">{products.map((product) => ( 
      <ProductCard key={product.id} product={product}/>
    ))}
  </div>
  )}


  export default Shop;