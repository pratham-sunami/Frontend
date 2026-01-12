/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";

const TypingEffect = ({ text, delay }) => {
  const [displayText, setDisplayText] = useState("");
  const direction = useRef(1);
  const length = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (direction.current === 1) {
        length.current = length.current + 1;
        const newText = text.slice(0, length.current);
        setDisplayText(newText);
        if (length.current === text.length) direction.current = 0;
      } else {
        length.current = length.current - 1;
        if (length.current < 0) direction.current = 1;

        const newText = text.slice(0, length.current);
        setDisplayText(newText);
      }
    }, delay);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>{displayText}</div>;
};

export default TypingEffect;
