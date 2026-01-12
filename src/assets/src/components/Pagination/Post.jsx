import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import "./Pagination.css"

const Post = () => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    axios
      .get(`https://picsum.photos/v2/list?page=${pageNo}&limit=5`)
      .then((res) => setData(res.data));
  }, [pageNo]);

  return (
      <>
      <div className="container">
        <div className="post-container">
          {data.map((image,index) => {
            return <img key={index} className="img" src={image.download_url} />;
          })}
        </div>
      </div>
      <Pagination pageNo={pageNo} setPageNo={setPageNo} />
      </>
  );
};

export default Post;
