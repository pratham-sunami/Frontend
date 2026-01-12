import React, { useState } from "react";

const   ReplyBox = ({id, setShowReplyBox, addComment}) => {
  const [reply, setReply] = useState("");
  return (
    <div>
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        style={{ width: "200px" }}
      />
      <button
        onClick={() => {
          setShowReplyBox(false);
          setReply("");
          addComment(id,reply);
        }}
      >
        Post Reply
      </button>
    </div>
  );
};

export default ReplyBox;
