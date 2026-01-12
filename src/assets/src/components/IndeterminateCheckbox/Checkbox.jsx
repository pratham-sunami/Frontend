import React, { useEffect, useRef } from "react";
import { STATUS } from "./constants/Constants";

const Checkbox = ({ id, label, status, handleChange }) => {
  const checkboxRef = useRef();

  useEffect(() => {
    if (status === STATUS.INDETERMINATE) {
      checkboxRef.current.indeterminate = true;
    } else {
      checkboxRef.current.indeterminate = false;
    }
  }, [status]);

  return (
    <div style={{ gap:"10px",display:"flex",alignItems:"center",margin:"5px"}}>
      <input
        ref={checkboxRef}
        type="checkbox"
        checked={status === STATUS.CHECKED}
        onChange={() => handleChange(id)}
      ></input>
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;
