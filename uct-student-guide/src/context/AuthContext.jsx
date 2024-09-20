import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !user.displayName) {
        updateProfile(user, { displayName: user.email.split('@')[0] });
      }
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};