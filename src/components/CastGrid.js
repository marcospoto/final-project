import React from "react";
import styled from "styled-components";
import { Image } from "../API";

export const CastGrid = ({ cast }) => {
  // console.log(cast);
  return (
    <Wrapper>
      {cast.map((cast, index) => {
        if (cast.profile_path !== null)
          return (
            <CastContainer key={index}>
              <a />
              <CastImage
                src={cast.profile_path && `${Image}w500${cast.profile_path}`}
              />
            </CastContainer>
          );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  align-items: center;
  grid-gap: 1rem;
  margin-top: 40px;
`;

const CastContainer = styled.div``;

const CastImage = styled.img`
  max-width: 300px;
  padding: 10px;
  border-radius: 30px;
`;
