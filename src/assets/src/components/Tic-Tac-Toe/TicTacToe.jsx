/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './TicTacToe.css'
import { isWinner } from './Utils'
const TicTacToe = ({size = 3}) => {
    const [gridArr , setGridArr] = useState(Array.from({length:size} , () => Array(size).fill(null)))
    const [xTurn ,setXTurn] = useState(true)
    const isWin = isWinner(gridArr);


    const handleTurn = (rowInd,colInd) => {
        if(gridArr[rowInd][colInd] || isWin){
            return
        }
        const copyGridArr = structuredClone(gridArr)
        const turn = xTurn ? 'X' :'O'
        copyGridArr[rowInd][colInd] = turn
        setGridArr(copyGridArr);
        setXTurn(!xTurn)
    }
   
    const handleReset = () => {
        let arr = Array.from({length:size} , () => Array(size).fill(null))
        setGridArr(arr)
    }

  return (
    <div className='container1'>
        <div className='board' style={{'--size':size}}>
            {
                gridArr.map((row,rowInd) => {
                    return(row.map((col,colInd) => {
                        return(
                            <div className='cell' onClick={() => handleTurn(rowInd,colInd)}>
                                {col}
                            </div>    
                        )
                    })) 
                })
            }
        </div>
        <span>{isWin ? `${isWin} is a winner` : ""}</span>
        <button onClick={() => handleReset()}>Reset</button>
    </div>
  )
}

export default TicTacToe
