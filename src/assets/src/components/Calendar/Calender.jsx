import React from "react"
import Events from "./Events.json"
import CalenderView from "./CalenderView"
import EventsCard from "./Events"

const calender = () => {

    return (
        <div className="calendar">
            <div style={{position:"relative"}}>
                <div style={{position:"absolute",left:"5rem",backgroundColor:"lightgrey",height:"100%",width:"1px"}}></div>
                <CalenderView EventsData={Events}/>
                <EventsCard EventsData={Events}/>
            </div>
        </div>
    )
}

export default calender

