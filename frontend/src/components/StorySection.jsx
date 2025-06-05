"use client";

import React, { useEffect, useState } from "react";
import MoodButton from "./MoodButton";
import axios from "axios";

const StorySection = () => {
  const [curhatan, setCurhatan] = useState("Loading...");
  const [emotion, setEmotion] = useState("");

  useEffect(() => {
    const fetchLastCurhatan = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get("http://localhost:8000/get-last-curhatan/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurhatan(response.data.text);
        setEmotion(response.data.label);
      } catch (err) {
        setCurhatan("Gagal memuat curhatan.");
        setEmotion("Unknown");
        console.error(err);
      }
    };

    fetchLastCurhatan();
  }, []);

  const emotionImages = {
    joy: "joy.png",
    sadness: "sadness.png",
    anger: "anger.png",
    love: "love.png",
    fear: "fear.png",
    unknown: "neutral.png",
  };

  const getEmoticon = (label) => {
    if (!label) return emotionImages.unknown;
    return emotionImages[label.toLowerCase()] || emotionImages.unknown;
  };

  return (
    <section className="flex gap-5 max-md:flex-col">
      {/* KIRI */}
      <article className="w-[67%] max-md:w-full max-md:ml-0">
        <div className="relative flex items-center justify-center h-[250px]">
          <img
            src="bubble4.png"
            alt="Writing background"
            className="absolute inset-0 w-full h-full object-contain z-0"
          />
          <p className="z-10 text-[17px] font-nunito text-black text-center max-w-[600px] px-4">
            {curhatan || "Write here..."}
          </p>
        </div>

      </article>

      {/* KANAN */}
      <aside className="w-[33%] max-md:w-full ml-5 max-md:ml-0">
        <div
          className="flex flex-col items-center rounded-3xl shadow-[4px_4px_4px_rgba(0,0,0,0.25)]"
          style={{
            background: "linear-gradient(130deg, white, #D4E3F3)",
            width: "270px",
            height: "250px",
            marginLeft: "-120px",
            borderRadius: "20px",
          }}
        >
          <h3 className="text-4xl text-center text-sky-700 mt-4">
            Looks like you're feeling
          </h3>
          <img
            src={getEmoticon(emotion)}
            alt="Mood indicator"
            className="object-contain mt-6 max-w-full aspect-square w-[101px]"
          />
          <div className="mt-6">
            <MoodButton>
              {emotion ? emotion.charAt(0).toUpperCase() + emotion.slice(1) : "Neutral"}
            </MoodButton>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default StorySection;


// "use client";

// import React, { useEffect, useState } from "react";
// import MoodButton from "./MoodButton";
// import axios from "axios";

// const StorySection = () => {
//   const [curhatan, setCurhatan] = useState("Loading...");
//   const [emotion, setEmotion] = useState("");

//   useEffect(() => {
//     const fetchLastCurhatan = async () => {
//       const token = localStorage.getItem("access_token");
//       try {
//         const response = await axios.get("http://localhost:8000/get-last-curhatan/", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setCurhatan(response.data.text);
//         setEmotion(response.data.label);
//       } catch (err) {
//         setCurhatan("Gagal memuat curhatan.");
//         setEmotion("Unknown");
//         console.error(err);
//       }
//     };

//     fetchLastCurhatan();
//   }, []);

//   const emotionImages = {
//     joy: "joy.png",
//     sadness: "sadness.png",
//     anger: "anger.png",
//     love: "love.png",
//     fear: "fear.png",
//     unknown: "neutral.png",
//   };

//   const getEmoticon = (label) => {
//     if (!label) return emotionImages.unknown;
//     return emotionImages[label.toLowerCase()] || emotionImages.unknown;
//   };

//   return (
//     <section className="flex gap-5 max-md:flex-col">
//       {/* KIRI */}
//       <article className="w-[67%] max-md:w-full max-md:ml-0">
//         <div className="relative flex items-center justify-center h-[250px]">
//           <img
//             src="bubble4.png"
//             alt="Writing background"
//             className="absolute inset-0 w-full h-full object-contain z-0"
//           />
//           <p className="z-10 text-[17px] font-nunito text-black text-center max-w-[600px] px-4">
//             {curhatan || "Write here..."}
//           </p>
//         </div>

//       </article>

//       {/* KANAN */}
//       <aside className="w-[33%] max-md:w-full ml-5 max-md:ml-0">
//         <div
//           className="flex flex-col items-center rounded-3xl shadow-[4px_4px_4px_rgba(0,0,0,0.25)]"
//           style={{
//             background: "linear-gradient(130deg, white, #D4E3F3)",
//             width: "270px",
//             height: "250px",
//             marginLeft: "-120px",
//             borderRadius: "20px",
//           }}
//         >
//           <h3 className="text-4xl text-center text-sky-700 mt-4">
//             Looks like you're feeling
//           </h3>
//           <img
//             src={getEmoticon(emotion)}
//             alt="Mood indicator"
//             className="object-contain mt-6 max-w-full aspect-square w-[101px]"
//           />
//           <div className="mt-6">
//             <MoodButton>
//               {emotion ? emotion.charAt(0).toUpperCase() + emotion.slice(1) : "Neutral"}
//             </MoodButton>
//           </div>
//         </div>
//       </aside>
//     </section>
//   );
// };

// export default StorySection;