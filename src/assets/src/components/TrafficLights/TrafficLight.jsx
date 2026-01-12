/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './TrafficLight.css'

const TrafficLight = () => {
    const [currentLight , setCurrentLight] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentLight((prev) => {
                if(prev === 3) return 1
                else return prev + 1;
            })
        },1000)

        return () => clearInterval(intervalId);
    },[])

  return (
    <div className='container'>
      <div className={currentLight === 1 ? 'red-light' : 'traffic-light'}>
      </div>

      <div className={currentLight === 2 ? 'green-light' : 'traffic-light'}>
        
      </div>

      <div className={currentLight === 3 ? 'yellow-light' : 'traffic-light'}>
        
      </div>
    </div>
  )
}

export default TrafficLight
