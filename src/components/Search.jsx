import { useSearchQuery } from "../context/QueryContext";

/* eslint-disable react/prop-types */
function Search() {
  const { query, setQuery } = useSearchQuery();

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
