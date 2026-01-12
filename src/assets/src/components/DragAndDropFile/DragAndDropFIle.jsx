/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const DragAndDropFile = () => {

  const [selectedFiles , setSelectedFiles] = useState([]);
  const [dragging,setDragging] = useState(false)

  const handleChange = (e) => {
    const file = e.target.files
    setSelectedFiles([...selectedFiles,...file])
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true)
  }
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true)
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setSelectedFiles((prev) => {
      const updatedFiles = [...prev , ...e.dataTransfer.files]
      return updatedFiles
    })
  }

  const handleRemove = (item) => {
    setSelectedFiles((prev) => prev.filter((file) => file !== item));
  }

    
  return (
    <>
      <div
      style={{
        maxWidth: "600px",
        margin: "3rem auto",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        fontFamily: "Inter, Segoe UI, sans-serif",
        background: "#fff",
      }}
      
    >
      <div
        style={{
          border: "2px dashed #a8a8a8",
          borderRadius: "12px",
          padding: "2.5rem 1rem",
          textAlign: "center",
          marginBottom: "1.5rem",
          transition: "0.3s ease",
          cursor: "pointer",
          backgroundColor: "#f9f9f9",
        }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver} 
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p
          style={{
            color: "#666",
            fontSize: "1.1rem",
            marginBottom: "1rem",
            fontWeight: 500,
          }}
        >
          Drag & Drop your files here
        </p>

        <input
          type="file"
          multiple
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleChange}
        />

        <label
          htmlFor="fileInput"
          style={{
            backgroundColor: "#4caf50",
            padding: "0.6rem 1.4rem",
            color: "white",
            borderRadius: "8px",
            transition: "0.3s ease",
            cursor: "pointer",
            fontSize: "0.9rem",
            display: "inline-block",
            boxShadow: "0 4px 10px rgba(76, 175, 80, 0.3)",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#43a047")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
        >
          Browse Files
        </label>
      </div>

      <div>
          {
            selectedFiles.map((item,index) => {
                return (
                  <div style={{marginBottom:"10px",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.5rem",border:"1px solid black",borderRadius:"10px",backgroundColor: "#f9f9f9",fontWeight:"bold"}} key={index}>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
                      <img style={{height:"30px",width:"40px",margin:"3px" , borderRadius:"5px"}} src={URL.createObjectURL(item)} alt={item.name}></img>
                    <p>{item.name}</p>
                    </div>
                    <div>
                      <p style={{cursor:"pointer"}} onClick={() => handleRemove(item)}> X </p>
                    </div>
                  </div>
                )
            })
          }
      </div>
    </div>
    </>
  );
};

export default DragAndDropFile;