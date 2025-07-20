import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './auth';
import { Button } from '@/components/ui/button';

export default function Logout() {
  return <Button onClick={() => signOut(auth)}>🚪 Chiqish</Button>;
}
