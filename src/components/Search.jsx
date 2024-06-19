/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useSearchQuery } from "../context/QueryContext";

function Search() {
  const { query, setQuery } = useSearchQuery();
  const inputEl = useRef();

  useEffect(() => {
    // document.activeElement;
    inputEl.current.focus();

    document.addEventListener("keydown", function (e) {
      if (e.code === "Enter" && document.activeElement !== inputEl.current) {
        inputEl.current.focus();
        setQuery("");
      }
    });

    return () => {
      document.removeEventListener("keydown", function (e) {
        if (e.key === "Enter") inputEl.current.focus();
      });
    };
  }, [setQuery]);

  return (
    <input
      ref={inputEl}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
