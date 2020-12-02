import React, { useEffect, useContext, createContext, useState } from "react";
import { URL, KEY, Image } from "../API";

export const MovieContext = createContext(null);

export const useMovies = () => {
  return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${URL}movie/popular?api_key=${KEY}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((res) => {
        console.log("hello", res);
        setMovies(res.results);
      });
  }, []);

  return (
    <MovieContext.Provider value={{ movies }}>{children}</MovieContext.Provider>
  );
};
