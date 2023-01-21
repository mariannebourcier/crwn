import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './signup-form.styles.scss'
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;



  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword
        (
          email,
          password
        )
      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('email already in use')
      } else {
        console.log(error.message)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })

  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span> Sign up with email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="confirmPassword"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        {/* <input type="text" required onChange={handleChange} name="displayName" value={displayName} />
        <label>Email</label>
        <input type="email" required onChange={handleChange} name="email" value={email} />
        <label>Password</label>
        <input type="password" required onChange={handleChange} name="password" value={password} />
        <label>Confirm Password</label>
        <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} /> */}
        <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.inverted}>Sign Up</Button>
      </form>
    </div>
  )
}


export default SignUpForm;