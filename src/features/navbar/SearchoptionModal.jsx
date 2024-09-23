import React, { useRef } from "react";
import styled from "styled-components";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const SearchOptionContainer = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 15px #d6d6dbeb;
  position: absolute;
  transform:translate(-35px,90px);
 background-color: #fff;
  z-index: 2000;
`;

const SearchOption = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const OperatorWrapper = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const OperationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
  border-radius: 0.4rem;
`;

function SearchoptionModal({ handleOption, hoteloption, setHotelOptionOpen }) {
  const optionRef = useRef();
  useOutsideClick(optionRef, () => setHotelOptionOpen(false));

  return (
    <SearchOptionContainer ref={optionRef}>
      <SearchOption>
        <p>adult</p>
        <OperatorWrapper>
          <OperationButton
            data-ignore-outside-click
            onClick={() =>
              handleOption({ option: "adult", operation: "minus" })
            }
          >
            <FiMinus />
          </OperationButton>
          <span>{hoteloption.adult}</span>
          <OperationButton
            data-ignore-outside-click
            onClick={() => handleOption({ option: "adult", operation: "plus" })}
          >
            <FiPlus />
          </OperationButton>
        </OperatorWrapper>
      </SearchOption>

      <SearchOption>
        <p>children</p>
        <OperatorWrapper>
          <OperationButton
            data-ignore-outside-click
            onClick={() =>
              handleOption({ option: "children", operation: "minus" })
            }
          >
            <FiMinus />
          </OperationButton>
          <span>{hoteloption.children}</span>
          <OperationButton
            data-ignore-outside-click
            onClick={() =>
              handleOption({ option: "children", operation: "plus" })
            }
          >
            <FiPlus />
          </OperationButton>
        </OperatorWrapper>
      </SearchOption>

      <SearchOption>
        <p>room</p>
        <OperatorWrapper>
          <OperationButton
            data-ignore-outside-click
            onClick={() => handleOption({ option: "room", operation: "minus" })}
          >
            <FiMinus />
          </OperationButton>
          <span>{hoteloption.room}</span>
          <OperationButton
            data-ignore-outside-click
            onClick={() => handleOption({ option: "room", operation: "plus" })}
          >
            <FiPlus />
          </OperationButton>
        </OperatorWrapper>
      </SearchOption>
    </SearchOptionContainer>
  );
}

export default SearchoptionModal