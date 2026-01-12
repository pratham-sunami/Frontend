import React, { useContext, useState } from "react";
import Input from "./Input";
import { FileExplorerContext } from "./context/FileExplorerContext";

const FileExplorer2 = ({ id = 1 }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showChildren , setShowChildren] = useState(false);
  const [showAddInput , setShowAddInput] = useState(false);

  const {nodeData, deleteNode , addNode, editNode} = useContext(FileExplorerContext)

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem",
            backgroundColor: "light-grey",
            borderRadius: "0.5rem",
          }}
        >
          <span>{nodeData[id].type === "folder" ? (showChildren ?  "📂" : "📁") : "📄"}</span>
          {showEdit ? (<Input id={id} type="edit" setShowEdit={setShowEdit} submit={editNode}/>) : 
          (<>
            <p style={{cursor:"pointer" }} onClick={() => setShowChildren(!showChildren)}>{nodeData[id].name}</p>

          {nodeData[id].type === "folder" && <button onClick={() => setShowAddInput(true)}>➕</button>}

          <button onClick={() => setShowEdit(!showEdit)}>🖊️</button>
          <button onClick={() => deleteNode(id)}>❌</button>
          </>)}
          
        </div>

          {showAddInput && <Input id={id} type="dede" setShowAddInput={setShowAddInput} submit={addNode}/>}

        <div style={{marginTop:"0.5rem" , borderLeft:"1px solid grey", paddingLeft:"1rem"}}>
          {showChildren && nodeData[id].children.map((childId) => {
            return (
              <FileExplorer2
                key={childId}
                id = {childId}
              />
            );
          })} 
        </div>
      </div>
    </div>
  );
};

export default FileExplorer2;
