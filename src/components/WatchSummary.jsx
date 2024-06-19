import { useWacthedMovie } from "../context/WatchContext";

/* eslint-disable react/prop-types */
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function WatchSummary() {
  const { watched } = useWacthedMovie();

  const avgImdbRating = average(watched?.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched?.map((movie) => +movie.userRating));
  const avgRuntime = average(
    watched?.map((movie) => {
      // console.log(+movie.Runtime.split(" ")[0]);
      // const runtime = +movie.Runtime.split(" ")[0];
      return +movie.Runtime.split(" ")[0];
    })
  );

  // console.log(watched);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched?.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

export default WatchSummary;
