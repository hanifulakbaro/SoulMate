import React from "react";

export function InputSection({ value, onChange }) {
  return (
    <section className="flex items-center justify-center w-full mt-10">
      <div className="flex items-end relative">
        {/* Bubble input besar */}
        <div className="relative w-[900px] h-[250px] ml-[-5px]">
          <img
            src="/public/bubble.png"
            alt="Input background"
            className="absolute top-0 left-0 w-full h-full object-contain"
          />

          {/* Textarea */}
          <textarea
            placeholder="Write here..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute top-[45px] left-[110px] right-[50px] bottom-[40px]
              bg-transparent resize-none border-none outline-none
              text-black text-base w-[calc(80%-100px)] h-[calc(95%-80px)]"
            style={{
              fontSize: "17px",
              fontFamily: "'Nunito', sans-serif",
            }}
          />
        </div>

        {/* Icon payung */}
        <img
          src="/public/icon.png"
          alt="Icon"
          className="object-contain w-[110px] h-[110px] ml-4"
          style={{ marginBottom: "60px" }}
        />
      </div>
    </section>
  );
}
