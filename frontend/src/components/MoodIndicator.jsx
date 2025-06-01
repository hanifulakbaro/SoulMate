import React from 'react';

const MoodIndicator = () => {
  return (
    <aside className="ml-5 w-[36%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col px-9 pt-4 pb-7 mt-8 w-full font-bold whitespace-nowrap rounded-3xl shadow-[4px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:mt-10">
        <h2 className="self-center text-4xl text-center text-sky-700">
          You're
        </h2>
        <div className="flex gap-5 justify-between mt-9 text-3xl text-white">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5a29f37a0e48034abb99c30a883ee14924d3eb5?placeholderIfAbsent=true&apiKey=885843f1fee842969266efa7faebd8fc"
            alt="Mood emoji"
            className="object-contain shrink-0 max-w-full aspect-square w-[101px]"
          />
          <div className="px-7 pt-3 pb-6 my-auto bg-sky-700 rounded-3xl max-md:px-5">
            Happy
          </div>
        </div>
      </div>
    </aside>
  );
};

export default MoodIndicator;
