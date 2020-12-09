import React, { createContext, useEffect, useState } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase/app";
import "firebase/auth";

export const FirebaseContext = createContext(null);

var firebaseConfig = {
  apiKey: "AIzaSyDvfnjpFE_fokb0A-QptPjHJSHFimgUg00",
  authDomain: "movie-reviews-1ca5c.firebaseapp.com",
  projectId: "movie-reviews-1ca5c",
  storageBucket: "movie-reviews-1ca5c.appspot.com",
  messagingSenderId: "93166490206",
  appId: "1:93166490206:web:b17e308915e0b075d9dacf",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const FirebaseProvider = ({ children, signInWithGoogle, signOut, user }) => {
  const [appUser, setAppUser] = useState({});
  const [message, setMessage] = useState("");

  const handleSignOut = () => {
    signOut();
    setAppUser({});
  };

  useEffect(() => {
    if (user) {
      fetch(`/users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setAppUser(json.data);
          console.log("------");
          console.log(json.data);

          // Step 1: Fetch user enamil from MongoDB and apply to appUserContext
          // Step 2: If no email exists, create one instead
        });
    }
  }, [user]);

  return (
    <FirebaseContext.Provider
      value={{ appUser, signInWithGoogle, handleSignOut, message }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(FirebaseProvider);
