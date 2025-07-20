import React from "react";
import TaxForm from "./TaxForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth";
import Login from "./Login";
import Logout from "./Logout";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="p-4">
      {user ? (
        <>
          <Logout />
          <TaxForm />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
