import React, { useEffect, useState } from "react";
import "./InfiniteScroll.css";

const InfiniteScroll = () => {
  const [imageData, setImageData] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${pageNo}&limit=3`
      );
      const data = await res.json();
      setImageData([...imageData, ...data]);
    };

    fetchData();
  }, [pageNo]);

  useEffect(() => {
    const lastImage = document.querySelector(".image:last-child");

    if (!lastImage) return;

    const observer = new IntersectionObserver((param) => {
      //here param is the response we are getting from intersectionObserver which
      // is in array if the last image is getting intersect the it will become true
      if (param[0].isIntersecting) {
        observer.unobserve(lastImage);
        setPageNo((lastPage) => lastPage + 1);
      }
    },{ threshold: 0.3 }); //threshold 1 means that the image should come 100% in verw then only set page to page + 1

    observer.observe(lastImage);

    return () => observer.disconnect();
  }, [imageData]);

  return (
    <div className="container">
      {imageData?.map((data) => {
        return (
          <img
            key={data.id}
            className="image"
            src={data.download_url}
            alt="Infinite-scroll Images"
          />
        );
      })}
    </div>
  );
};

export default InfiniteScroll;
