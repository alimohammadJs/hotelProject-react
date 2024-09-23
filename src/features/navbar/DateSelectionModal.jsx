import React, { useRef, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const DateRangeContainer = styled.div`
  position: absolute;
  transform: translate(-80px, 200px);
  z-index: 2000;
`;

function DateSelectionModal({ selectedDate, setSelectedDate, setDateOpen }) {
  const dateRef = useRef();
  useOutsideClick(dateRef, () => setDateOpen(false));

  return (
    <DateRangeContainer ref={dateRef} data-ignore-outside-click>
      <DateRange
        ranges={selectedDate}
        onChange={(item) => setSelectedDate([item.selection])}
        minDate={new Date()}
        moveRangeOnFirstSelection={true}
      />
    </DateRangeContainer>
  );
}

export default DateSelectionModal;
