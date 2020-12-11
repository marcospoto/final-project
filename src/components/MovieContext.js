import React, { useEffect, useContext, createContext, useState } from "react";
import { URL, KEY, Image } from "../API";
import { useDispatch } from "react-redux";
import { FirebaseContext } from "./FirebaseContext";

export const MovieContext = createContext(null);

export const useMovies = () => {
  return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { appUser } = useContext(FirebaseContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadPage = `${URL}movie/popular?api_key=${KEY}&language=en-US&page=1`;
    getMovies(loadPage);
  }, []);

  const getMovies = (path) => {
    fetch(path)
      .then((res) => res.json())
      .then((res) => {
        setMovies([...movies, ...res.results]);
        setCurrentPage(res.page);
      });
  };

  const handleClick = () => {
    const loadPage = `${URL}movie/popular?api_key=${KEY}&language=en-US&page=${
      currentPage + 1
    }`;
    getMovies(loadPage);
  };

  useEffect(() => {
    fetch(`${URL}movie/popular?api_key=${KEY}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((res) => {
        // console.log("hello", res);
        setMovies(res.results);
      });
  }, []);

  const addMovie = (movie) => {
    fetch("/favorites", {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        movie: movie,
        email: appUser.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "ADD_Movie",
          movie,
        });
      });
  };

  return (
    <MovieContext.Provider value={{ movies, handleClick, addMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
