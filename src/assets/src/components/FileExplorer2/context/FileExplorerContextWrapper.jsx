import React, { useState } from "react";
import fileExplorerData from "../FileExplorerData";
import { FileExplorerContext } from "./FileExplorerContext";

export default function FileExplorerContextWrapper({ children }) {
  const [nodeData, setNodeData] = useState(fileExplorerData);

  const editNode = (id, value) => {
    const updatedNode = { ...nodeData };
    updatedNode[id].name = value;
    setNodeData(updatedNode);
  };

  const deleteNode = (id) => {
    let parentId = nodeData[id].parentId;
    setNodeData((prev) => {
      const updatedNodes = { ...prev };
      if (parentId) {
        updatedNodes[parentId].children = updatedNodes[parentId].children.filter(
          (childId) => childId !== id
        );
      }
      const queue = [id];
      while (queue.length > 0) {
        let nodeToDelete = queue.shift();
        if (updatedNodes[nodeToDelete].children)
          queue.push(...updatedNodes[nodeToDelete].children);
        delete updatedNodes[nodeToDelete];
      }
      return updatedNodes;
    });
  };

  const addNode = (id, value) => {
    let type = value.includes(".") ? "file" : "folder";
    let newId = Date.now();
    const nodeToAdd = {
      id: newId,
      name: value,
      type,
      parentId: id,
      children: [],
    };

    setNodeData((prev) => {
      const updatedNode = { ...prev, [newId]: nodeToAdd };
      updatedNode[id].children.unshift(newId);
      return updatedNode;
    });
  };

  return (
    <FileExplorerContext.Provider
      value={{ nodeData, addNode, deleteNode, editNode }}
    >
      {children}
    </FileExplorerContext.Provider>
  );
}
