import React, { useState } from 'react'
import './FileExplorer.css'

const FileExplorer = ({ folderData }) => {
  const [showChildren, setShowChildren] = useState(false);

  const handleChildren = () => {
    if (folderData.type === 'folder') {
      setShowChildren(!showChildren);
    }
  };

  return (
    <div className="folder-container">
      <div className="folder-header" onClick={handleChildren}>
        {folderData.type === 'folder' ? (showChildren ? '📂' : '📁') : '📄'}
        <span>{folderData.name}</span>
      </div>

      {showChildren && folderData.children && (
        <div className="folder-children">
          {folderData.children.map((child, index) => (
            <FileExplorer
              key={`${folderData.name}-${child.name}-${index}`}
              folderData={child}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
