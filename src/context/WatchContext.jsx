/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const WatchContext = createContext();

function reducer(state, action) {
  switch (action.key) {
    case "":
      break;

    default:
      break;
  }
}

function WatchContextProvider({ children }) {
  const [{ watched }, dispatch] = useReducer(reducer, {
    watched: tempWatchedData,
  });
  return (
    <WatchContext.Provider value={{ watched, dispatch }}>
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
