"use client";

import * as React from "react";
import { LoginForm } from "../components/LoginForm";

function LoginPage() {
  return (
    <main className="overflow-hidden text-xl font-medium">
      <section className="w-full bg-blue-100 max-md:max-w-full"
       style={{ background: "#D3E3F3"}}>
        <div className="flex relative flex-col px-20 pb-40 h-screen max-md:px-5 max-md:pb-24 max-md:max-w-full">
          <img
            src="login.png"
            alt="Login"
            className="object-cover absolute inset-0 size-full"
          />
          <img
            src="logo.png"
            alt="Logo"
            className="object-contain self-center max-w-full aspect-[1.19] w-[126px]"
          />
          <LoginForm />
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
