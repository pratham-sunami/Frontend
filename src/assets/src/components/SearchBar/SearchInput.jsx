import React, { useEffect, useRef, useState } from "react";

const STATE = {
  LOADING: "Loading",
  ERROR: "Error",
  SUCCESS: "Success",
};

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState(STATE.LOADING);
  const cache = useRef({});

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const handleChange = async () => {
      try {
        setStatus(STATE.LOADING);
        if (cache.current[searchValue]) {
          setResult(cache.current[searchValue]);
          setStatus(STATE.SUCCESS);
          return;
        }
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchValue}&limit=10`,
          { signal }
        );
        const data = await res.json();
        setResult(data.products);
        cache.current[searchValue] = data.products;
        setStatus(STATE.SUCCESS);
      } catch (error) {
        console.log(error.name);
        if (error.name !== "AbortError") setStatus(STATE.ERROR);
      }
    };

    const timeoutId = setTimeout(handleChange, 1000);

    return () => {
      clearTimeout(timeoutId);
      abortController.abort()
    };
  }, [searchValue]);

  return (
    <div className="container">
      <input
        className="search"
        type="text"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      {status === "Loading" &&  <div>...loading</div>}
      {status === "Error" &&  <div>...Error Occurred</div>}
      {/* {status === "loading" &&  <div>...loading</div>} */}

      {status === "Success" && <ul>
        {result.map((data) => {
            return (
                <li key={data.id}>
                    {data.title}
                </li>
            )
        })}
      </ul>}
    </div>
  );
};

export default SearchInput;
