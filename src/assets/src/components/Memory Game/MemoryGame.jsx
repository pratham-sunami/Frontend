/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const MemoryGame = () => {
  const gridArr = Array.from({ length: 18 }, (_, index) => index + 1);
  const completeArr = [...gridArr, ...gridArr];

  completeArr.sort(() => Math.random() - 0.5);

  const [gridBoxes, setGridBoxes] = useState(
    completeArr.map((element, index) => ({
      id: index,
      value: element,
      isVisible: false,
    }))
  );
  const [openedBoxes, setOpenedBoxes] = useState([]);
  const [isLock, setIsLock] = useState(false);

  useEffect(() => {
    if (openedBoxes.length === 2) {
      setIsLock(true);
      setTimeout(() => {
        if (
          gridBoxes[openedBoxes[0]].value !== gridBoxes[openedBoxes[1]].value
        ) {
          setGridBoxes((prevCards) => {
            const copyCards = [...prevCards];
            copyCards[openedBoxes[0]].isVisible = false;
            copyCards[openedBoxes[1]].isVisible = false;
            return copyCards;
          });
        }
        setOpenedBoxes([]);
        setIsLock(false);
      }, 3000);
    }
  }, [openedBoxes]);

  const handleClickedBox = (index) => {
    if (gridBoxes[index].isVisible || isLock) return;

    const updatedGridBoxes = [...gridBoxes];
    updatedGridBoxes[index].isVisible = true;
    setOpenedBoxes([...openedBoxes,index])
    setGridBoxes(updatedGridBoxes);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6,3rem)" }}>
      {gridBoxes.map((box, index) => {
        return (
          <div
            key={box.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid gray",
              margin: "2px",
              height: "40px",
              width: "40px",
              backgroundColor: "cyan",
              cursor:"pointer"
            }}
            onClick={() => handleClickedBox(index)}
          >
            {box.isVisible ? box.value : "?"}
          </div>
        );
      })}
    </div>
  );
};

export default MemoryGame;
