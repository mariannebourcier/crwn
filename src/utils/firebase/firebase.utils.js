
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,

} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDCNIADqL0BAOegSC_TTyb6KnLMAFQfyqU",
  authDomain: "crwn-db-c112c.firebaseapp.com",
  projectId: "crwn-db-c112c",
  storageBucket: "crwn-db-c112c.appspot.com",
  messagingSenderId: "1023821829713",
  appId: "1:1023821829713:web:615652f733386b710a4a70",
  measurementId: "G-2J0W3HPK9E"
};


const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});


export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data()
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
  return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;
  //find existing document reference; other instances
  const userDocRef = doc(db, 'users', userAuth.uid);
  //get user data doc to check if data exists
  const userSnapshot = await getDoc(userDocRef);
  //if user data exists => return userdocref
  // if user data not exists => create/set doc with data from userAuth in collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  return userDocRef;
}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () =>  await signOut(auth);


// observer listener => returns back onAuthStateChange, takes in auth , callback function
export const onAuthStateChangedListener = (callback) => 
{
  // this listener could take in an error callback and a completed callback also
onAuthStateChanged(auth, callback);
}