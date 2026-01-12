import React, { useState } from 'react';
import './Chessboard.css';

const ChessBoard = () => {
  const [chessBoard] = useState(Array.from({ length: 8 }, () => Array(8).fill(0)));

  return (
    <div style={{left:'50%',justifyContent:'center',alignItems:'center',border:'2px solid gray'}}>
      {chessBoard.map((rowValue, rowIndex) => (
        <div style={{ display: 'flex' }} key={rowIndex}>
          {rowValue.map((colValue, colIndex) => (
            <div
              key={colIndex}
              className={
                (rowIndex % 2 === 0 && colIndex % 2 !== 0) ||
                (rowIndex % 2 !== 0 && colIndex % 2 === 0)
                  ? 'chessBox'
                  : 'chessBoxWhite'
              }
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
