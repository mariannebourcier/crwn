import { createContext, useState, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener,  } from "../utils/firebase/firebase.utils";
// missing create action helper util function
//actual value to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  'SET_CURRENT_USER': 'SET_CURRENT_USER'
}
// reducer for state
const userReducer = (state, action) => {
  const {type, payload} = action;
  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default: 
      throw new Error(`unhandled type ${type} in user reducer`)
  }
  
}
const INITIAL_STATE = {
  currentUser: null
}

export const UserProvider = ({ children }) => {
// const [currentUser, setCurrentUser] = useState(null);
const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)
//useReducer to keep track of user state

const setCurrentUser = (user) => {
  dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
}
const value = { currentUser, setCurrentUser}

// useEffect mount on component mount
//ummount = stop listener (unsubscribe)
// call callback whenever user state changes signin/signout

// auth user or null 
useEffect(() => {
const unsubscribe = onAuthStateChangedListener((user) => {
if (user) 
{
  createUserDocumentFromAuth(user)
}
setCurrentUser(user)
})

return unsubscribe
}
, [])

return <UserContext.Provider>{children}</UserContext.Provider>
}