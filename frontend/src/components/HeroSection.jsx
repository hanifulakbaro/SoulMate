import * as React from "react";
import { CTAButton } from "./CTAButton";

export const HeroSection = () => {
  return (
    <section className="w-full flex flex-col items-center justify-start px-4 text-center pb-20">
      <h1 style={{ color: "#00509D", fontSize: "65px", lineHeight: "1.2", marginBottom: "2px", marginTop: "30px" }} className="mb-10 text-6xl font-bold leading-tight max-md:text-5xl max-sm:text-4xl">
        Want to talk it out?
      </h1>
      <p style={{ color: "#00509D", fontSize: "30px", lineHeight: "0.1", fontWeight: "500", marginTop: "25px"}} className="mb-10 text-2xl font-medium leading-tight max-md:text-xl max-sm:text-lg">
        We'll find the right tunes and movies to make you feel better!
      </p>
      <CTAButton className="mt-16 -mb-10">Open up here</CTAButton>
    </section>
  );
};
