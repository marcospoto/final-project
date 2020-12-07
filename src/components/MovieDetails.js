import { useParams } from "react-router-dom";
import React, { useEffect, useContext, createContext, useState } from "react";
import { URL, KEY, Image } from "../API";
import styled from "styled-components";
import { CastGrid } from "./CastGrid";
import { NavLink } from "react-router-dom";
import moment from "moment";

export const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [cast, setcast] = useState([]);
  const [actors, setActors] = useState(false);

  useEffect(() => {
    fetch(`${URL}movie/${id}?api_key=${KEY}&language=en-US`)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setMovie(res);

        fetch(`${URL}movie/${id}/credits?api_key=${KEY}`)
          .then((res) => res.json())
          .then((res) => {
            // console.log(res.cast);
            setcast(res.cast);
          });
      });
  }, []);

  const handleActors = () => {
    setActors(!actors);
  };

  const movieScore = movie?.vote_average;

  // console.log(movie?.genres);
  // console.log(cast.name);

  return (
    <Wrapper>
      <Main>
        <div>
          {movie && <MovieImage src={`${Image}w500${movie?.poster_path}`} />}
        </div>
        <InfoContainer>
          <InfoHeader>
            <MovieTitle>{movie?.original_title}</MovieTitle>
            <Timestamp>
              {moment(new Date(movie?.release_date)).format("YYYY MMM Do")}
            </Timestamp>
          </InfoHeader>
          <RatingContainer>
            <div>
              <ScoreTitle>Average Score</ScoreTitle>
              <ScoreText>based on {movie?.vote_count} reviews</ScoreText>
            </div>
            <Score
              style={
                movieScore >= 6
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "red" }
              }
            >
              {movieScore}
            </Score>
          </RatingContainer>
          <SummaryContainer>
            Summary
            <Summary>{movie?.overview}</Summary>
          </SummaryContainer>
        </InfoContainer>
      </Main>
      <div>
        <CastNamesContainer>
          {cast.map((cast) => {
            return <CastNames>{cast?.name}</CastNames>;
          })}
        </CastNamesContainer>
        <ButtonContainer>
          <LoadActors onClick={handleActors}>See Actors</LoadActors>
        </ButtonContainer>
        {actors && <CastGrid cast={cast} />}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Main = styled.div`
  display: flex;
`;

const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid grey;
  padding: 20px;
`;

const MovieTitle = styled.h1``;

const MovieImage = styled.img`
  width: 400px;
  height: 600px;
  margin: 50px;
  border-radius: 30px;
`;

const InfoContainer = styled.div`
  margin-top: 50px;
  min-width: 500px;
`;

const Timestamp = styled.div`
  display: flex;
  align-items: flex-end;
  color: rgb(101, 119, 134);
  font-size: 16px;
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 50px 0;
  min-width: 500px;
  border-bottom: 1px solid grey;
`;

const ScoreTitle = styled.h2`
  margin-bottom: 15px;
`;

const ScoreText = styled.p``;

const Score = styled.h1`
  text-align: center;
  min-width: 60px;
  min-height: 60px;
  padding: 10px;
  border-radius: 5px;
`;
const SummaryContainer = styled.h3`
  padding: 15px 0;
`;
const Summary = styled.h5`
  padding: 15px 0;
`;

const CastNamesContainer = styled.div`
  display: flex;
  font-size: 1rem;
`;

const CastNames = styled.div`
  display: flex;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadActors = styled.button`
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
