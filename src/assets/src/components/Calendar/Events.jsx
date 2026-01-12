/* eslint-disable no-unused-vars */
import React from "react";

const Events = ({ EventsData }) => {
  return (
    <div>
      {EventsData.map((item) => {

        let startHour = item.start.split(":")[0];
        let startMinute = item.start.split(":")[1];
        let endHour = item.end.split(":")[0];
        let endMinute = item.end.split(":")[1];

        const top = startHour * 5 + (startMinute/60)*5
        const height = (endHour - startHour) * 5 + ((endMinute-startMinute)/60)*5

        return <div style={{position:"absolute",height:`${height}rem`,top:`${top}rem`,width: "calc(100% - 6rem)",backgroundColor:"lightblue",left:"5rem",display:"flex",alignItems:"center",justifyContent:"center"}}>
                {item.title}
            </div>;
      })}
    </div>
  );
};

export default Events;
