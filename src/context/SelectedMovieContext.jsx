/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const SelectedMovieContext = createContext();
const KEY = `237c39d7`;

function SelectedMovieProvider({ children }) {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMovieData, setSelectedMovieData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function handleSelectedId(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleBtnClose() {
    setSelectedId(null);
  }
  // console.log(selectedId);

  useEffect(() => {
    async function FetchDetail() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        const data = await res.json();

        // console.log(data);
        setSelectedMovieData(data);
      } catch (error) {
        console.log(error, error.message);
      } finally {
        setIsLoading(false);
      }
    }
    FetchDetail();
  }, [selectedId]);

  return (
    <SelectedMovieContext.Provider
      value={{
        selectedId,
        handleSelectedId,
        handleBtnClose,
        selectedMovieData,
        isLoading,
      }}
    >
      {children}
    </SelectedMovieContext.Provider>
  );
}

function useSelectedId() {
  const context = useContext(SelectedMovieContext);
  if (context === undefined)
    return console.error("using outside provider selectedId.");
  return context;
}

export { useSelectedId, SelectedMovieProvider };
