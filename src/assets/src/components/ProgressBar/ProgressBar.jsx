/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './ProgressBar.css'

const ProgressBar = () => {
    const [completion ,setCompletion] = useState(0)

    useEffect(() => {

        const intervalId = setInterval(() => {
            setCompletion((prev) => {
                if(prev >= 100){
                    clearInterval(intervalId)
                    return prev
                }
                return prev + 10
            })
        },1000)

        return () => clearInterval(intervalId)
    },[])

  return (
    <div className='container'>
      <div className='progressbar'>
        <div style={{transform: `translateX(${completion - 100}%)`}} className='child '>

      </div>
      </div>
    </div>
  )
}

export default ProgressBar
