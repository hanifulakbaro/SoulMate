"use client";

import * as React from "react";
import { InputField } from "./InputField";
import { LoginButton } from "./LoginButton";
import { Link, useNavigate } from "react-router-dom"; // Pastikan ini diimpor dengan benar
import axios from "axios"; // Pastikan axios terinstal

export const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate(); // Untuk navigasi setelah login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/token", new URLSearchParams({
        username,
        password,
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("access_token", response.data.access_token);
      console.log("Login successful:", response.data);
      navigate("/input"); // Arahkan ke halaman input setelah login
    } catch (error) {
      console.error("Login failed:", error.response.data.detail);
      alert("Login failed: " + error.response.data.detail); // Tampilkan pesan kesalahan
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="self-end flex relative flex-col items-center px-20 py-11 mt-12 mb-0 max-w-full rounded-3xl shadow-[4px_4px_4px_rgba(0,0,0,0.25)] w-[672px] max-md:px-5 max-md:mt-10 max-md:mb-2.5"
      style={{ background: "linear-gradient(120deg,white, #D4E3F3)", borderRadius: "20px", marginRight: "80px", width: "550px", top: "6%" }}
    >
      <h1 
        className="text-5xl font-bold text-sky-700 max-md:text-4xl"
        style={{ color: "#00509D", marginBottom: "7px" }}
      >
        Log In
      </h1>

      <div 
        className="flex gap-1.5 mt-9 max-w-full text-center w-[289px]"
        style={{ display: "flex", alignItems: "center", color: "#706969", fontStyle: "italic", marginRight: "10px" }}
      >
        <p className="text-stone-500">New to SoulMate?</p>
        <Link to="/signup">
          <span 
            className="text-neutral-800 hover:text-sky-700 transition-colors"
            style={{ cursor: "pointer", color: "black", marginLeft: "5px" }}
          >
            Create new account
          </span>
        </Link>
      </div>

      <InputField
        label="Enter your username:"
        type="text"
        value={username}
        onChange={setUsername}
      />

      <InputField
        label="Enter your password:"
        type="password"
        value={password}
        onChange={setPassword}
      />

      <LoginButton />
    </form>
  );
};