/* eslint-disable react/prop-types */
import { useMovies } from "../context/MoviesContext";
import MoviesList from "./MoviesList";

function Movies() {
  const { movies } = useMovies();

  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MoviesList movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default Movies;
