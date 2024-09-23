import React, { createContext, useContext } from "react";
import useFilterBookmark from "../features/bookmark/useFilterBookmark";

const BookmarkContext = createContext();

export function BookmarkLitsContextProvider({ children }) {
  const { data: bookmarks = [], isLoading } = useFilterBookmark();
  return (
    <BookmarkContext.Provider value={{ bookmarks, isLoading }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export default function useBookmark() {
  const context = useContext(BookmarkContext);
  return context;
}
