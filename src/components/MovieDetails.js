import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { URL, KEY, Image } from "../API";
import styled from "styled-components";
import { CastGrid } from "./CastGrid";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useMovies } from "./MovieContext";
import { FiStar } from "react-icons/fi";
import { IconContext } from "react-icons";

export const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [cast, setcast] = useState([]);
  const [actors, setActors] = useState(false);
  const [buttonText, setButtonText] = useState("Show actors");
  const { addMovie } = useMovies();

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
    const isButtonToggled = !buttonText;
    const changeText = isButtonToggled ? "Show actors" : "Hide actors";

    return setButtonText(changeText);
  };

  const movieScore = movie?.vote_average;

  const castNames = cast.map((cast) => cast?.name + ", ");

  const dispatch = useDispatch();

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
                movieScore < 6
                  ? { backgroundColor: "red" }
                  : movieScore < 7.5
                  ? { backgroundColor: "orange" }
                  : { backgroundColor: "green" }
              }
            >
              {movieScore}
            </Score>
          </RatingContainer>
          <SummaryContainer>
            Summary
            <Summary>{movie?.overview}</Summary>
          </SummaryContainer>
          <Div>
            <FavoriteButton onClick={() => addMovie({ movie })}>
              <IconContext.Provider
                value={{
                  color: "yellow",

                  size: "2em",
                  className: "global-class-name",
                }}
              >
                <div>
                  <FiStar />
                </div>
              </IconContext.Provider>
              <Option> Favorite</Option>
            </FavoriteButton>
          </Div>
        </InfoContainer>
      </Main>
      <div>
        <CastNamesContainer>{castNames}</CastNamesContainer>
        <ButtonContainer>
          <LoadActors onClick={handleActors}>{buttonText}</LoadActors>
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

const MovieTitle = styled.h1`
  font-size: 40px;
`;

const MovieImage = styled.img`
  width: 450px;
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

const ScoreText = styled.p`
  font-size: 25px;
`;

const Score = styled.h1`
  display: flex;
  align-items: center;
  min-width: 60px;
  min-height: 60px;
  padding: 10px;
  border-radius: 5px;
`;
const SummaryContainer = styled.h3`
  padding: 15px 0;
  font-size: 25px;
`;
const Summary = styled.h5`
  padding: 15px 0;
`;

const Div = styled.span`
  display: inline;
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
    color: yellow;
    border-radius: 20px;
  }
`;

const Option = styled.div`
  margin: 0 10px;
`;

const CastNamesContainer = styled.div`
  display: flex;
  font-size: 20px;
  margin: 10px;
`;

const CastNames = styled.div`
  display: flex;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
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
