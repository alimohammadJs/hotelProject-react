import React from "react";
import { useParams } from "react-router-dom";
import useSingleBookmark from "./useSingleBookmark";
import {ReactCountryFlag} from "react-country-flag";
import {styled} from "styled-components";
import Loading from "../../ui/Loading";

const SingleBookamrkContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;

  h2:first-child {
    @media (max-width: 639px) {
      font-size: 1rem;
    }
  }
`;

const BookmarkInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  border: 1px solid var(--text-400);
  border-radius: 1rem;
  padding: 0.8rem;
`;

const CountryFlagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CityNameBookmark = styled.strong`
  @media (max-width: 639px) {
    font-size: 12px;
  }
`;
const CountryNameBookmark = styled.span`
  @media (max-width: 639px) {
    font-size: 10px;
    font-weight: 700;
  }
`;

function SingleBookmark() {
  const { bookmarkId } = useParams();
  const { data: bookmark = {}, isLoading } = useSingleBookmark(bookmarkId);

  if (isLoading) return <Loading />;
  return (
    <SingleBookamrkContainer>
      <h2>
        {bookmark.cityName} - {bookmark.country}
      </h2>
      <BookmarkInfo>
        <CountryFlagContainer>
          <ReactCountryFlag countryCode={bookmark.countryCode} svg />
        </CountryFlagContainer>
        <CityNameBookmark>{bookmark.cityName}</CityNameBookmark>
        <CountryNameBookmark>{bookmark.country}</CountryNameBookmark>
      </BookmarkInfo>
    </SingleBookamrkContainer>
  );
}

export default SingleBookmark;
