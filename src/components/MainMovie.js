import React from "react";
import styled from "styled-components";

export const MainMovie = ({ image, title, text }) => {
  return (
    <Wrapper image={image}>
      <div>
        <Container>
          <Title>{title}</Title>
          <Text>{text}</Text>
        </Container>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${({ image }) => {
    return `url(${image})`;
  }};
  min-height: 600px;
  background-size: 100%, auto;
  background-position: center, center;
  background-repeat: no-repeat;
  position: relative;
`;

const Container = styled.div`
  position: absolute;
  max-width: 500px;
  bottom: 2rem;
  margin-left: 2rem;
`;
const Title = styled.h1``;
const Text = styled.p`
  font-size: 1rem;
`;
