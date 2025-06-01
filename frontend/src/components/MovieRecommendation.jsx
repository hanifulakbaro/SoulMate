import React from 'react';

const MovieRecommendation = () => {
  return (
    <article className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
      <div className="grow font-bold max-md:mt-10 max-md:max-w-full">
        <h2 className="mr-6 ml-7 text-5xl text-right text-sky-700 max-md:mx-2.5">
          Movies for your mood
        </h2>
        <div className="flex relative flex-col justify-center items-center px-20 py-32 mt-9 w-full text-xl text-center text-white min-h-[386px] max-md:px-5 max-md:py-24 max-md:max-w-full">
          <img
            src="/public/movieclapper.png"
            alt="Movies background"
            className="object-cover absolute inset-0 size-full"
          />
          <ul className="flex relative flex-col items-center mb-0 max-w-full w-[194px] max-md:mb-2.5">
            <li>Titanic</li>
            <li className="self-stretch mt-10">
              500 Days of Summer
            </li>
            <li className="mt-9">
              Harry Potter
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
};

export default MovieRecommendation;
