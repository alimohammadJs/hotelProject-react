import React, { createContext, useContext } from "react";
import useFilterHotels from "../features/hotels/useFilterHotels";
import { useSearchParams } from "react-router-dom";

const HotelContext = createContext();

export function HotelLitsContextProvider({ children }) {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("searchValue");
  const option = JSON.parse(searchParams.get("hoteloption"));
  const { data: hotels = [], isLoading } = useFilterHotels(
    `q=${searchValue || ""}&host_location_like=${
      searchValue || ""
    }&accommodates_gte=${option?.room || 1}`
  );
  return (
    <HotelContext.Provider value={{ hotels, isLoading }}>
      {children}
    </HotelContext.Provider>
  );
}

export default function useHotel() {
  const context = useContext(HotelContext);
  return context;
}
