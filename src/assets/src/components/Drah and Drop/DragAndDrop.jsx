import React, { useRef, useState } from "react";

const DragAndDrop = () => {
  const [initialData, setInitialData] = useState({
    Todo: [
      "Design UI mockups",
      "Set up project repository",
      "Write unit test",
      "Integrate payment gateway",
    ],
    "In Progress": [
      "Develop authentication flow",
      "Implement responsive design",
    ],
    Completed: [
      "Set up CI/CD pipeline",
      "Conduct code reviews",
      "Deploy initial version to staging",
    ],
  });

  const dragItem = useRef();
  const dragContainer = useRef();

  const handleDragStart = (e, value, container) => {
    dragItem.current = value;
    dragContainer.current = container;
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleDrop = (e, container) => {
    const prevItem = dragItem.current;
    const prevContainer = dragContainer.current;

    setInitialData((prev) => {
      const updatedInitialValue = { ...prev };
      updatedInitialValue[prevContainer] = updatedInitialValue[
        prevContainer
      ].filter((item) => item !== prevItem);
      updatedInitialValue[container].push(prevItem);
      return updatedInitialValue;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        height: "800px",
        gap: "3rem",
        padding: "5rem",
      }}
    >
      {Object.keys(initialData).map((container, index) => {
        return (
          <div
            key={index}
            onDrop={(e) => handleDrop(e, container)}
            onDragOver={handleDragOver}
            style={{
              padding: "1rem",
              height: "80%",
              width: "40%",
              border: "1px solid black",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>{container}</h2>
            {initialData[container].map((values) => {
              return (
                <div
                  onDragStart={(e) => handleDragStart(e, values, container)}
                  onDragEnd={handleDragEnd}
                  draggable
                  style={{
                    margin: "0 0 8px 0",
                    cursor: "move",
                    background: "#f0f0f0",
                    padding: "10px",
                  }}
                >
                  {values}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DragAndDrop;
