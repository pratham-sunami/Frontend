/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const WhackAMole = ({ size }) => {
  const grid = Array.from({ length: 9 }, (_, i) => i);
  const [score, setScore] = useState(0);
  const [hammer, setHammer] = useState(false);
  const [hammerIndex, setHammerIndex] = useState(null);

  const generateWhackPosition = () => {
    return Math.floor(Math.random() * size);
  };

  const [postion, setPosition] = useState(generateWhackPosition());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition(generateWhackPosition());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleClick = (index) => {
    setHammerIndex(index);
    setHammer(true);
    if (index === postion) {
      setScore((prevScore) => prevScore + 10);

      setTimeout(() => {
        setPosition(generateWhackPosition());
      }, 100);
    }

    setTimeout(() => {
      setHammer(false);
    }, 300);
  };

  return (
    <>
      <h2>{score}</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "240px",
          gap: "10px ",
        }}
      >
        {grid.map((item, index) => {
          return (
            <div
              style={{
                width: "70px",
                height: "70px",
                border: "1px solid black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
              }}
              key={index}
              onClick={() => handleClick(index)}
            >
              {postion === index ? "👻" : ""}
              {hammer && hammerIndex === index && (
                <div
                  style={{
                    height: "30px",
                    width: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  🔨
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WhackAMole;
