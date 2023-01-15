import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import {NavigationContainer, NavLink, NavLinks, LogoContainer} from './navigation.styles.jsx';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { CartContext } from '../../contexts/cart.context';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';

const Navigation = () => {
  // remove sign out handler but still need currentUser to track sign in / sign out btn state
  const { currentUser } = useContext(UserContext)

  const { isCartOpen } = useContext(CartContext)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink> )
              : (
                <NavLink  to='/auth'>
                SIGN IN
              </NavLink>
              )    
          }
         <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropDown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>


  )
}

export default Navigation;

//fragment act as wrapping div without crowding the dom
//link = anchor tag inside browser router
//svg = scalable logo
//box-sizing:border-box; to make css border padding properties dont get thrown off by adding too much size