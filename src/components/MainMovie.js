import React from "react";
import styled from "styled-components";

export const MainMovie = ({ image, title, text }) => {
  console.log(image);
  return (
    <Wrapper
      style={{
        background: `
    url('${image}')`,
        height: "500px",
        backgroundSize: "100%, cover",
        backgroundPosition: "center, center",
        position: "relative",
      }}
    >
      <div>
        <Container>
          <Title>{title}</Title>
          <Text>{text}</Text>
        </Container>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
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

export default MainMovie;
