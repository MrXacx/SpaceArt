import styled from "styled-components";

export const SelectionInnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  input {
    margin: 1rem;
  }
`;

export const SelectionMask = styled.div<{ opened: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: ${({ opened }) => (opened ? "#fa8b08" : "auto")};
  color: ${({ opened }) => (opened ? "#fff" : "auto")};
  cursor: pointer;

  input {
    display: none;
  }

  @media (min-width: 768px) {
    justify-content: space-between;
    input {
      display: inline;
    }
  }
`;

export const SelectionDetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    padding: 5px 20px;
    background-color: #fa8b08;
    font-size: 0.8em;
    color: #fff;
    border-radius: 50px;
  }

  h3 {
    padding-left: 10px;
    margin: 0;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const SelectionHiddenDetail = styled.div<{ opened: boolean }>`
  width: 100%;
  display: ${({ opened }) => (opened ? "flex" : "none")};
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const SelectionHiddenDetailItem = styled.span`
  width: 100%;
  margin: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    text-align: center;

    &:first-of-type {
      opacity: 0.75;
      margin: 0.25rem 0;
    }
  }
`;

export const SelectionCard = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  height: fit-content;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  align-items: center;
  margin: 10px 0;
  padding: 0 0.5rem;

  @media (min-width: 960px) {
    &:hover {
      ${SelectionMask} {
        background-color: #fa8b08;
        color: #fff;
      }
    }
  }
`;

export const SelectionOptions = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
export const SelectionOptionButton = styled.button<{
  hidden: boolean;
  danger?: boolean;
}>`
  width: 70%;
  margin: 0.25rem auto;
  height: 4vh;
  display: ${({ hidden }) => (hidden ? "none" : "inline")};
  background-color: ${({ danger }) => (danger ? "#ff2e2e" : "#ff8311")};
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: none;
  box-shadow: 0 1px 4px #0008;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 35%;
    height: 7vh;
    margin: 0 0.5rem;
    height: 3rem;
  }
`;
