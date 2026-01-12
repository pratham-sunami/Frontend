/* eslint-disable no-unused-vars */
import React from "react"

const CalenderView = () => {
    const arr = Array.from({length : 24},(_,index) => index)

    return (
        <div>
            {arr.map((item) => {
                return (
                    <>
                        <div style={{height:"5rem",borderBottom:"1px solid grey",paddingLeft:"1rem",fontWeight:"1"}}>
                            <div style={{}}>
                            {item}:00
                        </div>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default CalenderView