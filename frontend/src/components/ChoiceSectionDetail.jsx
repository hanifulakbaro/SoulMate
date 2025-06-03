import React, { useRef } from 'react';
import Title from './Title'; // Import Title karena digunakan di sini
import ChoiceButton from './ChoiceButton'; // Import ChoiceButton karena digunakan di sini

const ChoiceSectionDetail = ({ onSelectChoice, selectedTab, mediaRef }) => {
  const handleTabClick = (tab) => {
    onSelectChoice(tab);
    setTimeout(() => {
      mediaRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section className="mt-20 max-md:mt-10" style={{ marginTop: "70px" }}>
      <article
        className="flex flex-col justify-center items-center px-7 py-7 w-full rounded-3xl shadow-[4px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full"
        style={{
          borderRadius: "20px",
          background: "linear-gradient(180deg, white, #D4E3F3)",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "50px",
          height: "200px",
        }}
      >
        <Title className="ml-14">How would you like to feel right now?</Title>

        <div
          className="flex flex-wrap gap-5 justify-between mt-16 ml-14 max-w-full w-[540px] max-md:mt-10"
          style={{ marginLeft: "110px" }}
        >
          <ChoiceButton
            onClick={() => handleTabClick("match")}
            isActive={selectedTab === "match"}
          >
            Stay in the moment
          </ChoiceButton>
          <ChoiceButton
            onClick={() => handleTabClick("uplift")}
            isActive={selectedTab === "uplift"}
          >
            Rise & Recharge
          </ChoiceButton>
        </div>
      </article>
    </section>
  );
};

export default ChoiceSectionDetail;