"use client";

import * as React from "react";

export const InputField = ({
  label,
  type,
  value,
  onChange,
}) => {
  const id = React.useId();

  return (
    <div className="flex flex-col items-center w-full">
      <label
        htmlFor={id}
        className="mt-11 text-center text-neutral-800 max-md:mt-10"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex shrink-0 mt-4 max-w-full rounded-3xl border-sky-700 border-solid border-[3px] h-[50px] w-[350px] px-6"
        style={{ borderRadius: "20px", borderColor: "#00509D", marginBottom: "40px", fontFamily: "'Nunito', sans-serif", fontSize: "15px", textAlign: "center"}}
        aria-label={label}
      />
    </div>
  );
};
