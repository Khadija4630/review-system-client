import { onAuthStateChanged, signOut} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.init";

export const AuthContext = createContext(null);

const Router = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("Auth state changed, currentUser:", currentUser);
        setUser({
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        });
        console.log("User detected:", currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    setLoading(false);
  };

  const userInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signOutUser,
    setUser,
  };

  return (
    <AuthContext.Provider value={{userInfo,user,
      loading,
      createUser,
      signInUser,
      signOutUser,
      setUser,}}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default Router;
