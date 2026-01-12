/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import './InteractiveShape.css'


const InteractiveShape = () => {
    const [list ,setList] = useState([])
    const queue = useRef([])
    const timerId = useRef([])
    const [gridArr,setGridArr] = useState(Array.from({length: 3},() => new Array(3).fill(false)));

    const AddCell = (rowInd,colInd,flag) => {
        if(timerId.current.length > 0 && flag){
            return;
        }
        if(gridArr[rowInd][colInd] && flag){
            return;
        }

        setGridArr((prevGrid) => {
            const gridCopy = structuredClone(prevGrid);
            gridCopy[rowInd][colInd] = flag;
            if(flag) queue.current.push([rowInd,colInd])
            return gridCopy
        })
    }

    useEffect(() => {
        if(queue.current.length === 9){
            queue.current.forEach(([rowInd,colInd],index) => {
                timerId.current[index] = setTimeout(() => {
                    AddCell(rowInd,colInd,false);
                    if (index === timerId.current.length - 1) timerId.current = [];
                },1000 * (index + 1))
            })
            queue.current = []
        }
    },[gridArr])

    useEffect(() => {
    return () => {
      timerId.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  return (
    <div className='container'>
        <div className='grid-container'>
            {
                gridArr.map((row,rowInd) => {
                   return (
                     <div key={`${row-rowInd}`} style={{display:'flex' ,margin:'1rem',gap:'1rem',width:'100%'}}>
                        {row.map((col,colInd) => {
                        return(
                            <div key={`${rowInd} - ${colInd}`} className={`cell ${col ? 'active' : ''}`} onClick={() => AddCell(rowInd,colInd,true)} ></div>
                        )
                        })}
                     </div>
                   )
                })
            }
        </div>
    </div>
  )
}

export default InteractiveShape
