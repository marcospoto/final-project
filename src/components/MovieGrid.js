import React from "react";
import styled from "styled-components";
import { useMovies } from "./MovieContext";
import { Image } from "../API";
import { NavLink } from "react-router-dom";

export const MovieGrid = () => {
  const { movies } = useMovies();

  return (
    <Wrapper>
      {movies.map((movie, index) => {
        // console.log(movie);
        return (
          <ImageContainer key={index}>
            <NavigationLink exact to={`/movie/${movie.id}`}>
              <MovieImage
                src={movie.poster_path && `${Image}w500${movie.poster_path}`}
              />
            </NavigationLink>
          </ImageContainer>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 40px;
`;

const ImageContainer = styled.div``;

const NavigationLink = styled(NavLink)``;

const MovieImage = styled.img`
  max-width: 400px;
  padding: 10px;
  border-radius: 30px;
  align-items: center;
  @media (max-width: 768px) {
    max-width: 150px;
  }
`;
