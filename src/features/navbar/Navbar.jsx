import React, { useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import {
  MdDateRange,
  MdOutlineSearch,
  MdSettings,
  MdOutlineClose,
} from "react-icons/md";
import { styled } from "styled-components";

import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import DateSelectionModal from "./DateSelectionModal";
import SearchoptionModal from "./SearchoptionModal";
import { format } from "date-fns";

const NavbarContaier = styled.div`
  width: 100%;
  max-height: 90px;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 1rem;
  @media (max-width: 1023px) {
    padding: 1rem 1rem;
  }
`;

const SearchFeatureContainer = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ebe9e9;
  border-radius: 1.5rem;
  @media (max-width: 639px) {
    padding: 0.7rem 1rem;
    border-radius: 1rem;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;

  @media (max-width: 767px) {
    input:nth-of-type(1) {
      width: 100px;
      font-size: 0.7rem;
    }
    font-size: 0.8rem;
  }
`;

const IconContainer = styled.div`
  width: 23px;
  height: 23px;
  display: ${({ $advance }) => ($advance ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  margin-left: auto;
  @media (max-width: 639px) {
    display: flex;
    width: 15px;
    height: 15px;
  }
  & :first-child {
    color: ${({ $location }) =>
      $location ? "var(--rose-500)" : "var( --primary-700)"};
    width: 100%;
    height: 100%;
  }
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
  border-radius: 0.5rem;
  background-color: var(--primary-600);
  color: white;
  cursor: pointer;
  @media (max-width: 639px) {
    padding: 0.3rem;
    border-radius: 0.3rem;
  }
  svg:last-of-type {
    width: 20px;
    height: 20px;
    @media (max-width: 639px) {
      width: 15px;
      height: 15px;
    }
  }
`;

const Blur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(223, 223, 223, 0.445);
  backdrop-filter: blur(5px);
  z-index: 100;
  display: none;
  @media (max-width: 639px) {
    display: block;
  }
`;

const AdvanceSearchModal = styled.div`
  position: absolute;
  z-index: 1000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 200px;
  background-color: #fefefe;
  border-radius: 1rem;
  background: linear-gradient(145deg, #dddddd, #ffffff);
  box-shadow: 24px 24px 48px #c2c2c2, -24px -24px 48px #ffffff;
  display: none;
  @media (max-width: 639px) {
    display: block;
  }
`;

const AdvanceSearchContent = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const FeatureVisibility = styled.div`
  @media (max-width: 639px) {
    display: none;
  }
`;

const CloseIconContainer = styled.span`
  width: 20px;
  height: 20px;
  margin: 1rem;
  display: flex;
  justify-content: start;
  align-items: center;
  color: var(--primary-700);

  svg:last-of-type {
    width: 100%;
    height: 100%;
  }
`;

function Navbar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("searchValue") || ""
  );
  const [dateOpen, setDateOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [hotelOptionOpen, setHotelOptionOpen] = useState(false);
  const [hoteloption, setHoteloption] = useState({
    adult: JSON.parse(searchParams.get("hoteloption"))?.adult || 0,
    children: JSON.parse(searchParams.get("hoteloption"))?.children || 0,
    room: JSON.parse(searchParams.get("hoteloption"))?.room || 1,
  });

  const [advanceSearchOpen, setAdvanceSearchOpen] = useState(false);

  const handleOption = ({ option, operation }) => {
    option === "adult" && operation === "minus"
      ? setHoteloption((prev) => ({ ...prev, [option]: prev[option] - 1 }))
      : option === "adult" && operation === "plus"
      ? setHoteloption((prev) => ({ ...prev, [option]: prev[option] + 1 }))
      : option === "children" && operation === "minus"
      ? setHoteloption((prev) => ({ ...prev, [option]: prev[option] - 1 }))
      : option === "children" && operation === "plus"
      ? setHoteloption((prev) => ({ ...prev, [option]: prev[option] + 1 }))
      : option === "room" && operation === "minus"
      ? setHoteloption((prev) => ({ ...prev, [option]: prev[option] - 1 }))
      : option === "room" && operation === "plus"
      ? setHoteloption((prev) => ({ ...prev, [option]: prev[option] + 1 }))
      : null;
  };

  const handleSearch = () => {
    navigate({
      pathname: "/hotel",
      search: createSearchParams({
        searchValue,
        selectedDate: JSON.stringify(selectedDate),
        hoteloption: JSON.stringify(hoteloption),
      }).toString(),
    });
  };

  return (
    <NavbarContaier>
      <span>Home</span>
      <SearchFeatureContainer>
        <Div>
          <IconContainer $location={location}>
            <FaLocationDot />
          </IconContainer>
          <input
            type="search"
            placeholder="Where to go?"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Div>
        <FeatureVisibility>
          <DateSelection
            selectedDate={selectedDate}
            dateOpen={dateOpen}
            setSelectedDate={setSelectedDate}
            setDateOpen={setDateOpen}
          />
        </FeatureVisibility>
        <FeatureVisibility>
          <HotelOption
            hoteloption={hoteloption}
            hotelOptionOpen={hotelOptionOpen}
            handleOption={handleOption}
            setHotelOptionOpen={setHotelOptionOpen}
          />
        </FeatureVisibility>

        <IconContainer
          $advance={`advance`}
          onClick={() => setAdvanceSearchOpen(true)}
        >
          <MdSettings />
        </IconContainer>
        <SearchButton onClick={handleSearch}>
          <MdOutlineSearch />
        </SearchButton>
      </SearchFeatureContainer>
      {advanceSearchOpen && (
        <AdvanceSearch setAdvanceSearchOpen={setAdvanceSearchOpen}>
          <DateSelection
            selectedDate={selectedDate}
            dateOpen={dateOpen}
            setSelectedDate={setSelectedDate}
            setDateOpen={setDateOpen}
          />
          <HotelOption
            hoteloption={hoteloption}
            hotelOptionOpen={hotelOptionOpen}
            handleOption={handleOption}
            setHotelOptionOpen={setHotelOptionOpen}
          />
        </AdvanceSearch>
      )}
    </NavbarContaier>
  );
}

export default Navbar;

function DateSelection({
  selectedDate,
  dateOpen,
  setSelectedDate,
  setDateOpen,
}) {
  return (
    <Div>
      <IconContainer>
        <MdDateRange />
      </IconContainer>
      <div onClick={() => setDateOpen(true)}>
        {`${format(selectedDate[0].startDate, "MM/dd/yyyy")} to ${format(
          selectedDate[0].endDate,
          "MM/dd/yyyy"
        )}  `}
      </div>

      {dateOpen && (
        <DateSelectionModal
          setDateOpen={setDateOpen}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </Div>
  );
}

function HotelOption({
  hoteloption,
  hotelOptionOpen,
  handleOption,
  setHotelOptionOpen,
}) {
  return (
    <Div>
      <div onClick={() => setHotelOptionOpen(true)}>
        {hoteloption.adult} adult &bull; {hoteloption.children} children &bull;{" "}
        {hoteloption.room}room
      </div>
      {hotelOptionOpen && (
        <SearchoptionModal
          setHotelOptionOpen={setHotelOptionOpen}
          handleOption={handleOption}
          hoteloption={hoteloption}
        />
      )}
    </Div>
  );
}

function AdvanceSearch({ children, setAdvanceSearchOpen }) {
  return (
    <>
      <Blur></Blur>
      <AdvanceSearchModal>
        <CloseIconContainer onClick={() => setAdvanceSearchOpen(false)}>
          <MdOutlineClose />
        </CloseIconContainer>

        <AdvanceSearchContent>{children}</AdvanceSearchContent>
      </AdvanceSearchModal>
    </>
  );
}
