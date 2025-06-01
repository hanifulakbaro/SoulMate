"use client";

import React, { useState } from "react";
import { Header2 } from "../components/Header2";
import { ContentSection } from "../components/ContentSection";
import { InputSection } from "../components/InputSection";
import { ActionButton } from "../components/ActionButton";
import axios from "axios";

function InputPage() {
  const [text, setText] = useState("");         // State untuk curhatan
  const [message, setMessage] = useState("");   // State untuk feedback
  const [loading, setLoading] = useState(false); // State loading

  const handleSubmit = async () => {
    setMessage("");
    setLoading(true);

    const token = localStorage.getItem("access_token"); // Pastikan key-nya access_token

    try {
      const response = await axios.post(
        "http://localhost:8000/submit-curhatan/",
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("user_story", text); // Simpan curhatan
      setMessage("Curhatan berhasil disimpan!");
      setText(""); // Reset input
      return true; // Penting untuk navigasi dari ActionButton
    } catch (error) {
      const errMsg = error.response?.data?.detail || "Terjadi kesalahan";
      setMessage("Gagal menyimpan curhatan: " + errMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen w-full pb-20 overflow-y-auto bg-gradient-to-b from-[#D3E3F3] to-white">
      <div className="flex flex-col px-20 pb-28 w-full max-md:px-5 max-md:pb-24 max-md:max-w-full">
        <Header2 />
        <ContentSection />
        <InputSection value={text} onChange={setText} />
        <ActionButton onClick={handleSubmit} />
        {message && (
          <div
            className="mt-4 text-lg font-semibold"
            style={{ color: message.includes("Gagal") ? "red" : "green" }}
          >
            {message}
          </div>
        )}
      </div>
    </main>
  );
}

export default InputPage;
