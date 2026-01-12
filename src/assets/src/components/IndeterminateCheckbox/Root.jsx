/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { treeData } from "./constants/TreeData";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import { STATUS } from "./constants/Constants";

const Root = () => {
  const [data, setData] = useState(treeData);

  const computedStatus = (node) => {
    if (!node.children || node.children.length === 0) {
      return;
    }

    let checkedCount = 0;
    let uncheckedCount = 0;
    let indeterminateCount = 0;
    node.children.map((child) => {
      if (child.status === STATUS.CHECKED) checkedCount++;
      if (child.status === STATUS.UNCHECKED) uncheckedCount++;
      if (child.status === STATUS.INDETERMINATE) indeterminateCount++;
    });

    if (checkedCount === node.children.length) {
      node.status = STATUS.CHECKED;
    } else if (uncheckedCount === node.children.length) {
      node.status = STATUS.UNCHECKED;
    } else if (checkedCount > 0 || indeterminateCount > 0) {
      node.status = STATUS.INDETERMINATE;
    }
  };

  const traverse = (targetId, node, isDescendent, ancestorStatus) => {
    if (node.id === targetId) {
      node.status =
        node.status === STATUS.CHECKED ? STATUS.UNCHECKED : STATUS.CHECKED;
    }

    if (isDescendent) {
      node.status = ancestorStatus;
    }

    if (node.children && node.children.length > 0) {
      node.children.map((child) => {
        traverse(
          targetId,
          child,
          node.id === targetId || isDescendent,
          node.status
        );
      });
    }
    computedStatus(node);
  };

  const handleChange = (id) => {
    const cloneCheckboxState = structuredClone(data);

    cloneCheckboxState.map((node) => {
      traverse(id, node);
    });

    setData(cloneCheckboxState);
  };

  return (
    <IndeterminateCheckbox CheckboxData={data} handleChange={handleChange} />
  );
};

export default Root;
