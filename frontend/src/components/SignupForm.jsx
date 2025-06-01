"use client";

import * as React from "react";
import { InputField } from "./InputField";
import { SignupButton } from "./SignupButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const SignupForm = () => {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState(""); // State untuk umpan balik
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset pesan sebelum submit
    try {
      const response = await axios.post("http://localhost:8000/signup", {
        email,
        username,
        password,
      });

      console.log("Signup successful:", response.data);
      setMessage("Signup successful! Please log in."); // Umpan balik sukses
      setTimeout(() => navigate("/login"), 2000); // Arahkan ke halaman login setelah 2 detik
    } catch (error) {
      console.error("Signup failed:", error.response.data.detail);
      setMessage("Signup failed: " + error.response.data.detail); // Umpan balik kesalahan
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex relative flex-col items-center px-20 py-11 mt-12 mb-0 max-w-full rounded-3xl shadow-[4px_4px_4px_rgba(0,0,0,0.25)] w-[672px] max-md:px-5 max-md:mt-10 max-md:mb-2.5"
      style={{ background: "linear-gradient(120deg,white, #D3E3F3)", borderRadius: "20px", marginLeft: "70px", width: "550px" }}
    >
      <h1 
        className="text-5xl font-bold text-sky-700 max-md:text-4xl"
        style={{ color: "#00509D", marginBottom: "3px" }}
      >
        Sign Up
      </h1>

      {message && (
        <div className="mt-4 text-lg font-semibold text-center" style={{ color: message.includes("failed") ? "red" : "green" }}>
          {message}
        </div>
      )}

      <div 
        className="flex gap-1.5 mt-9 max-w-full text-center w-[289px]"
        style={{ color: "#706969", fontStyle: "italic", marginRight: "30px", alignItems: "center" }}
      >
        <p className="grow text-stone-500">Already have an account?</p>
        <div>
          <Link to="/login">
            <span 
              className="text-neutral-800 hover:text-sky-700 transition-colors"
              style={{ cursor: "pointer", marginTop: "16px", marginLeft: "-15px", marginRight: "10px", color: "black" }}
            >
              Log In
            </span>
          </Link>
        </div>
      </div>

      <InputField
        label="Enter your e-mail:"
        type="email"
        value={email}
        onChange={setEmail}
      />

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

      <SignupButton />
    </form>
  );
};