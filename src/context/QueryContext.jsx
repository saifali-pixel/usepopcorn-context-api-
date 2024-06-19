/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const QueryContext = createContext();

function QueryContextProvider({ children }) {
  const [query, setQuery] = useState("");
  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
}

function useSearchQuery() {
  const context = useContext(QueryContext);
  if (context === undefined)
    return console.error("usinng out of queryContext provider.");
  return context;
}

export { QueryContextProvider, useSearchQuery };
