import React from "react";
import MoodButton from "./MoodButton";

const StorySectionDetail = ({ story, emotion }) => {
  const emotionImages = {
    joy: "/joy.png",
    sadness: "/sadness.png",
    anger: "/anger.png",
    love: "/love.png",
    fear: "/fear.png",
    unknown: "/neutral.png",
  };

  const getEmoticon = (label) => {
    if (!label) return emotionImages.unknown;
    return emotionImages[label.toLowerCase()] || emotionImages.unknown;
  };

  const displayedEmotion =
    emotion && typeof emotion === "string"
      ? emotion.charAt(0).toUpperCase() + emotion.slice(1).toLowerCase()
      : "Neutral";

  const imageSrc = getEmoticon(emotion);

  return (
    <section className="flex gap-5 max-md:flex-col">
      {/* KIRI */}
      <article className="w-[67%] max-md:w-full">
        <div className="relative flex items-center justify-center h-[250px]">
          <img
            src="/bubble4.png"
            alt="Writing background"
            className="absolute inset-0 w-full h-full object-contain z-0"
          />
          <p className="z-10 text-[17px] font-nunito text-black text-center max-w-[600px] px-4">
            {story?.trim()
              ? story
              : "Tidak ada curhatan untuk ditampilkan."}
          </p>
        </div>
      </article>

      {/* KANAN */}
      <aside className="w-[33%] max-md:w-full max-md:ml-0 -ml-[120px]">
        <div className="flex flex-col items-center rounded-3xl shadow-[4px_4px_4px_rgba(0,0,0,0.25)] bg-gradient-to-br from-white to-[#D4E3F3] w-[270px] h-[250px]">
          <h3 className="text-4xl text-center text-sky-700 mt-4">
            Looks like you're feeling
          </h3>
          <img
            src={imageSrc}
            alt={`Mood: ${displayedEmotion}`}
            className="object-contain mt-6 w-[101px] aspect-square"
          />
          <div className="mt-6">
            <MoodButton>{displayedEmotion}</MoodButton>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default StorySectionDetail;
