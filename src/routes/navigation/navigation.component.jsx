import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './navigation.styles.scss';

const Navigation = () => {
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
         <Link className='nav-link' to='/auth'>
          SIGN IN
         </Link>
      </div>
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