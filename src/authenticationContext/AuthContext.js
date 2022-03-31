import React, { useContext, useState } from "react";
import { firebaseAuth } from "../firebase/firebaseAuth";
import {
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const auth = getAuth();

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);
      }
    );
  };
  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);
      }
    );
  };
  const logout = () => {
    return signOut(auth);
  };
  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const value = {
    currentUser,
    signup,
    signin,
    logout,
    passwordReset,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
