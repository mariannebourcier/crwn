import { signInWithGooglePopUp, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'





const Signin = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
    const userDocRef = await createUserDocumentFromAuth(user)
  }


  return (
    <div>
      signin
      <button onClick={logGoogleUser}>Sign in with google</button>
    </div>
  )
}

export default Signin;