import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth'
import SignUpForm from '../../components/signup/signup-form.component';
import {
  auth,
  signInWithGooglePopUp,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import SignInForm from '../../components/signin-form/signin-form.component';

import './authentication.styles.scss';


const Authentication = () => {

  // useEffect( async () => {
  //  const response = await getRedirectResult(auth)
  //  if(response) {
  //    const userDocRef = await createUserDocumentFromAuth(response.user)
  //  }
  // }, [])

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
    const userDocRef = await createUserDocumentFromAuth(user)
  }
  // const logGoogleRedirectUser = async () => {
  //   const { user } = await signInWithGoogleRedirect();
  //   const userDocRef = await createUserDocumentFromAuth(user)
  // }

  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />
    </div>
  )
}

export default Authentication;