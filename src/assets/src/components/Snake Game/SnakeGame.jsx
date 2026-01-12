/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import "./SnakeGame.css";
const SnakeGame = () => {
  const gridSize = 20;

  const gameGrid = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill("")
  );

  const initialState = [5, 5];
  const [snakeBody, setSnakeBody] = useState([initialState]);
  const intervalRef = useRef()
  const isSnakebody = (xCor, yCor) => {
    return snakeBody.some(([x, y]) => x === xCor && y === yCor);
  };

  useEffect(()=>{
    intervalRef.current = setInterval(() => {
        
    },1000)

    return () => clearInterval(intervalRef.current)
  },[])

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          height: "50vh",
          width: "40%",
          border: "2px solid black",
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          borderRadius: "8px",
        }}
      >
        {gameGrid.map((row, rowInd) => {
          return row.map((col, colInd) => {
            return (
              <div
                key={`${rowInd} - ${colInd}`}
                style={{ border: "1px solid black" }}
                className={isSnakebody(rowInd, colInd) ? "active" : ""}
              ></div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default SnakeGame;
