import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './navigation.styles.scss';
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
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {
            currentUser ? (
              <span className='nav-link' onClick={signOutUser}>SIGN OUT</span> )
              : (
                <Link className='nav-link' to='/auth'>
                SIGN IN
              </Link>
              )
            
          }
         <CartIcon />
        </div>
        {isCartOpen && <CartDropDown />}
      </div>
      <Outlet />
    </Fragment>


  )
}

export default Navigation;

//fragment act as wrapping div without crowding the dom
//link = anchor tag inside browser router
//svg = scalable logo
//box-sizing:border-box; to make css border padding properties dont get thrown off by adding too much size