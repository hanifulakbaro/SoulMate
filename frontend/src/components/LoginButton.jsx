import * as React from "react";

export const LoginButton = () => {
  return (
    <button
      type="submit"
      className="self-start px-7 pt-3.5 pb-5 mt-11 text-lg font-bold text-white bg-sky-700 rounded-3xl max-md:px-5 max-md:mt-10 hover:bg-sky-800 transition-colors"
      style={{ backgroundColor: "#00509D", color: "white", marginLeft: "350px", marginBottom: "50px", boxShadow: "3px 3px 3px #A3A3A3" }}
    >
      Log In
    </button>
  );
};