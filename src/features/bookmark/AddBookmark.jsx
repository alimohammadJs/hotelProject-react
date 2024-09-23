import React, { useEffect, useRef, useState } from "react";
import { keyframes, styled } from "styled-components";
import { FaArrowLeftLong } from "react-icons/fa6";
import useGetParams from "../../hooks/useGetParams";
import useConvertGeolocation from "./useConvertGeolocation";
import useAddBookmark from "./useAddBookmark";
import Loading from "../../ui/Loading";

const AddBookmarkContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  @media (max-width: 767px) {
    h2:first-child {
      font-size: 1.3rem;
      text-align: center;
    }
  }
`;

const BookmarkInfo = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  border: 2px solid var(--text-300);
  border-radius: 0.6rem;
  padding: 0.5rem 0.5rem;
  width: 60%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ $buttonstyle }) =>
    $buttonstyle === "primary" ? "var(--primary-600)" : "var(--white)"};
  color: ${({ $buttonstyle }) =>
    $buttonstyle === "primary" ? "var(--text-100)" : "black"};
  border: ${({ $buttonstyle }) =>
    $buttonstyle === "primary" ? "none" : "1px solid var(--text-400)"};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const IconContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const Error = styled.div`
  width: 100%;
  margin-top: 5rem;
  padding: 1rem;
  color: var(--rose-500);
  font-size: 1.3rem;
  text-align: center;
  background-color: #ffbfbf63;
  border-radius: 1rem;
  box-shadow: 0rem 0.3rem 1.3rem #fd4c4ca2;
  animation: ${fadeInUp} 0.2s ease-in-out;
`;

function AddBookmark() {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const countryCode = useRef("");
  const [lat, lng] = useGetParams();
  const { data, isLoading } = useConvertGeolocation(
    `latitude=${lat}&longitude=${lng}`
  );
  const { isPending, addnewBookmark } = useAddBookmark();
  const [error, setError] = useState("");

  useEffect(() => {
    if (data) {
      setCountryName(data.countryName);
      setCityName(data.city);
      countryCode.current = data.countryCode;
    }
  }, [data]);

  const handleAddBookmark = (e) => {
    e.preventDefault();
    if (!countryName || !cityName) {
      setError("Please enter the CityName and countryName");
      return null;
    }
    if (!countryCode.current || !lat || !lng) {
      setError(
        "The problem may be in the countryCode or in getting the latitude and longitude"
      );
      return null;
    }
    addnewBookmark(
      {
        cityName,
        country: countryName,
        countryCode: countryCode.current,
        latitude: lat,
        longitude: lng,
        host_location: cityName + " " + countryName,
        id: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          setError("");
        },
      }
    );
  };

  if (isPending) return <Loading />;
  return (
    <AddBookmarkContainer>
      <h2>Bookmark New Location</h2>
      <BookmarkInfo onSubmit={handleAddBookmark}>
        <InputContainer>
          <label htmlFor="cityName">Cityname</label>
          <Input
            type="text"
            id="cityName"
            onChange={(e) => setCityName(e.target.value)}
            value={isLoading ? "Loading" : cityName}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="countryName">Countryname</label>
          <Input
            type="text"
            id="countryName"
            onChange={(e) => setCountryName(e.target.value)}
            value={isLoading ? "Loading" : countryName}
          />
        </InputContainer>
        <ButtonContainer>
          <Button $buttonstyle="primary" type="submit">
            Add
          </Button>
        </ButtonContainer>
      </BookmarkInfo>
      {error && <Error>{error}</Error>}
    </AddBookmarkContainer>
  );
}

export default AddBookmark;
