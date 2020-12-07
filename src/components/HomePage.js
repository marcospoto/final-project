import React, { useEffect, useState } from "react";
import { Image } from "../API";
import styled from "styled-components";
import { MainMovie } from "./MainMovie";
import { MovieGrid } from "./MovieGrid";
import { useMovies } from "./MovieContext";

export const HomePage = () => {
  const { movies, handleClick } = useMovies();
  // console.log(movies[0]?.backdrop_path);

  return (
    <Wrapper>
      {movies[0] && (
        <MainMovie
          image={`${Image}w1280${movies[0]?.backdrop_path}`}
          title={movies[0]?.original_title}
          text={movies[0]?.overview}
        />
      )}
      {movies && <MovieGrid />}
      <ButtonContainer>
        <LoadMovies onClick={handleClick}>load more</LoadMovies>
      </ButtonContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadMovies = styled.button`
  border: none;
  background: #404040;
  color: #ffffff !important;
  font-weight: 100;
  padding: 20px;
  text-transform: uppercase;
  border-radius: 6px;
  display: inline-block;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  :hover {
    color: #404040 !important;
    font-weight: 700 !important;
    letter-spacing: 3px;
    background: none;
    transition: all 0.3s ease 0s;
  }
`;
