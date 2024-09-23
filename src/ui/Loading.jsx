import React from "react";
import Lottie from "react-lottie-player";
import Loader from "../styles/Loader.json";
import styled from "styled-components";

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  div:last-of-type {
    width: 30%;
    height: 30%;
  }
`;

function Loading() {
  return (
    <LoadingContainer>
      <Lottie animationData={Loader} play loop />;
    </LoadingContainer>
  );
}

export default Loading;
