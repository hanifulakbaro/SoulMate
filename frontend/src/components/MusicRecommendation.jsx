import React from 'react';

const MusicRecommendation = () => {
  return (
    <article className="w-6/12 max-md:ml-0 max-md:w-full">
      <div className="grow font-bold max-md:mt-10">
        <h2 className="text-5xl text-sky-700 max-md:mr-1">
          Melodies to vibe with
        </h2>
        <div className="flex relative flex-col items-center px-20 pt-20 pb-48 mt-7 ml-3 text-xl text-center aspect-[1.002] text-neutral-800 max-md:px-5 max-md:pb-24 max-md:ml-2.5">
          <img
            src="/public/musicplayer.png"
            alt="Music background"
            className="object-cover absolute inset-0 size-full"
          />
          <ul className="flex relative flex-col mb-0 max-w-full w-[185px] max-md:mb-2.5">
            <li className="max-md:mr-1 max-md:ml-1.5">
              Mata ke Hati - HIVI
            </li>
            <li className="self-center mt-11 max-md:mt-10">
              Remaja - HIVI
            </li>
            <li className="mt-10 max-md:mt-10">
              Satu-Satunya - HIVI
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
};

export default MusicRecommendation;
