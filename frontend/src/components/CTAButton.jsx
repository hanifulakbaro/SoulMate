"use client";
import * as React from "react";
import { Link } from "react-router-dom";

export const CTAButton = ({
  children,
  className = "",
}) => {
  return (
    <Link to="/login">
        <button
            style={{ width: "280px", height: "90px", backgroundColor: "#00509D", color: "white", fontSize: "32px", fontWeight: "600", marginTop: "30px", marginBottom: "30px"}}
            className={"px-16 py-5 text-4xl font-bold text-white bg-sky-700 rounded-3xl cursor-pointer shadow-[4px_4px_4px_rgba(163,163,163,1)] max-md:px-11 max-md:py-4 max-md:text-3xl max-sm:px-9 max-sm:py-3 max-sm:text-2xl ${className}"}
        >
        {children}
        </button>
    </Link>
  );
};

