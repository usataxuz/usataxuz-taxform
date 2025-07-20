import React from "react";
import TaxForm from "./src/TaxForm";
// yoki
import TaxForm from "./src/components/TaxForm"; // agar `TaxForm.tsx` `components` papkada bo‘lsa
// yoki
import TaxForm from "./TaxForm"; // faqat **agar** `App.tsx` bilan bir papkada bo‘lsa
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
