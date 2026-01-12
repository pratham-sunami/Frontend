import React from "react";
import Checkbox from "./Checkbox";

const IndeterminateCheckbox = ({CheckboxData,handleChange}) => {
  return (
    <div style={{borderLeft:"1px solid black",margin:"0.5rem",padding:"0.5rem"}}>
      {CheckboxData.map((item) => {
        return (
          <div key={item.id}>
            <Checkbox
              id={item.id}
              label={item.label}
              status={item.status}
              handleChange={handleChange}
            />

            {item.children && item.children.length > 0 && (
              <IndeterminateCheckbox
                CheckboxData={item.children}
                handleChange={handleChange}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IndeterminateCheckbox;
