import React, { useEffect, useRef, useState } from "react";
import data from "./Data.json";
import "./Carousel.css";

const Carousel = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const imageRef = useRef();
  const handleNext = () => {
    setImageIndex((prev) => {
      if (prev === data.length - 1) return 0;

      return prev + 1;
    });
  };

  const handlePrev = () => {
    if (imageIndex === 0) {
      setImageIndex(data.length - 1);
    } else setImageIndex(imageIndex - 1);
  };

  useEffect(() => {
    imageRef.current = setInterval(handleNext, 1000);

    return () => clearInterval(imageRef.current);
  }, []);

  return (
    <div
      className="container"
      onMouseEnter={() => {
        clearInterval(imageRef.current);
      }}
      onMouseLeave={() => {
        imageRef.current = setInterval(handleNext, 1000);
      }}
    >
      <div className="left-btn" onClick={handlePrev}>
        {"<"}
      </div>
      <img
        className="image"
        src={data[imageIndex].download_url}
        alt="carousel"
      />
      <div className="right-btn" onClick={handleNext}>
        {">"}
      </div>
    </div>
  );
};

export default Carousel;
