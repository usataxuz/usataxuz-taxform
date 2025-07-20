import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './auth';
import { Button } from '@/components/ui/button';

export default function Login() {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold mb-6">SoliqUZ tizimiga xush kelibsiz</h1>
      <Button onClick={handleLogin}>🔐 Google bilan kirish</Button>
    </div>
  );
}
