  /* eslint-disable no-unused-vars */
  import React, { useState } from "react";
  import ReplyBox from "./ReplyBox";

  const NestedComments = ({
    comment,
    allComments,
    deleteComment,
    addComment,
  }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);

    const handleReplyBox = () => {
      setShowReplyBox(!showReplyBox);
    };

    return (
      <div>
        <div
          key={comment.id}
          style={{
            padding: "5px",
            backgroundColor: "#f8f9fa",
            borderRadius: "0.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <div style={{ color: "black", fontWeight: "500", fontSize: "1rem" }}>
              {comment.value}
            </div>
            <div style={{display:"flex", gap:"1rem"}}>
              <button style={{  textDecoration:"underline", color:"blue",background:"none",border:"none",cursor:"pointer",fontSize:"0.75rem" }} onClick={handleReplyBox}>
                {showReplyBox ? "Cancel" : "Reply"}
              </button>
              <button style={{  textDecoration:"underline", color:"red",background:"none",border:"none",cursor:"pointer",fontSize:"0.75rem" }} onClick={() => deleteComment(comment.id)}>Delete</button>
            </div>
          </div>

          {showReplyBox && (
            <ReplyBox
              id={comment.id}
              setShowReplyBox={setShowReplyBox}
              addComment={addComment}
            />
          )}

          <div style={{paddingLeft:"1rem",borderLeft:"1px solid grey",marginTop:"0.5rem"}}>
            {comment.children.map((childId) => {
              return (
                <NestedComments
                  key={childId}
                  comment={allComments[childId]}
                  allComments={allComments}
                  addComment={addComment}
                  deleteComment={deleteComment}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  export default NestedComments;
