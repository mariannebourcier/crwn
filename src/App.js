import Home from './routes/home/home.component'
import { Routes, Route, Outlet } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component'
import Checkout from './routes/checkout/checkout.component';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      dispatch(setCurrentUser(user))
    })
    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (

    <Routes>
      <Route path='/' element={<Navigation />}>
      <Route index element={<Home />}/> 
      <Route path='shop/*' element={<Shop />} />
      <Route path='auth' element={<Authentication />} />
      <Route path='checkout' element={<Checkout />} />
      </Route>
      
      
    </Routes>
    
  );
};

export default App;
