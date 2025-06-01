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
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9575c9512a68082fc3a246a7a1a25d8b4c3aad6a?placeholderIfAbsent=true&apiKey=885843f1fee842969266efa7faebd8fc"
            alt=""
            className="object-cover absolute inset-0 size-full"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b2e85311e85da8ff59271b14d5746aadbdd9ebc?placeholderIfAbsent=true&apiKey=885843f1fee842969266efa7faebd8fc"
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
