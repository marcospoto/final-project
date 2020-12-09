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

const FirebaseProvider = ({ children, signOut, user }) => {
  const [appUser, setAppUser] = useState({});
  const [message, setMessage] = useState("");

  const handleSignOut = () => {
    firebaseAppAuth.signOut();
  };

  const signInWithGoogle = async (ev) => {
    ev.preventDefault();
    await firebaseAppAuth.signInWithPopup(providers.googleProvider);
  };

  useEffect(() => {
    const unlisten = firebaseAppAuth.onAuthStateChanged((user) => {
      console.log("outside listener", user);

      if (user) {
        // setAppUser(user);
        console.log("signed in current user", user);
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
            setAppUser(user);
            console.log("------");
            console.log(json.data);

            // Step 1: Fetch user enamil from MongoDB and apply to appUserContext
            // Step 2: If no email exists, create one instead
          });
      } else {
        console.log("signed out user:", user);
        setAppUser({});
      }
    });

    return () => {
      unlisten();
    };
  }, []);

  console.log(appUser);

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

// useEffect(() => {
//   const unlisten = firebaseAppAuth.onAuthStateChanged((user) => {

//     console.log("signed in current user", user);

//     if (user) {
//       console.log("signed in current user", user);
//       fetch(`/users`, {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           displayName: user.displayName,
//           email: user.email,
//           photoURL: user.photoURL,
//         }),
//       })
//         .then((res) => res.json())
//         .then((json) => {
//           setAppUser(json.data);
//           console.log("------");
//           console.log(json.data);

//           // Step 1: Fetch user enamil from MongoDB and apply to appUserContext
//           // Step 2: If no email exists, create one instead
//         });
//       setAppUser(user);
//     } else {
//       console.log("signed out user:", user);
//       setAppUser({});
//     }
//   }

//   // if (user) {
//   //   fetch(`/users`, {
//   //     method: "post",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify({
//   //       displayName: user.displayName,
//   //       email: user.email,
//   //       photoURL: user.photoURL,
//   //     }),
//   //   })
//   //     .then((res) => res.json())
//   //     .then((json) => {
//   //       setAppUser(json.data);
//   //       console.log("------");
//   //       console.log(json.data);

//   //       // Step 1: Fetch user enamil from MongoDB and apply to appUserContext
//   //       // Step 2: If no email exists, create one instead
//   //     });
//   // }

//   return () => {
//     unlisten();
//   };
// },[])
