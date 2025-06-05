import React from "react";
import { useNavigate } from "react-router-dom";

export function ActionButton({ onClick }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    const success = await onClick(); // Submit curhatan
    if (success) {
      navigate("/recom"); // Navigasi jika sukses
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        width: "160px",
        height: "50px",
        backgroundColor: "#00509D",
        color: "white",
        fontSize: "17px",
        fontWeight: "600",
        marginTop: "20px",
        marginBottom: "50px",
        marginLeft: "310px",
      }}
      className={
        "px-16 py-5 text-4xl font-bold text-white bg-sky-700 rounded-3xl cursor-pointer shadow-[4px_4px_4px_rgba(163,163,163,1)] max-md:px-11 max-md:py-4 max-md:text-3xl max-sm:px-9 max-sm:py-3 max-sm:text-2xl"
      }
    >
      Check this out!
    </button>
  );
}


// import React from "react";
// import { useNavigate } from "react-router-dom";

// export function ActionButton({ onClick }) {
//   const navigate = useNavigate();

//   const handleClick = async () => {
//     const success = await onClick(); // Submit curhatan
//     if (success) {
//       navigate("/recom"); // Navigasi jika sukses
//     }
//   };

//   return (
//     <button
//       onClick={handleClick}
//       style={{
//         width: "160px",
//         height: "50px",
//         backgroundColor: "#00509D",
//         color: "white",
//         fontSize: "17px",
//         fontWeight: "600",
//         marginTop: "20px",
//         marginBottom: "50px",
//         marginLeft: "310px",
//       }}
//       className={
//         "px-16 py-5 text-4xl font-bold text-white bg-sky-700 rounded-3xl cursor-pointer shadow-[4px_4px_4px_rgba(163,163,163,1)] max-md:px-11 max-md:py-4 max-md:text-3xl max-sm:px-9 max-sm:py-3 max-sm:text-2xl"
//       }
//     >
//       Check this out!
//     </button>
//   );
// }