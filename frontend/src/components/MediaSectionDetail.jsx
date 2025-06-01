import React from "react";
import Title from "./Title";

const MediaSectionDetail = ({ music, movie }) => {
  return (
    <section className="mt-[110px] max-md:mt-10">
      <Title className="ml-8">Your personalized media recommendations</Title>

      <div className="mt-6 ml-12 w-full max-w-[764px]">
        <div className="flex gap-5 max-md:flex-col">
          {/* MUSIC */}
          <div className="relative w-[56%] max-md:w-full">
            <img
              src="/playermusic.png"
              alt="Music recommendation"
              className="object-contain w-full aspect-[0.78] max-md:mt-10 ml-[-30px]"
            />
            <div className="absolute top-[90px] left-5 right-5 text-white text-lg font-bold leading-tight z-10">
              {Array.isArray(music) && music.length > 0 ? (
                music.map((m, i) => (
                  <div key={i}>
                    {m.title} - <span className="italic">{m.artist}</span>
                  </div>
                ))
              ) : (
                <div>No music recommendation available</div>
              )}
            </div>
          </div>

          {/* MOVIES */}
          <div className="relative w-[44%] max-md:w-full ml-5">
            <img
              src="/clappermovie.png"
              alt="Movie recommendation"
              className="object-contain w-full aspect-[0.54] max-md:mt-10 ml-[70px] -mt-[30px] mb-[50px]"
            />
            <div className="absolute top-[290px] left-[100px] w-[300px] text-white text-lg font-bold leading-tight z-10">
              {Array.isArray(movie) && movie.length > 0 ? (
                movie.map((m, i) => <div key={i}>{m.title}</div>)
              ) : (
                <div>No movie recommendation available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSectionDetail;
