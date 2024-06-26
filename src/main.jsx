import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MoviesContextProvider } from "./context/MoviesContext.jsx";
import { WatchContextProvider } from "./context/WatchContext.jsx";
import { SelectedMovieProvider } from "./context/SelectedMovieContext.jsx";
import { QueryContextProvider } from "./context/QueryContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SelectedMovieProvider>
      <QueryContextProvider>
        <MoviesContextProvider>
          <WatchContextProvider>
            <App />
          </WatchContextProvider>
        </MoviesContextProvider>
      </QueryContextProvider>
    </SelectedMovieProvider>
  </React.StrictMode>
);
