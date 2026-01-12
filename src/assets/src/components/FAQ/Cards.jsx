import React from "react";

const Cards = ({ data, showAns, handleAnswer }) => {
  return (
    <div style={{ border: "1px solid black", padding: "1rem", margin: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {data.question}
          {showAns && <div style={{}}>{data.answer}</div>}
        </div>
        <p style={{ cursor: "pointer" }} onClick={() => handleAnswer()}>
          {" "}
          +{" "}
        </p>
      </div>
    </div>
  );
};

export default Cards;
