import React from "react";
import { Outlet } from "react-router-dom";
import {styled} from "styled-components";
import Map from "./Map";
import useHotel from "../../context/HotelLitsContext";

const HotelsLayoutContainer = styled.div`
  width: 100%;
  height: calc(100vh - 110px);
  display: flex;
  justify-content: space-between;
 
  padding: 0 1.2rem;
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: start;
    align-items: center;
    height: 900px;
    gap: 1rem;
    padding: 0 0.7rem;
  }
`;

function HotelsLayout() {
  const { hotels } = useHotel();

  return (
    <HotelsLayoutContainer>
      <Outlet />

      <Map markLocations={hotels} />
    </HotelsLayoutContainer>
  );
}

export default HotelsLayout;
