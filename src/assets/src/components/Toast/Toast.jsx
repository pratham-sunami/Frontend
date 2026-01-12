import React, { useRef, useState } from "react";
import "./Toast.css";

const Toast = () => {
  const [toastList, setToastList] = useState([]);
  const timersRef = useRef({});
  const handleToast = (content, type) => {
    const id = new Date().getTime();
    const toast = {
      id,
      content,
      type,
    };
    setToastList((prevList) => [...prevList, toast]);

    timersRef.current[id] = setTimeout(() => handleClose(id), 5000);
  };

  const handleClose = (id) => {
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
    setToastList((prevList) => prevList.filter((toast) => toast.id !== id));
  };

  return (
    <>
      <div className="button-container">
        <button
          className="button"
          onClick={() => {
            handleToast("Success", "success");
          }}
        >
          Success
        </button>
        <button
          className="button"
          onClick={() => {
            handleToast("Failed", "failed");
          }}
        >
          Fail
        </button>
        <button
          className="button"
          onClick={() => {
            handleToast("Pending", "pending");
          }}
        >
          Pending
        </button>
      </div>

      <div className="toast-container">
        {toastList.map(({ id, content, type }) => (
          <div key={id} className={`toast ${type}`}>
            <p>{content}</p>
            <span onClick={() => handleClose(id)}>X</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Toast;
