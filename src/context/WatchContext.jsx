/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const WatchContext = createContext();

// function reducer(state, action) {
//   switch (action.type) {
//     case "add":
//       return { ...state, watched: [...state.watched, action.payload] };

//     case "del":
//       return {
//         ...state,
//         watched: state.watched.filter(
//           (movie) => movie.imdbID !== action.payload
//         ),
//       };

//     default:
//       break;
//   }
// }

function WatchContextProvider({ children }) {
  // const [{ watched }, dispatch] = useReducer(reducer, {
  //   watched: function () {
  //     const data = localStorage.getItem("watched");
  //     return JSON.parse(data);
  //   },
  // });

  const [watched, setWatched] = useState(function () {
    const data = localStorage.getItem("watched");
    return JSON.parse(data);
  });

  function deleteWachedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    // dispatch({ type: "del", payload: id });
  }

  function handleAddMovie(movie) {
    setWatched((watched) => [...watched, movie]);
    // dispatch({ type: "add", payload: movie });
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  return (
    <WatchContext.Provider
      value={{ watched, deleteWachedMovie, handleAddMovie }}
    >
      {children}
    </WatchContext.Provider>
  );
}

function useWacthedMovie() {
  const context = useContext(WatchContext);
  if (context === undefined)
    return console.log("Using outside of WatchedContextProvider.");
  return context;
}

export { WatchContextProvider, useWacthedMovie };
