import React from 'react';
import MusicRecommendation from './MusicRecommendation';
import MovieRecommendation from './MovieRecommendation';

const RecommendationsGrid = () => {
  return (
    <section className="self-center mt-20 ml-4 w-full max-w-[1085px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <MusicRecommendation />
        <MovieRecommendation />
      </div>
    </section>
  );
};

export default RecommendationsGrid;
