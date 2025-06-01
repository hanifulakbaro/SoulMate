import React from "react";
import { QuestionCard } from "./QuestionCard";

export function ContentSection() {
  return (
    <section className="z-10 self-center -mt-2.5 w-full max-w-[1193px] max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-6/12 max-md:ml-0 max-md:w-full">
          <img
            src="/public/input.png"
            alt="Content illustration"
            className="object-contain grow w-full aspect-[1.31] max-md:mt-10"
          />
        </div>
        <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <QuestionCard />
        </div>
      </div>
    </section>
  );
}