import React from "react";

import styled from "styled-components";

import useHotel from "../../context/HotelLitsContext";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "../../ui/Loading";
import useFilterHotels from "./useFilterHotels";

const HotelSearchResultContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HotelsListWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  @media (max-width: 767px) {
    height: clamp(400px, calc(100vh - 250px), 500px);
  }
`;

const HotelItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  gap: 1rem;
`;

const HotelImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  @media (max-width: 767px) {
    width: 70px;
    height: 70px;
  }
`;

const IMG = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  object-fit: cover;
`;

const HotelInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.5rem;
  @media (max-width: 767px) {
    line-height: 1.2rem;
  }

  & > :first-child {
    font-size: 1rem;
    @media (max-width: 767px) {
      font-size: 0.8rem;
    }
  }

  & > :last-child {
    display: flex;
    gap: 0.2rem;
    @media (max-width: 767px) {
      font-size: 0.8rem;
    }
  }

  & > :nth-child(2) {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text-400);
    @media (max-width: 767px) {
      font-size: 0.7rem;
      width: 200px;
      word-wrap: break-word;
      white-space: normal;
      line-height: 0.8rem;
    }
  }
  p {
    color: var(--text-400);
  }
`;

function HotelSearchResult() {
  const { hotels, isLoading } = useHotel();
 

  if (isLoading) return <Loading />;

  return (
    <HotelSearchResultContainer>
      <h1>searchresult: ({hotels.length})</h1>
      <HotelsListWrapper>
        {hotels.map((hotel) => {
          return (
            <Link
              key={hotel.id}
              to={`/hotel/${hotel.id}?lat=${hotel?.latitude}&lng=${hotel?.longitude}`}
            >
              <HotelItem>
                <HotelImgContainer>
                  <IMG src={hotel.thumbnail_url} alt={hotel.name} />
                </HotelImgContainer>
                <HotelInfoContainer>
                  <h3>{hotel.smart_location}</h3>
                  <p>{hotel.name}</p>
                  <div>
                    <span>
                      <b>$ {hotel.price}</b>
                    </span>
                    <p>night</p>
                  </div>
                </HotelInfoContainer>
              </HotelItem>
            </Link>
          );
        })}
      </HotelsListWrapper>
    </HotelSearchResultContainer>
  );
}

export default HotelSearchResult;
