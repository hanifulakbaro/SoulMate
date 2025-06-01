"use client";
import React from 'react';
import { Header2 } from '../components/Header2';
import Title from '../components/Title';
import StorySection from '../components/StorySection';
import ChoiceSection from '../components/ChoiceSection';

const RecommendationPage = () => {
  return (
    <main className="overflow-hidden bg-white" style={{ backgroundColor: "#D3E3F3" }}>
      <div className="flex flex-wrap gap-7 px-20 pb-28 bg-blue-100 max-md:px-5 max-md:pb-24">
        <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
          <Header2 />
          <Title className="self-center ml-11">Based on your story....</Title>
          
          <div className="flex flex-col items-center pl-16 mt-20 w-full max-md:pl-5 max-md:mt-10 max-md:max-w-full">
            <div className="self-stretch max-md:max-w-full">
              <StorySection />
            </div>

            {/* Sekarang hanya `ChoiceSection` yang memanggil `MediaSection` */}
            <ChoiceSection />
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecommendationPage;

