
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { auth } from './auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { generateTaxPDF } from './generateTaxPDF';

export default function TaxForm() {
  const [form, setForm] = useState({
    fullName: "",
    ssn: "",
    dob: "",
    address: "",
    employer: "",
    ein: "",
    wage: "",
    federalTax: "",
    stateTax: "",
    routing: "",
    account: "",
  });
  const [history, setHistory] = useState([]);
  const [user] = useAuthState(auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!user) return;
    const formData = { ...form, uid: user.uid, createdAt: new Date().toISOString() };
    try {
      await addDoc(collection(db, 'taxForms'), formData);
      await generateTaxPDF(form);
      fetchHistory();
    } catch (e) {
      console.error('Xatolik:', e);
    }
  };

  const fetchHistory = async () => {
    if (!user) return;
    const q = query(collection(db, 'taxForms'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setHistory(docs);
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  return (
    <div className="p-4 grid gap-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">AQSh soliq deklaratsiyasini O‘zbek tilida to‘ldiring</h1>
      <Card>
        <CardContent className="grid gap-3 p-4">
          <Input placeholder="To‘liq ismingiz" name="fullName" onChange={handleChange} />
          <Input placeholder="ITIN yoki SSN" name="ssn" onChange={handleChange} />
          <Input placeholder="Tug‘ilgan sana (MM/DD/YYYY)" name="dob" onChange={handleChange} />
          <Input placeholder="Yashash manzili" name="address" onChange={handleChange} />
          <Input placeholder="Ish beruvchi nomi" name="employer" onChange={handleChange} />
          <Input placeholder="EIN (Ish beruvchi ID)" name="ein" onChange={handleChange} />
          <Input placeholder="Sizga to‘langan umumiy summa ($)" name="wage" onChange={handleChange} />
          <Input placeholder="Federal soliq ushlab qolingan ($)" name="federalTax" onChange={handleChange} />
          <Input placeholder="Shtat solig‘i (agar bor bo‘lsa)" name="stateTax" onChange={handleChange} />
          <Input placeholder="Bank routing raqami" name="routing" onChange={handleChange} />
          <Input placeholder="Bank account raqami" name="account" onChange={handleChange} />
          <Button onClick={handleSubmit}>Davom etish va PDF yaratish</Button>
        </CardContent>
      </Card>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">📄 Yuklangan PDFlar tarixi:</h2>
        <ul className="list-disc list-inside">
          {history.map((item: any) => (
            <li key={item.id}>
              {item.fullName} — {new Date(item.createdAt).toLocaleDateString()} — ${item.wage}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
