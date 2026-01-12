/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import FaqData from "./Data.json";
import Cards from "./Cards";

const FAQ = () => {
  const [showIndex, setShowIndex] = useState(-1);

  const handleAnswer = (index) => {
    setShowIndex((prevIndex) => {
      if (index === prevIndex) return -1;
      return index;
    });
  };

  return (
    <div>
      {FaqData.faqs.map((data, index) => {
        return (
          <Cards
            key={index}
            data={data}
            showAns={index === showIndex}
            handleAnswer={() => handleAnswer(index)}
          />
        );
      })}
    </div>
  );
};

export default FAQ;
