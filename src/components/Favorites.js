import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMovieArray } from "../reducers";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Image } from "../API";
import { useDispatch } from "react-redux";

export const Favorites = () => {
  const movieItems = useSelector(getMovieArray);

  console.log(movieItems);

  return (
    <div>
      {movieItems.map((movie, index) => (
        <FavoriteMovies movie={movie} index={index} />
      ))}
    </div>
  );
};

const FavoriteMovies = ({ movie, index }) => {
  return (
    <div>
      <ImageContainer key={index}>
        <NavigationLink exact to={`/movie/${movie.movie.id}`}>
          <MovieImage
            src={
              movie.movie.poster_path &&
              `${Image}w500${movie.movie.poster_path}`
            }
          />
        </NavigationLink>
      </ImageContainer>
    </div>
  );
};

//   return (
//     <div>
//       {movieItems.map((movie, index) => {
//         console.log(movie.movie);
//         return (
//           <ImageContainer key={index}>
//             <NavigationLink exact to={`/movie/${movie.movie.id}`}>
//               <MovieImage
//                 src={
//                   movie.movie.poster_path &&
//                   `${Image}w500${movie.movie.poster_path}`
//                 }
//               />
//             </NavigationLink>
//           </ImageContainer>
//         );
//       })}
//     </div>
//   );
// };

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
