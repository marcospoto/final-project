import React from "react";
import styled from "styled-components";
import { useMovies } from "./MovieContext";
import { Image } from "../API";

export const MovieGrid = () => {
  const { movies } = useMovies();

  return (
    <Wrapper>
      {movies.map((movie, index) => {
        return (
          <ImageContainer key={index}>
            <a />
            <MovieImage
              src={movie.poster_path && `${Image}w500${movie.poster_path}`}
            />

            <a href={`/movie/${movie.id}`}>"hello"</a>
          </ImageContainer>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  align-items: center;
  grid-gap: 1rem;
  margin-top: 40px;
`;

const ImageContainer = styled.div``;

const MovieImage = styled.img`
  max-width: 400px;
  padding: 10px;
  border-radius: 30px;
`;
