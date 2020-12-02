import React from "react";
import Grid from "@material-ui/core/Button";
import styled from "styled-components";

export const MovieGrid = ({ image, title, id, key }) => {
  return (
    <Grid container item key={key} xs={8} sm={2} lg={8}>
      <ImageContainer>
        <a href={`/movie/${id}`} />
        <Image src={image} />
      </ImageContainer>
    </Grid>
  );
};

const ImageContainer = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 320px;
`;
