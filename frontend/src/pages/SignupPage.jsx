"use client";

import * as React from "react";
import { SignupForm } from "../components/SignupForm";

function SignupPage() {
  return (
    <main className="overflow-hidden text-xl font-medium">
      <section className="w-full bg-blue-100 max-md:max-w-full"
       style={{ background: "#D3E3F3"}}>
        <div className="flex relative flex-col px-20 pb-40 h-screen max-md:px-5 max-md:pb-24 max-md:max-w-full">
          <img
            src="signup.png"
            alt=""
            className="object-cover absolute inset-0 size-full"
          />
          <img
            src="logo.png"
            alt="Logo"
            className="object-contain self-center max-w-full aspect-[1.19] w-[126px]"
          />
          <SignupForm />
        </div>
      </section>
    </main>
  );
}

export default SignupPage;
