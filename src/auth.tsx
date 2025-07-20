// src/auth.tsx
import React from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from './components/ui/button'; // E'tibor bering: to'g'ri import qilingan

export default function Auth() {
  const [user] = useAuthState(auth);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login xatoligi:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout xatoligi:", error);
    }
  };

  return (
    <div className="text-center mt-10">
      {user ? (
        <div>
          <p className="mb-4">👋 Salom, {user.displayName}</p>
          <Button onClick={handleLogout}>Chiqish</Button>
        </div>
      ) : (
        <Button onClick={handleLogin}>🔐 Google bilan kirish</Button>
      )}
    </div>
  );
}
