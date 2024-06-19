/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";
import { useSearchQuery } from "./QueryContext";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

const movieContext = createContext();

const KEY = `237c39d7`;

function reducer(state, action) {
  switch (action.type) {
    case "loadingData":
      return {
        ...state,
        status: "loading",
        errorMsg: "",
      };

    case "error":
      return { ...state, errorMsg: action.payload, status: null };

    case "receivedData":
      return {
        ...state,
        movies: action.payload,
        status: "ready",
        errorMsg: "",
      };

    case "noQuery":
      return { ...state, movies: action.payload, status: null, errorMsg: "" };

    default:
      break;
  }
}

function MoviesContextProvider({ children }) {
  const [{ movies, status, errorMsg }, dispatch] = useReducer(reducer, {
    movies: [],
    status: null,
    errorMsg: "",
  });

  const { query } = useSearchQuery();

  useEffect(() => {
    const controller = new AbortController();
    async function Fetch() {
      try {
        dispatch({ type: "loadingData" });
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        if (data.Response === "False") throw new Error("⛔ Movie not found!");

        dispatch({ type: "receivedData", payload: data.Search });
      } catch (error) {
        if (error.name !== "AbortError") {
          dispatch({ type: "error", payload: error.message });
        }
      }
    }

    if (!query.length) {
      dispatch({ type: "noQuery", payload: [] });
      return;
    }

    if (query.length >= 3) {
      Fetch();
    }

    return () => {
      controller.abort();
    };
  }, [query, dispatch]);

  return (
    <movieContext.Provider value={{ movies, dispatch, status, errorMsg }}>
      {children}
    </movieContext.Provider>
  );
}

function useMovies() {
  const context = useContext(movieContext);
  if (context === undefined) return console.log("out of  provider movie.");
  return context;
}

export { MoviesContextProvider, useMovies };
