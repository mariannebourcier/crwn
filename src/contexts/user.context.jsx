import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener,  } from "../utils/firebase/firebase.utils";

//actual value to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});


export const UserProvider = ({ children }) => {
const [currentUser, setCurrentUser] = useState(null);
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