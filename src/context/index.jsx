import { auth } from "../services/firebase";
import { initializeAuth, onAuthStateChanged } from "firebase";
import React, { useEffect, useState } from "react";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setUser({ ...user });
      setUserLoggedIn(true);
      setLoading(false);
    } else {
      setUser(null);
      setUserLoggedIn(false);
      setLoading(false);
    }
  }

  function loginUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logoutUser() {
    return auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userLoggedIn,
        loading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}
