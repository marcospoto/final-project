import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { getMovieArray } from "../reducers";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Image } from "../API";
import { FirebaseContext } from "./FirebaseContext";
import { useMovies } from "./MovieContext";
import { URL, KEY } from "../API";

export const Favorites = () => {
  const movieItems = useSelector(getMovieArray);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { appUser } = useContext(FirebaseContext);
  const { removeMovie } = useMovies();

  useEffect(() => {
    getByIds(appUser.favorites).then((response) => {
      console.log(response);
      setFavoriteMovies(response);
    });
  }, [appUser]);

  const getByIds = async (ids) => {
    //put all promises in an Array so we can let them run and be awaited
    //await is bad practise in loops and usually does not work
    let requests = [];
    let responses = [];

    for (let id in ids)
      requests.push(
        fetch(`${URL}movie/${ids[id]}?api_key=${KEY}&language=en-US`)
          .then((res) => res.json())
          .then((res) => {
            responses.push(res);
          })
      );

    //Await all requests
    await Promise.all(requests);

    //return all responses
    return responses;
  };

  console.log(favoriteMovies);

  const FavoriteMovie = ({ movie, index }) => {
    return (
      <Wrapper>
        <ImageContainer key={index}>
          <NavigationLink exact to={`/movie/${movie.id}`}>
            <MovieImage
              src={movie.poster_path && `${Image}w500${movie.poster_path}`}
            />
            <button onClick={() => removeMovie({ movie })}>
              Remove from favorites
            </button>
          </NavigationLink>
        </ImageContainer>
      </Wrapper>
    );
  };
  return (
    <Wrapper>
      {favoriteMovies?.map((movie, index) => (
        <FavoriteMovie key={movie.id} movie={movie} index={index} />
      ))}
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
