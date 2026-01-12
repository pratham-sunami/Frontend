/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import './Stopwatch.css'

const Stopwatch = () => {
    const [timer,setTimer] = useState({
        hours:'',
        minutes:'',
        seconds:''
    })
    const timerRef = useRef()
    const [isRunning,setIsRunning] = useState(false)

    const handleStart = () => {
        setIsRunning(!isRunning);
    }

    const handleTime = (e,type) => {
        const key = Number(e.target.value) || 0;

        const copyTime = {...timer}

        copyTime[type] = key;

        if(Math.floor(copyTime.seconds / 60) > 0) copyTime.minutes += Math.floor(copyTime.seconds / 60);
        copyTime.seconds = copyTime.seconds % 60
        if(Math.floor(copyTime.minutes/60) > 0) copyTime.hours += Math.floor(copyTime.minutes/60)
        copyTime.minutes = copyTime.minutes % 60

        setTimer(copyTime)
    }

    const handleReset = () => {
        setTimer({ hours: '', minutes: '', seconds: '' });
        setIsRunning(false);
        clearInterval(timerRef.current);
    }

    useEffect(() => {
        if(isRunning){
            timerRef.current = setInterval(() => {
                
                setTimer((prev) => 
                    {
                    const copyTime = structuredClone(prev)
                    copyTime.seconds--;
                    if(copyTime.seconds < 0){
                        copyTime.minutes--
                        copyTime.seconds=59
                    }
                    if(copyTime.minutes < 0){
                        copyTime.hours--
                        copyTime.minutes=59
                    }
                    if(copyTime.hours <= 0  && copyTime.minutes <=0 && copyTime.seconds <=  0){
                        clearInterval(timerRef.current);
                        return {hours:0 , minutes:0 , seconds:0}
                    } 
                    return copyTime
                    });
            },1000)

        }

        return () => clearInterval(timerRef.current)
    },[isRunning])

  return (
    <div className='container' style={{margin:'0px',padding:'0px'}}>
       <div className='time-container'>
         <input className='time-input' type='text' value={timer.hours} disabled={isRunning} placeholder='HH' onChange={(e) => handleTime(e,'hours')}>

        </input>

        <input className='time-input' type='text' value={timer.minutes} disabled={isRunning} placeholder='MM' onChange={(e) => handleTime(e,'minutes')}>
        
        </input>

        <input className='time-input' type='text' value={timer.seconds} disabled={isRunning} placeholder='SS' onChange={(e) => handleTime(e,'seconds')}>
        
        </input>
       </div>

       <div style={{display:'flex',gap:'2rem'}}>
        <button onClick={() =>{
            handleStart();
        }}>{isRunning ? 'Pause' : 'Start'} </button>
        <button onClick={() => {
            handleReset()
        }}>Reset</button>
       </div>

    </div>
  )
}

export default Stopwatch
