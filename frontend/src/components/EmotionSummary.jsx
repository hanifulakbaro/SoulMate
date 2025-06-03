import React from 'react';

const EmotionSummary = ({ emotionCounts, mostFrequent, leastFrequent, timeUnit }) => {
  // Descriptions and images for each emotion
  const descriptions = {
    joy: {
      most: {
        message: "Joy seemed to follow you everywhere! May your happiness continue to inspire those around you. ✨",
        img: "joy.png",
        label: "Most Frequent Joy",
      },
      least: {
        message: "Happiness felt distant, but even small joys matter. May you discover moments that bring light to your day. 💛",
        img: "joy.png",
        label: "Least Frequent Joy",
      },
    },
    sadness: {
      most: {
        message: "Melancholy stayed close, but emotions make us human. May you find comfort in warmth and healing. 🌿",
        img: "sadness.png",
        label: "Most Frequent Sadness",
      },
      least: {
        message: "Sadness rarely visited you—what a beautiful thing! May your heart stay light and full of hope. 🌟",
        img: "sadness.png",
        label: "Least Frequent Sadness",
      },
    },
    anger: {
      most: {
        message: "Frustration came often, but storms always pass. May patience and understanding guide your path. 🌤",
        img: "anger.png",
        label: "Most Frequent Anger",
      },
      least: {
        message: "Anger was a rare guest in your life. May peace and calm continue to surround you. 🌼",
        img: "anger.png",
        label: "Least Frequent Anger",
      },
    },
    love: {
      most: {
        message: "Your heart is full of love! May your warmth and kindness reach even more souls. ❤️",
        img: "love.png",
        label: "Most Frequent Love",
      },
      least: {
        message: "Love felt distant, but it's never truly gone. May connections find their way to you in unexpected ways. 💕",
        img: "love.png",
        label: "Least Frequent Love",
      },
    },
    fear: {
      most: {
        message: "Uncertainty clouded many moments, but strength is in you. May courage lead you beyond the shadows. 🔥",
        img: "fear.png",
        label: "Most Frequent Fear",
      },
      least: {
        message: "Fear barely touched your journey! May your confidence continue to light your way. ⚡",
        img: "fear.png",
        label: "Least Frequent Fear",
      },
    },
  };

  const mostData = descriptions[mostFrequent]?.most;
  const leastData = descriptions[leastFrequent]?.least;

  return (
    <section
      className="grow text-2xl font-bold text-center text-sky-700 max-md:mt-10 max-md:max-w-full"
      style={{ marginBottom: "30px" }}
    >
      {/* Most Frequent Emotion */}
      {mostData && (
        <article
          className="flex flex-col px-7 py-7 w-full rounded-3xl shadow-[4px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full"
          style={{
            borderRadius: "20px",
            background: "linear-gradient(190deg,white, #D4E3F3)",
            width: "390px",
            marginLeft: "150px",
            marginTop: "-70px",
          }}
        >
          <div className="flex gap-5 justify-between self-center max-w-full w-[339px]">
            <img
              src={mostData.img}
              alt={`${mostFrequent} emotion`}
              className="object-contain shrink-0 max-w-full aspect-square w-[141px]"
              style={{ marginTop: "10px", marginLeft: "20px" }}
            />
            <p className="my-auto" style={{ marginRight: "20px" }}>
              Counts of {mostFrequent}: {emotionCounts[mostFrequent]} time
              {emotionCounts[mostFrequent] === 1 ? "" : "s"}/{timeUnit}
            </p>
          </div>
          <p className="mt-3.5 max-md:max-w-full" style={{ marginTop: "-5px" }}>
            {mostData.message}
          </p>
        </article>
      )}

      {/* Least Frequent Emotion */}
      {leastData && (
        <article
          className="flex flex-col px-7 py-7 w-full rounded-3xl shadow-[4px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full"
          style={{
            borderRadius: "20px",
            background: "linear-gradient(170deg,white, #D4E3F3)",
            width: "390px",
            marginLeft: "150px",
            marginTop: "30px",
          }}
        >
          <div className="flex gap-5 justify-between self-center max-w-full w-[339px]">
            <img
              src={leastData.img}
              alt={`${leastFrequent} emotion`}
              className="object-contain shrink-0 max-w-full aspect-square w-[141px]"
              style={{ marginTop: "10px", marginLeft: "20px" }}
            />
            <p className="my-auto">
              Counts of {leastFrequent}: {emotionCounts[leastFrequent]} time
              {emotionCounts[leastFrequent] === 1 ? "" : "s"}/{timeUnit}
            </p>
          </div>
          <p className="mt-3.5 max-md:max-w-full" style={{ marginTop: "-5px" }}>
            {leastData.message}
          </p>
        </article>
      )}
    </section>
  );
};

export default EmotionSummary;