import React, { useState } from "react";
import "./StarRating.css"

const StarRating = ({ starsCount = 10}) => {
    const [goldindex,setGoldIndex] = useState(null)
    const [hoverIndex,setHoverIndex] = useState(null)

    const handleClick = (id) =>{
        setGoldIndex(id+1)
    }

  return (
    <div>
      {Array.from({ length: starsCount }).map((_, index) => (
        <span key={index} className={index < goldindex  || index < hoverIndex? "gold" : "star" } onClick={() => handleClick(index)} onMouseEnter={() =>{
            if(index > goldindex){
                setHoverIndex(index+1);
            } 
        }}
        onMouseLeave={() =>{
            if(index > goldindex){
                setHoverIndex(null);
            } 
        }}
        >
          {"☆"}          
        </span>
      ))}
    </div>
  );
};

export default StarRating;
