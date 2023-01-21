import './cart-dropdown.styles.jsx'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import Button from '../button/button.component'

import { useNavigate  } from 'react-router-dom'

import CartItem from '../cart-item/cart-item.component'
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx'
const CartDropDown = () => {
  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate()

  const goToCheckouthandler = () => {
    navigate('/checkout')
  }
  return (
    <CartDropdownContainer>
      <CartItems>

        {
        cartItems.length ? (cartItems.map((item) => (<CartItem key={item.id} cartItem={item} />
        ))) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckouthandler}>Go to checkout</Button>
    </CartDropdownContainer>
  )
}


export default CartDropDown;