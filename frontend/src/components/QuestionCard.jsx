import React from "react";

export function QuestionCard() {
  return (
    <div>
      <img
        src="question.png"
        alt="Card background"
        className="object-cover w-[500px] h-auto"
        style={{marginLeft: "20px"}}
      />
      <h1 style={{
        color: "#00509D",
        fontSize: "40px",
        fontWeight: "bold",
        marginTop: "-175px",
        marginLeft: "70px"
      }}>
        How's your day been?
      </h1>
    </div>
  );
}
