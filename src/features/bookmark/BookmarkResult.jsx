import React from "react";
import ReactCountryFlag from "react-country-flag";
import { styled } from "styled-components";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import useBookmark from "../../context/BookmarkListContext";
import useDeleteBookmark from "./useDeleteBookmark";
import Loading from "../../ui/Loading";

const BookmarkResultContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
  @media (max-width: 767px) {
    height: clamp(400px, 100%, 900px);
  }
`;

const BookmarkItem = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  border: 2px solid var(--primary-600);
  padding: 1rem;
  border-radius: 1rem;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const CityNameBookmark = styled.strong`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;
const CountryNameBookmark = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const DeleteButton = styled.button`
  margin-left: auto;
  width: 20px;
  height: 20px;
  background-color: transparent;
  @media (max-width: 767px) {
    width: 15px;
    height: 15px;
  }
  svg:nth-of-type(1) {
    width: 100%;
    height: 100%;
    color: var(--rose-500);
  }
`;

function BookmarkResult() {
  const { bookmarks = [], isLoading } = useBookmark();
  const { deleteBookmarkItem } = useDeleteBookmark();

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteBookmarkItem(id);
  };

  if (isLoading) return <Loading />;
  return (
    <BookmarkResultContainer>
      <h2>BookmarkList</h2>
      {bookmarks.map((bookmark) => {
        return (
          <Link
            key={bookmark.id}
            to={`${bookmark.id}?lat=${bookmark?.latitude}&lng=${bookmark?.longitude}`}
          >
            <BookmarkItem>
              <ReactCountryFlag countryCode={bookmark.countryCode} svg />
              &nbsp; <CityNameBookmark>{bookmark.cityName}</CityNameBookmark>
              &nbsp;
              <CountryNameBookmark>{bookmark.country}</CountryNameBookmark>
              <DeleteButton onClick={(e) => handleDelete(e, bookmark.id)}>
                <MdDelete />
              </DeleteButton>
            </BookmarkItem>
          </Link>
        );
      })}
    </BookmarkResultContainer>
  );
}

export default BookmarkResult;
