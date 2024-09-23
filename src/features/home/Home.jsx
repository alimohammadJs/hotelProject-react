import React from "react";
import styled from "styled-components";
import useHotel from "../../hooks/useHotel";
import { Link } from "react-router-dom";

const HomeContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  row-gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 639px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const HotelItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HotelImgContainer = styled.div`
  width: 300px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1023px) {
    width: 240px;
    height: 170px;
  }
  @media (max-width: 639px) {
    width: 280px;
    height: 210px;
  }
`;

const IMG = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  object-fit: cover;
`;

const HotelContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  h3:first-of-type {
    font-size: 1rem;
  }
  p:first-of-type {
    font-size: 0.8rem;
    color: var(--text-400);
  }
  div:last-child {
    display: flex;
    gap: 0.2rem;
  }
`;

function Home() {
  const { data: hotels = [] } = useHotel();

  return (
    <HomeContainer>
      {hotels.map((hotel) => {
        return (
          <Link  key={hotel.id} to={`/hotel/${hotel.id}?lat=${hotel.latitude}&lng=${hotel.longitude}`}>
          <HotelItem>
            <HotelImgContainer>
              <IMG src={hotel?.xl_picture_url}></IMG>
            </HotelImgContainer>
            <HotelContentContainer>
              <h3>{hotel.smart_location}</h3>
              <p>{hotel.name}</p>
              <div>
                <span>
                  <b>$ {hotel.price}</b>
                </span>
                <p>night</p>
              </div>
            </HotelContentContainer>
          </HotelItem>
          </Link>
        );
      })}
    </HomeContainer>
  );
}

export default Home;
