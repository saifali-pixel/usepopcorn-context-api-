import { useWacthedMovie } from "../context/WatchContext";

/* eslint-disable react/prop-types */
function WatchedList({ movie }) {
  const { deleteWachedMovie } = useWacthedMovie();
  // console.log(movie);
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime} </span>
        </p>
      </div>

      <button
        className="btn-delete"
        onClick={() => deleteWachedMovie(movie.imdbID)}
      >
        X
      </button>
    </li>
  );
}

export default WatchedList;
