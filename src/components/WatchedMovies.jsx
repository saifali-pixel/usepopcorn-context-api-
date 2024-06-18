/* eslint-disable react/prop-types */
import { useWacthedMovie } from "../context/WatchContext";
import WatchedList from "./WatchedList";

function WatchedMovies() {
  const { watched } = useWacthedMovie();

  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedList movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default WatchedMovies;
