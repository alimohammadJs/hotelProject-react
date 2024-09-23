import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Map from "../hotels/Map";

import useBookmark from "../../context/BookmarkListContext";

const BookmarkLayoutContainer = styled.div`
  width: 100%;
  height: calc(100vh - 110px);
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: start;
    align-items: center;
    height: 900px;
    gap: 1rem;
    padding: 0 0.7rem;
  }
`;

function BookmarkLayout() {
  const { bookmarks = [] } = useBookmark();

  return (
    <BookmarkLayoutContainer>
      <Outlet />

      <Map markLocations={bookmarks} />
    </BookmarkLayoutContainer>
  );
}

export default BookmarkLayout;
