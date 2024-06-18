/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import NavBar from "./components/NavBar";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResult from "./components/NumResult";
import Movies from "./components/Movies";
import Box from "./components/Box";
import WatchSummary from "./components/WatchSummary";
import WatchedMovies from "./components/WatchedMovies";
import Main from "./components/Main";
import { useMovies } from "./context/MoviesContext";
import Loader from "./components/Loader";
import ErrorMsg from "./components/ErrorMsg";
import { useSelectedId } from "./context/SelectedMovieContext";
import MovieDetails from "./components/MovieDetails";

const KEY = `237c39d7`;

export default function App() {
  const [query, setQuery] = useState("");
  const { dispatch, status, errorMsg } = useMovies();
  const { selectedId } = useSelectedId();

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
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult />
      </NavBar>

      <Main>
        <Box>
          {status === "loading" && <Loader />}
          {errorMsg && status !== "loading" && <ErrorMsg msg={errorMsg} />}
          {status === "ready" && <Movies />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails />
          ) : (
            <>
              <WatchSummary />
              <WatchedMovies />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
