import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { getMovieArray } from "../reducers";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Image } from "../API";
import { FirebaseContext } from "./FirebaseContext";
import { useMovies } from "./MovieContext";
import { URL, KEY } from "../API";
import { FiTrash2 } from "react-icons/fi";
import { IconContext } from "react-icons";

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
  }, [appUser.favorites]);

  const getByIds = async (ids) => {
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

    await Promise.all(requests);

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
            {/* <button onClick={() => removeMovie({ movie })}>
              Remove from favorites
            </button> */}
          </NavigationLink>
          <Div>
            <FavoriteButton
              onClick={() => {
                removeMovie({ movie });
              }}
            >
              <IconContext.Provider
                value={{
                  color: "white",

                  size: "2em",
                  className: "global-class-name",
                }}
              >
                <div>
                  <FiTrash2 />
                </div>
              </IconContext.Provider>
              <Option> Remove from favorites</Option>
            </FavoriteButton>
          </Div>
        </ImageContainer>
      </Wrapper>
    );
  };
  return (
    <div>
      <Title>Favorites</Title>
      <Wrapper>
        {favoriteMovies?.map((movie, index) => (
          <FavoriteMovie key={movie.id} movie={movie} index={index} />
        ))}
      </Wrapper>
    </div>
  );
};

const Title = styled.h1`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 40px;
`;

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
const Div = styled.span`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const FavoriteButton = styled.button`
  text-decoration: none;
  background-color: #222;
  color: white;
  font-weight: bold;
  margin: 0 13px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 20px;
  padding: 10px;
  border: none;

  cursor: pointer;
  :hover {
    color: red;
    border-radius: 20px;
  }
`;

const Option = styled.div`
  margin: 0 10px;
`;
