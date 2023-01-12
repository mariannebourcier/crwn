import './cart-dropdown.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import Button from '../button/button.component'

import { useNavigate  } from 'react-router-dom'

import CartItem from '../cart-item/cart-item.component'

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate()

  const goToCheckouthandler = () => {
    navigate('/checkout')
  }
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item) => (<CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckouthandler}>Go to checkout</Button>
    </div>
  )
}


export default CartDropDown;