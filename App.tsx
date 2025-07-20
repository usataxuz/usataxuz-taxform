import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './auth';
import TaxForm from './TaxForm';
import Login from './Login';
import Logout from './Logout';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Yuklanmoqda...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {user ? (
        <>
          <div className="text-right mb-4">
            <Logout />
          </div>
          <TaxForm />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
