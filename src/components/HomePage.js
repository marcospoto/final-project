import React, { useEffect, useState } from "react";
import { Image } from "../API";
import styled from "styled-components";
import MainMovie from "./MainMovie";
import { useMovies } from "./MovieContext";
import { MovieGrid } from "./MovieGrid";

export const HomePage = () => {
  const { movies } = useMovies();
  console.log(movies[0]?.backdrop_path);

  return (
    <Wrapper>
      {movies[0] && (
        <MainMovie
          image={`${Image}w1280${movies[0]?.backdrop_path}`}
          title={movies[0]?.original_title}
          text={movies[0]?.overview}
        />
      )}
      {movies.map((movie, index) => {
        return (
          <MovieGrid
            key={index}
            image={movie.poster_path && `${Image}w500${movie.poster_path}`}
            id={movie.id}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 0;
`;
