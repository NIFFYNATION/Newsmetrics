import { auth } from "../services/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";

const AuthContext = React.createContext();

const INACTIVITY_TIMEOUT = 3600000; // 1 hour in milliseconds

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const checkInactivity = setInterval(() => {
      if (userLoggedIn && Date.now() - lastActivity > INACTIVITY_TIMEOUT) {
        logoutUser(true);
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkInactivity);
  }, [userLoggedIn, lastActivity]);

  useEffect(() => {
    const resetActivity = () => setLastActivity(Date.now());
    window.addEventListener('mousemove', resetActivity);
    window.addEventListener('keypress', resetActivity);

    return () => {
      window.removeEventListener('mousemove', resetActivity);
      window.removeEventListener('keypress', resetActivity);
    };
  }, []);

  async function initializeUser(user) {
    if (user) {
      setUser({ ...user });
      setUserLoggedIn(true);
      setLastActivity(Date.now());
    } else {
      setUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  async function loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setUserLoggedIn(true);
      setLastActivity(Date.now());
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  function logoutUser(dueToInactivity = false) {
    auth.signOut();
    setUser(null);
    setUserLoggedIn(false);
    if (dueToInactivity) {
      localStorage.setItem('loggedOutDueToInactivity', 'true');
    }
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
