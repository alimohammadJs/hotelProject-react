import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HotelsPage from "./pages/HotelsPage";
import HotelSearchResult from "./features/hotels/HotelSearchResult";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SingleHotel from "./features/hotels/SingleHotel";
import BookmarkPage from "./pages/BookmarkPage";
import BookmarkResult from "./features/bookmark/BookmarkResult";
import { HotelLitsContextProvider } from "./context/HotelLitsContext";
import { BookmarkLitsContextProvider } from "./context/BookmarkListContext";
import AddBookmarkPage from "./pages/AddBookmarkPage";
import SingleBookmark from "./features/bookmark/SingleBookmark";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HotelLitsContextProvider>
        <BookmarkLitsContextProvider>
          <Routes>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/hotel" element={<HotelsPage />}>
              <Route index element={<HotelSearchResult />} />
              <Route path=":hotelId" element={<SingleHotel />} />
            </Route>
            <Route path="/bookmark" element={<BookmarkPage />}>
              <Route index element={<BookmarkResult />} />
              <Route path="add" element={<AddBookmarkPage/>}/>
              <Route path=":bookmarkId" element={<SingleBookmark />} />
              
            </Route>
          </Routes>
        </BookmarkLitsContextProvider>
      </HotelLitsContextProvider>
    </QueryClientProvider>
  );
}

export default App;
