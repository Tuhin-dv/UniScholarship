import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../../firebase/Firebase.config';
import useAxios from '../../hooks/useAxios';




function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google sign in
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Sign out user
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };
  const axiosSecure = useAxios();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const res = await axiosSecure.get(`/users?email=${currentUser.email}`);
          const userData = res.data;

          setUser({
            ...currentUser,
            role: userData?.role || 'user',
          });
        } catch (err) {
          console.error("Failed to fetch role:", err);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Auth context value
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logout,
  };

  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  );
}

export default AuthProvider;
