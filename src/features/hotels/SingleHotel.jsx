import React from "react";
import { useParams } from "react-router-dom";
import useFilterHotels from "./useFilterHotels";
import useSingleHotel from "./useSingleHotel";
import styled from "styled-components";
import Loading from "../../ui/Loading";

const SingleHotelContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  &:first-child {
    font-size: 1rem;
  }
`;

const HotelImgContainer = styled.div`
  width: 400px;
  height: 220px;
`;

const HotelImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.7rem;
`;

function SingleHotel() {
  const { hotelId } = useParams();
  const { data: hotel, isLoading } = useSingleHotel(hotelId);

  if (isLoading) return <Loading />;
  return (
    <SingleHotelContainer>
      <h2>{hotel?.name}</h2>
      <p>
        {hotel?.number_of_reviews} reviews &bull; {hotel?.smart_location}
      </p>
      <HotelImgContainer>
        <HotelImg src={hotel?.xl_picture_url} alt={hotel?.name} />
      </HotelImgContainer>
    </SingleHotelContainer>
  );
}

export default SingleHotel;
