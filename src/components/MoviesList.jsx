import { useSelectedId } from "../context/SelectedMovieContext";

/* eslint-disable react/prop-types */
function MoviesList({ movie }) {
  const { handleSelectedId } = useSelectedId();

  return (
    <li key={movie?.imdbID} onClick={() => handleSelectedId(movie?.imdbID)}>
      <img src={movie?.Poster} alt={`${movie?.Title} poster`} />
      <h3>{movie?.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie?.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default MoviesList;
