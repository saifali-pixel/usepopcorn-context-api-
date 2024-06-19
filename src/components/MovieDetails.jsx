/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useSelectedId } from "../context/SelectedMovieContext";
import Loader from "./Loader";
import StarRating from "./StarRating";
import { useWacthedMovie } from "../context/WatchContext";

function MovieDetails() {
  const { handleBtnClose, selectedMovieData, isLoading } = useSelectedId();

  const { handleAddMovie, watched } = useWacthedMovie();

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = selectedMovieData;

  const [userRating, setUserRating] = useState(null);
  // console.log(userRating);

  const { selectedId } = useSelectedId();

  function handleAddWatched() {
    const movie = { ...selectedMovieData, userRating };
    handleAddMovie(movie);
    // dispatch({ type: "addmovie", payload: movie });

    handleBtnClose();
  }

  const rated = watched.find((movie) =>
    movie.imdbID === selectedId ? movie.userRating : null
  );

  useEffect(() => {
    if (!title) return;
    // document.title = `MOVIE | ${selectedMovieData.Title}`;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [selectedMovieData, title]);

  //KEY Event
  useEffect(() => {
    function keyEvent(e) {
      if (e.key === "Escape") handleBtnClose();
      // console.log("huugg");
    }
    document.addEventListener("keydown", keyEvent);

    return () => {
      document.removeEventListener("keydown", keyEvent);
    };
  }, [handleBtnClose]);

  //addtolocalstorage
  // useEffect(() => {
  //   const movie = { ...selectedMovieData, userRating };

  //   localStorage.setItem("watch", JSON.stringify([movie]));
  // }, [selectedMovieData, userRating]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleBtnClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />

            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {rated?.userRating ? (
                <p>You rated this movie with {rated?.userRating} 🌟.</p>
              ) : (
                <>
                  <StarRating userrating={setUserRating} />

                  {userRating && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
