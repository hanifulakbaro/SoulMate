"use client";
import * as React from "react";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";

const LandingPage = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <main 
        className="flex flex-col h-screen w-full pb-20 overflow-y-auto bg-gradient-to-b from-[#D3E3F3] to-white">
        <Header />
        <img
            src="/public/landing.png"
            alt="landing"
            className="max-w-full max-h-screen object-contain"
        />
        <HeroSection />
      </main>
    </>
  );
};

export default LandingPage;
