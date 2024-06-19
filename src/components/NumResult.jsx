/* eslint-disable react/prop-types */

import { useMovies } from "../context/MoviesContext";

function NumResult() {
  const { movies, errorMsg } = useMovies();

  return (
    <p className="num-results">
      Found{" "}
      <strong>
        {/* {movies?.length} */}
        {errorMsg ? 0 : movies?.length || 0}
      </strong>{" "}
      results
    </p>
  );
}

export default NumResult;
